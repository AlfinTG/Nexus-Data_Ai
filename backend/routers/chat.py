from fastapi import APIRouter, HTTPException
from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db
from core.dependencies import get_vector_store, get_rag_pipeline
from schemas.chat import SearchRequest, AskRequest

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


@router.post("/search")
def semantic_search(request: SearchRequest):

    try:
        vector_store = get_vector_store()

        results = vector_store.search(
            project_id=str(request.project_id),
            query=request.query,
            k=request.top_k
        )

        return {
            "results": results
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.post("/ask")
def ask_ai(
    request: AskRequest,
    db: Session = Depends(get_db)
):

    rag = get_rag_pipeline()

    result = rag.ask(
        db=db,
        project_id=request.project_id,
        query=request.query,
        top_k=request.top_k
    )

    return result