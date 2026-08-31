import os

from dotenv import load_dotenv
from google import genai

load_dotenv()


class LLMService:
    """
    Connects to Google's Gemini API.
    """

    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")

        if not api_key:
            raise Exception(
                "GEMINI_API_KEY not found in .env"
            )

        self.client = genai.Client(api_key=api_key)
        self.model = "gemini-2.5-flash"

    def generate(self, prompt: str) -> str:
        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )

            return response.text

        except Exception as e:
            raise Exception(
                f"Gemini request failed: {e}"
            )