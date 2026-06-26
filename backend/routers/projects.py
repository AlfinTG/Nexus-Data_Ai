from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from utils.file_handler import save_uploaded_file

import models
from database import get_db

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)


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
  
@router.get("/", response_model=list[models.ProjectResponse])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(models.Project).all()
    return projects

@router.post("/{project_id}/documents", response_model=models.DocumentResponse)
def upload_document(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    project = db.query(models.Project).filter(
        models.Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    file_path = save_uploaded_file(file)

    document = models.Document(
        project_id=project_id,
        filename=file.filename,
        file_path=file_path
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document