class IntentDetector:
    """
    Detects the user's intent from the question.
    """

    def detect(self, query: str) -> str:
        query = query.lower()

        if any(word in query for word in [
            "compare",
            "difference",
            "differences",
            "versus",
            "vs"
        ]):
            return "compare"

        if any(word in query for word in [
            "summary",
            "summarize",
            "overview"
        ]):
            return "summarize"

        if any(word in query for word in [
            "list",
            "show all",
            "what are"
        ]):
            return "list"

        if any(word in query for word in [
            "standard",
            "code",
            "regulation"
        ]):
            return "standards"

        if any(word in query for word in [
            "material",
            "materials"
        ]):
            return "materials"

        if any(word in query for word in [
            "equipment",
            "device",
            "component"
        ]):
            return "equipment"

        return "general"