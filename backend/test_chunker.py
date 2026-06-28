from core.chunker import DocumentChunker

sample_text = """
This is a sample EPC specification.

The UPS capacity shall be 500 kVA.

Cooling system shall operate continuously.

Generator backup shall be available for 48 hours.

""" * 150

chunker = DocumentChunker()

chunks = chunker.split_text(sample_text)

print(f"Total Chunks: {len(chunks)}")

for i, chunk in enumerate(chunks[:3]):
    print(f"\n------ Chunk {i+1} ------")
    print(chunk[:250])