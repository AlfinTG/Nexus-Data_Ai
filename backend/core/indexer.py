from backend.core.test_llm import PDFLoader
from core.chunker import DocumentChunker
from core.vector_store import VectorStore


class DocumentIndexer:
    def __init__(self):
        self.loader = PDFLoader()
        self.chunker = DocumentChunker()
        self.store = VectorStore()

    def index_document(self, project_id: str, pdf_path: str):
        pages = self.loader.load(pdf_path)

        all_chunks = []
        metadata = []

        for page in pages:
            chunks = self.chunker.split_text(page["text"])

            for chunk in chunks:
                all_chunks.append(chunk)

                metadata.append(
                    {
                        "page": page["page"],
                        "source": pdf_path,
                    }
                )

        self.store.add_chunks(
            project_id=project_id,
            chunks=all_chunks,
            metadata=metadata,
        )

        return len(all_chunks)