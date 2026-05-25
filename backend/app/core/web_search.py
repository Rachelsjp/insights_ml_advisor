from langchain_community.utilities import SerpAPIWrapper
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

search = SerpAPIWrapper()
llm = ChatOpenAI(temperature=0)


def web_fallback(query):
    try:
        raw_results = search.run(query)

        if not raw_results:
            return "No relevant web results found."

        prompt = f"""
You are an expert Machine Learning assistant.

Summarize clearly and concisely.

Web Results:
{raw_results}

Question:
{query}
"""

        response = llm.invoke(prompt)
        return response.content.strip()

    except Exception as e:
        return f"Web search failed: {str(e)}"