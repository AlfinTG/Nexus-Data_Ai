class RetrievalStrategy:
    """
    Decides how many chunks to retrieve
    based on the user's intent.
    """

    def get_top_k(self, intent: str) -> int:

        strategy = {
            "general": 5,
            "summarize": 15,
            "compare": 15,
            "equipment": 20,
            "materials": 15,
            "standards": 10,
        }

        return strategy.get(intent, 5)