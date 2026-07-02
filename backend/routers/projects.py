from core.vector_store import VectorStore
from core.text_chunker import TextChunker
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session

import models
from database import get_db
from utils.file_handler import save_uploaded_file
from core.pdf_parser import get_full_text

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


# -----------------------------
# Create Project
# -----------------------------
@router.post("/", response_model=models.ProjectResponse)
def create_project(
    project: models.ProjectCreate,
    db: Session = Depends(get_db)
):
    new_project = models.Project(
        name=project.name,
        description=project.description
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


# -----------------------------
# Get All Projects
# -----------------------------
@router.get("/", response_model=list[models.ProjectResponse])
def get_projects(
    db: Session = Depends(get_db)
):
    return db.query(models.Project).all()


# -----------------------------
# Upload Document
# -----------------------------
@router.post("/{project_id}/documents", response_model=models.DocumentResponse)
def upload_document(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Check if project exists
    project = (
        db.query(models.Project)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    # Save uploaded PDF
    file_path = save_uploaded_file(file)

    # Read PDF and extract text
    with open(file_path, "rb") as pdf:
        pdf_bytes = pdf.read()

    document_text = get_full_text(pdf_bytes)

    print("=" * 60)
    print("Extracted text length:", len(document_text))
    print("First 500 characters:")
    print(document_text[:500])
    print("=" * 60)

    chunker = TextChunker()
    chunks = chunker.chunk_text(document_text)

    print("Chunks created:", len(chunks))

    if chunks:
        print("First chunk:")
        print(chunks[0][:200])
    else:
        print("No chunks generated!")

    vector_store = VectorStore()

    # Save document record
    document = models.Document(
    project_id=project_id,
    filename=file.filename,
    file_path=file_path,
    text=document_text,
    status="processed"
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    # Save chunks into the database
    for index, chunk in enumerate(chunks):
        db_chunk = models.DocumentChunk(
            document_id=document.id,
            chunk_index=index,
            content=chunk
        )   
        db.add(db_chunk)

    db.commit()
    metadata = [
        {
            "document_id": document.id,
            "chunk_index": index,
            "filename": file.filename,
        }
        for index in range(len(chunks))
    ]
    print("=" * 60)
    print("Document text length:", len(document_text))
    print("Chunks:", len(chunks))
    print(chunks[:3])   # first 3 chunks
    print("=" * 60)

    vector_store.add_chunks(
        project_id=str(project_id),
        chunks=chunks,
        metadata=metadata
    )

    return document

# -----------------------------
# Get All Documents of a Project
# -----------------------------
@router.get(
    "/{project_id}/documents",
    response_model=list[models.DocumentResponse]
)
def get_project_documents(
    project_id: int,
    db: Session = Depends(get_db)
):
    # Check if project exists
    project = (
        db.query(models.Project)
        .filter(models.Project.id == project_id)
        .first()
    )

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    documents = (
        db.query(models.Document)
        .filter(models.Document.project_id == project_id)
        .all()
    )

    return documents

# -----------------------------
# Get Single Document
# -----------------------------
@router.get(
    "/documents/{document_id}",
    response_model=models.DocumentDetailsResponse
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db)
):
    document = (
        db.query(models.Document)
        .filter(models.Document.id == document_id)
        .first()
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return document

@router.get(
    "/documents/{document_id}/chunks",
    response_model=list[models.ChunkResponse]
)
def get_document_chunks(
    document_id: int,
    db: Session = Depends(get_db)
):
    chunks = (
        db.query(models.DocumentChunk)
        .filter(models.DocumentChunk.document_id == document_id)
        .order_by(models.DocumentChunk.chunk_index)
        .all()
    )

    return chunks