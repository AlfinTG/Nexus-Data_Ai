from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from pydantic import BaseModel
from database import Base


# ==========================================
# Database Models
# ==========================================

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, nullable=False, index=True)

    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)

    # Full extracted PDF text
    text = Column(Text, nullable=True)

    # Processing status
    status = Column(String, default="processed")

    upload_time = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# ==========================================
# Pydantic Schemas
# ==========================================

class ProjectCreate(BaseModel):
    name: str
    description: str | None = None


class ProjectResponse(BaseModel):
    id: int
    name: str
    description: str | None = None

    class Config:
        from_attributes = True


class DocumentResponse(BaseModel):
    id: int
    project_id: int
    filename: str
    file_path: str
    status: str

    class Config:
        from_attributes = True


class DocumentDetailsResponse(BaseModel):
    id: int
    project_id: int
    filename: str
    file_path: str
    status: str
    text: str | None = None

    class Config:
        from_attributes = True