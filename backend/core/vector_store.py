from chromadb import PersistentClient
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer


class VectorStore:
    def __init__(self):
        self.client = PersistentClient(
            path="chroma_db",
            settings=Settings(anonymized_telemetry=False),
        )

        # Local embedding model
        self.model = SentenceTransformer("BAAI/bge-small-en-v1.5")

    def get_collection(self, project_id: str):
        return self.client.get_or_create_collection(
            name=f"project_{project_id}"
        )

    def add_chunks(self, project_id, chunks, metadata):
        collection = self.get_collection(project_id)

        embeddings = self.model.encode(chunks).tolist()

        collection.add(
            ids=[str(i) for i in range(len(chunks))],
            documents=chunks,
            embeddings=embeddings,
            metadatas=metadata,
        )

    def search(self, project_id, query, k=5):
        collection = self.get_collection(project_id)

        query_embedding = self.model.encode([query]).tolist()[0]

        return collection.query(
            query_embeddings=[query_embedding],
            n_results=k,
        )
    