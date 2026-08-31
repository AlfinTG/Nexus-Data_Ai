from pydantic import BaseModel


class SearchRequest(BaseModel):
    project_id: int
    query: str
    top_k: int = 5


class AskRequest(BaseModel):
    project_id: int
    query: str
    top_k: int = 5


class SearchResult(BaseModel):
    document: str
    metadata: dict


class SearchResponse(BaseModel):
    results: list[SearchResult]


class AskResponse(BaseModel):
    answer: str