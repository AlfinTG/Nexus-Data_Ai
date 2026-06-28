from core.vector_store import VectorStore
from core.context_builder import ContextBuilder


class Retriever:
    def __init__(self):
        self.store = VectorStore()
        self.builder = ContextBuilder()

    def retrieve(self, project_id: str, question: str, k: int = 5):
        results = self.store.search(
            project_id=project_id,
            query=question,
            k=k,
        )

        context = self.builder.build(results)

        return {
            "question": question,
            "context": context,
            "results": results,
        }