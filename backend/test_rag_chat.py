from core.rag_pipeline import RAGPipeline

rag = RAGPipeline()

answer = rag.ask(
    project_id=6,
    query="question 1"
)

print("\n")
print("=" * 80)
print("AI ANSWER")
print("=" * 80)
print(answer)