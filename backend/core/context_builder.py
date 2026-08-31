class ContextBuilder:
    """
    Builds an LLM-ready context from retrieved search results.
    """

    def build(self, results):
        documents = results.get("documents", [[]])[0]
        metadatas = results.get("metadatas", [[]])[0]

        context = []

        for doc, meta in zip(documents, metadatas):
            context.append(
                f"""[Source: {meta['source']} | Page: {meta['page']}]

{doc}
"""
            )

        return "\n\n".join(context)