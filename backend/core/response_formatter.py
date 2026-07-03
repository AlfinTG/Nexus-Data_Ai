class ResponseFormatter:
    """
    Formats AI responses into professional
    engineering markdown.
    """

    def format(
        self,
        answer: str,
        confidence: str,
        sources: list
    ) -> str:

        markdown = "# Engineering AI Response\n\n"

        markdown += answer.strip()

        markdown += "\n\n---\n\n"

        markdown += "## Confidence\n\n"

        markdown += f"**{confidence}**\n\n"

        markdown += "---\n\n"

        markdown += "## Sources\n\n"

        if not sources:

            markdown += "_No sources available._"

        else:

            for source in sources:

                markdown += (
                    f"- {source['filename']} "
                    f"(Chunk {source['chunk_index']})\n"
                )

        return markdown