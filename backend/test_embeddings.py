from core.embeddings import EmbeddingGenerator

generator = EmbeddingGenerator()

embedding = generator.generate_embedding(
    "This is a test document."
)

print(type(embedding))
print(len(embedding))
print(embedding[:10])