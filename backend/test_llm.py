from core.llm import LLMService

llm = LLMService()

answer = llm.generate(
    "Explain what a pressure gauge is."
)

print(answer)
print(answer)