from fastapi import APIRouter, HTTPException
from core.vector_store import VectorStore
from schemas.chat import SearchRequest

router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)

vector_store = VectorStore()


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