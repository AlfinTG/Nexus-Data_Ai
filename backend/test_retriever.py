from core.retriever import Retriever

retriever = Retriever()

response = retriever.retrieve(
    project_id="demo_project",
    question="What is the AI Intelligence Platform?",
)

print("QUESTION:")
print(response["question"])

print("\nCONTEXT:")
print(response["context"])