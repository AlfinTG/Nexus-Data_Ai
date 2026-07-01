import requests


class LLMService:
    """
    Connects to the local Ollama LLM.
    """

    def __init__(self):
        self.url = "http://localhost:11434/api/generate"
        self.model = "llama3"

    def generate(self, prompt: str) -> str:

        response = requests.post(
            self.url,
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
            },
        )

        response.raise_for_status()

        return response.json()["response"]