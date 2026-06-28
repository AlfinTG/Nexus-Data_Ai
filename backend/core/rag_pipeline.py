from core.vector_store import VectorStore


class RAGPipeline:
    """
    Retrieves relevant document chunks and prepares context
    for the language model.
    """

    def __init__(self):
        self.vector_store = VectorStore()

    def retrieve_context(
        self,
        project_id: int,
        query: str,
        top_k: int = 5
    ) -> str:

        results = self.vector_store.search(
            project_id=str(project_id),
            query=query,
            k=top_k
        )

        documents = results.get("documents", [[]])[0]

        if not documents:
            return ""

        return "\n\n".join(documents)

    def build_prompt(
        self,
        query: str,
        context: str
    ) -> str:
        return f"""
You are an EPC Engineering AI Assistant.

Use ONLY the information provided in the context below.
If the answer is not present in the context, reply:
"I could not find that information in the uploaded documents."

Context:
{context}

Question:
{query}

Answer:
"""