class ContextCleaner:
    """
    Removes duplicate document chunks before
    sending them to the LLM.
    """

    def clean(self, documents: list[str]) -> list[str]:

        unique = []
        seen = set()

        for doc in documents:

            text = doc.strip()

            if text not in seen:
                seen.add(text)
                unique.append(text)

        return unique