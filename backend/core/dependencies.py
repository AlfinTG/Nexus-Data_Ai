"""
Process-wide singleton accessors for expensive, stateful services.

VectorStore and RAGPipeline both hold heavy resources (a ChromaDB
PersistentClient, a SentenceTransformer embedding model, a Gemini
client). Previously these were instantiated multiple times across
the app (once per module-level global, once per RAGPipeline, and
once per PDF-upload request), and were built eagerly at import
time, which slowed backend startup.

These accessors are lazily created on first use and cached via
lru_cache, so:
- the app only ever holds one ChromaDB client / embedder / LLM
  client for the lifetime of the process
- nothing heavy loads until the first request that actually needs it,
  so `uvicorn` startup is fast
- behavior and outputs are unchanged; this only affects *when* and
  *how many times* objects are constructed
"""

from functools import lru_cache

from core.vector_store import VectorStore
from core.rag_pipeline import RAGPipeline


@lru_cache
def get_vector_store() -> VectorStore:
    return VectorStore()


@lru_cache
def get_rag_pipeline() -> RAGPipeline:
    # Reuse the same VectorStore singleton instead of letting
    # RAGPipeline construct (and thus duplicate) its own.
    return RAGPipeline(vector_store=get_vector_store())
