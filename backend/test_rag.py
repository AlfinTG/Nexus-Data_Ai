from core.rag_pipeline import RAGPipeline

rag = RAGPipeline()

query = "What is this document about?"

context = rag.retrieve_context(
    project_id=4,
    query=query
)

print("=" * 60)
print("RETRIEVED CONTEXT")
print("=" * 60)
print(context)

print("\n" + "=" * 60)
print("PROMPT")
print("=" * 60)

prompt = rag.build_prompt(query, context)
print(prompt)