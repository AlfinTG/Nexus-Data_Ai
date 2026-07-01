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
        top_k: int = 8
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
    You are EPC Intelligence Platform AI.

    You are an engineering assistant.

    Rules:

1. Use ONLY the provided context.
2. Never invent information.
3. If the answer is missing, reply:
   "I could not find that information in the uploaded documents."
4. Answer in clear engineering language.
5. Use bullet points whenever appropriate.
6. If there are equations or units, preserve them.

========================
DOCUMENT CONTEXT
========================

{context}

========================
QUESTION
========================

{query}

========================
ANSWER
========================
"""

    def ask(
        self,
        project_id: int,
        query: str,
        top_k: int = 5
    ):

        results = self.vector_store.search(
            project_id=str(project_id),
            query=query,
            k=top_k
        )

        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        if not documents:
            return {
                "answer": "I could not find relevant information in the uploaded documents.",
                "sources": []
            }

        context = "\n\n".join(documents)

        prompt = self.build_prompt(
            query=query,
            context=context
        )

        answer = self.llm.generate(prompt)

        return {
            "answer": answer,
            "sources": metadatas
        }