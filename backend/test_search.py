from core.vector_store import VectorStore

store = VectorStore()

results = store.search(
    project_id="demo_project",
    query="What is the UPS capacity?",
    k=3,
)

print("\n===== SEARCH RESULTS =====\n")

documents = results.get("documents", [[]])[0]
metadatas = results.get("metadatas", [[]])[0]

for i, (doc, meta) in enumerate(zip(documents, metadatas), start=1):
    print(f"Result {i}")
    print(f"Page : {meta.get('page')}")
    print(f"Source : {meta.get('source')}")
    print("-" * 60)
    print(doc[:400])
    print()