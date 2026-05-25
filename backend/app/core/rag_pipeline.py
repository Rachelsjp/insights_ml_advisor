from dotenv import load_dotenv
import os
load_dotenv()

from app.core.retriever import get_docs_with_scores
from langchain_openai import ChatOpenAI

# Initialize LLM
llm = ChatOpenAI(temperature=0)


def rag_answer(query):
    # Step 1: Retrieve documents with scores
    docs_scores = get_docs_with_scores(query)

    # Step 2: Handle no results
    if not docs_scores:
        return None, 999, []

    # Step 3: Take top 2 docs for better context
    top_docs = docs_scores[:2]

    # Step 4: Build context
    context = "\n\n".join([doc.page_content for doc, _ in top_docs])

    # Step 5: Extract sources
    sources = list(set([
        doc.metadata.get("source", "unknown")
        for doc, _ in top_docs
    ]))

    # Step 6: Prompt
    prompt = f"""
You are an expert Machine Learning assistant.

Answer the question using the context below.
You can use your knowledge to explain clearly, but stay grounded in the context.

Context:
{context}

Question:
{query}
"""

    # Step 7: Call LLM
    response = llm.invoke(prompt)

    # Step 8: Return answer + score + sources
    return response.content, docs_scores[0][1], sources


# Optional test
if __name__ == "__main__":
    query = "What is linear regression?"
    answer, score, sources = rag_answer(query)

    print("Score:", score)
    print("Sources:", sources)
    print("Answer:\n", answer)