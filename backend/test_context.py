from core.vector_store import VectorStore
from core.context_builder import ContextBuilder

store = VectorStore()
builder = ContextBuilder()

results = store.search(
    project_id="demo_project",
    query="AI Intelligence Platform",
    k=3,
)

context = builder.build(results)

print(context)