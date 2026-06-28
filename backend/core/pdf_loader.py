import fitz  # PyMuPDF


class PDFLoader:
    """
    Loads a PDF and extracts text page by page.
    """

    def load(self, pdf_path: str):
        document = fitz.open(pdf_path)

        pages = []

        for page_number, page in enumerate(document):
            text = page.get_text("text")

            pages.append(
                {
                    "page": page_number + 1,
                    "text": text,
                }
            )

        document.close()

        return pages