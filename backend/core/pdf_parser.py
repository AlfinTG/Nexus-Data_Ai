import fitz  # PyMuPDF


def extract_pages(file_bytes: bytes) -> list:
    doc = fitz.open(stream=file_bytes, filetype="pdf")

    pages = []

    for i in range(len(doc)):
        text = doc.load_page(i).get_text("text")

        if text.strip():
            pages.append({
                "page": i + 1,
                "text": text.strip()
            })

    doc.close()

    return pages


def get_full_text(file_bytes: bytes) -> str:
    pages = extract_pages(file_bytes)

    return "\n\n".join(
        [f"[Page {p['page']}]\n{p['text']}" for p in pages]
    )