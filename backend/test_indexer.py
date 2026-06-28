from core.indexer import DocumentIndexer

indexer = DocumentIndexer()

count = indexer.index_document(
    project_id="demo_project",
    pdf_path="data/sample.pdf",
)

print(f"Indexed {count} chunks successfully!")