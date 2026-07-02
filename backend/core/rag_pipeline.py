from core.vector_store import VectorStore
from core.llm import LLMService
from core.conversation import ConversationManager
from core.intent_detector import IntentDetector
from core.retrieval_strategy import RetrievalStrategy
from core.context_cleaner import ContextCleaner
from core.confidence import ConfidenceEstimator
from core.response_formatter import ResponseFormatter


class RAGPipeline:

    def __init__(self):
        self.vector_store = VectorStore()
        self.llm = LLMService()
        self.conversation = ConversationManager()
        self.intent = IntentDetector()
        self.strategy = RetrievalStrategy()
        self.cleaner = ContextCleaner()
        self.confidence = ConfidenceEstimator()
        self.formatter = ResponseFormatter()

    def retrieve_context(self, project_id: int, query: str, top_k: int = 5):

        results = self.vector_store.search(
            project_id=str(project_id),
            query=query,
            k=top_k
        )

        documents = results.get("documents", [[]])[0]
        documents = self.cleaner.clean(documents)

        metadatas = results.get("metadatas", [[]])[0]
        distances = results.get("distances", [[]])[0]

        if not documents:
            return {
                "context": "",
                "sources": [],
                "distances": []
            }

        return {
            "context": "\n\n".join(documents),
            "sources": metadatas,
            "distances": distances
        }

    def build_history(self, db, project_id: int):

        history = self.conversation.get_history(db, project_id)

        if not history:
            return ""

        formatted = []

        for msg in history:
            formatted.append(
                f"{msg.role.capitalize()}: {msg.message}"
            )

        return "\n".join(formatted)

    def build_prompt(
        self,
        query: str,
        context: str,
        history: str = "",
        intent: str = "general"
    ):

        instructions = ""

        if intent == "compare":
            instructions = """
Compare the engineering documents.

- Highlight similarities and differences.
- Use a markdown table.
- End with recommendations.
"""

        elif intent == "summarize":
            instructions = """
Provide an engineering summary.

## Project Overview

## Key Systems

## Recommendations
"""

        elif intent == "equipment":
            instructions = """
Extract all equipment names with specifications.
"""

        elif intent == "standards":
            instructions = """
List all engineering standards and explain their usage.
"""

        elif intent == "materials":
            instructions = """
List all engineering materials with applications.
"""

        else:
            instructions = """
Answer professionally.

## Summary

## Engineering Details

## Recommendations
"""

        return f"""
You are Nexus AI, an expert EPC Engineering Assistant.

Only answer using the uploaded documents.

Never invent information.

==========================
INTENT
==========================

{instructions}

==========================
CHAT HISTORY
==========================

{history}

==========================
DOCUMENT CONTEXT
==========================

{context}

==========================
QUESTION
==========================

{query}
"""

    def ask(
        self,
        db,
        project_id: int,
        query: str,
        top_k: int = 5
    ):

        intent = self.intent.detect(query)

        top_k = self.strategy.get_top_k(intent)

        retrieval = self.retrieve_context(
            project_id,
            query,
            top_k
        )

        context = retrieval["context"]
        sources = retrieval["sources"]

        if not context:
            return {
                "answer": "I could not find relevant information.",
                "confidence": 0,
                "sources": []
            }

        history = self.build_history(
            db,
            project_id
        )

        prompt = self.build_prompt(
            query=query,
            context=context,
            history=history,
            intent=intent
        )

        answer = self.llm.generate(prompt)

        self.conversation.add_message(
            db,
            project_id,
            "user",
            query
        )

        self.conversation.add_message(
            db,
            project_id,
            "assistant",
            answer
        )

        confidence = self.confidence.estimate(
            answer,
            context
        )

        unique_sources = []
        seen = set()

        for source in sources:
            key = (
                source["document_id"],
                source["chunk_index"]
            )

            if key not in seen:
                seen.add(key)
                unique_sources.append(source)

        formatted_answer = self.formatter.format(
            answer,
            confidence,
            unique_sources
        )

        return {
            "answer": formatted_answer,
            "confidence": confidence,
            "sources": unique_sources
        }