class ConfidenceEstimator:
    """
    Estimates answer confidence
    from ChromaDB retrieval distances.
    """

    def estimate(self, distances):

        if not distances:
            return "Low"

        best = min(distances)

        if best < 0.40:
            return "Very High"

        elif best < 0.70:
            return "High"

        elif best < 1.00:
            return "Medium"

        return "Low"