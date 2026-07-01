from fastapi import APIRouter, HTTPException

from core.vector_store import VectorStore
from core.rag_pipeline import RAGPipeline
from schemas.chat import SearchRequest, AskRequest

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)

vector_store = VectorStore()
rag = RAGPipeline()


@router.post("/search")
def semantic_search(request: SearchRequest):

    try:

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
def ask_ai(request: AskRequest):

    result = rag.ask(
        project_id=request.project_id,
        query=request.query,
        top_k=request.top_k
    )

    return result