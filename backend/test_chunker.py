from core.text_chunker import TextChunker

text = "Hello World " * 300

chunker = TextChunker()

chunks = chunker.chunk_text(text)

print(f"Chunks created: {len(chunks)}")

for i, chunk in enumerate(chunks):
    print(f"Chunk {i+1}: {len(chunk)} characters")