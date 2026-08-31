from sentence_transformers import SentenceTransformer


class EmbeddingGenerator:
    """
    Generates vector embeddings for text.
    Uses a singleton model so it loads only once.
    """

    _model = None

    def __init__(self):
        if EmbeddingGenerator._model is None:
            print("Loading embedding model...")
            EmbeddingGenerator._model = SentenceTransformer(
                "BAAI/bge-small-en-v1.5"
            )

    def generate_embedding(self, text: str):
        return EmbeddingGenerator._model.encode(text).tolist()

    def generate_embeddings(self, texts: list[str]):
        return EmbeddingGenerator._model.encode(texts).tolist()