from core.vector_store import VectorStore
from core.llm import LLMService


class RAGPipeline:
    """
    Retrieves relevant document chunks and generates
    AI answers using the local LLM.
    """

    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = LLMService()

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

Answer ONLY using the information provided below.

If the answer cannot be found in the context,
reply exactly:

"I could not find that information in the uploaded documents."

Context:
{context}

Question:
{query}

Answer:
"""

    def ask(
        self,
        project_id: int,
        query: str,
        top_k: int = 5
    ) -> str:

        context = self.retrieve_context(
            project_id,
            query,
            top_k
        )

        if not context:
            return "I could not find relevant information in the uploaded documents."

        prompt = self.build_prompt(
            query,
            context
        )

        answer = self.llm.generate(prompt)

        return answer