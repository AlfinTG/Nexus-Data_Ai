from langchain_text_splitters import RecursiveCharacterTextSplitter


class DocumentChunker:
    """
    Splits extracted document text into overlapping chunks
    suitable for embedding and retrieval.
    """

    def _init_(
        self,
        chunk_size: int = 800,
        chunk_overlap: int = 100,
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def split_text(self, text: str):
        """
        Returns a list of text chunks.
        """
        return self.splitter.split_text(text)