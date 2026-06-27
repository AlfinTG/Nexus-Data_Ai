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