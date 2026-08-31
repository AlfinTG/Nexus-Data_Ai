import logging

from chromadb import PersistentClient
from chromadb.config import Settings
from core.embeddings import EmbeddingGenerator
import uuid

logger = logging.getLogger(__name__)


class VectorStore:
    """
    Handles storing and searching document embeddings.
    """

    def __init__(self):
        self.client = PersistentClient(
            path="chroma_db",
            settings=Settings(
                anonymized_telemetry=False
            ),
        )

        self.embedder = EmbeddingGenerator()

    def get_collection(self, project_id: str):
        return self.client.get_or_create_collection(
            name=f"project_{project_id}"
        )

    def add_chunks(
        self,
        project_id,
        chunks,
        metadata
    ):
        collection = self.get_collection(project_id)

        logger.debug("Chunks received: %d", len(chunks))

        embeddings = self.embedder.generate_embeddings(chunks)

        collection.add(
            ids=[str(uuid.uuid4()) for _ in chunks],
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadata,
        )

        logger.debug("Collection count: %d", collection.count())

    def search(
        self,
        project_id,
        query,
        k=5
    ):
        collection = self.get_collection(project_id)

        query_embedding = self.embedder.generate_embedding(query)

        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=k,
        )

        logger.debug("Search results: %s", results)

        return results

    def count(self, project_id):
        collection = self.get_collection(project_id)
        return collection.count()
