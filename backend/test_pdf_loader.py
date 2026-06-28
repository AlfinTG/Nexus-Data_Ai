from core.pdf_loader import PDFLoader

loader = PDFLoader()

pages = loader.load("data/sample.pdf")

print(f"Pages Found: {len(pages)}")

for page in pages:
    print(f"\nPage {page['page']}")
    print("-" * 40)
    print(page["text"][:300])