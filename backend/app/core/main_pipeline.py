from app.core.rag_pipeline import rag_answer
from app.core.web_search import web_fallback
from app.core.router import decide_route
import os


def get_final_answer(query):
    try:
        # Step 1: RAG
        rag_result, score, sources = rag_answer(query)

        # Step 2: Routing
        route = decide_route(score, rag_result)

        print("DEBUG Route:", route)
        print("DEBUG Score:", score)

        # Clean RAG text
        rag_text = rag_result.strip() if rag_result else ""

        # Weak detection
        weak_phrases = [
            "i don't know",
            "not sure",
            "no information"
        ]

        is_weak_rag = any(p in rag_text.lower() for p in weak_phrases) or rag_text == ""

        # Format sources
        formatted_sources = ", ".join(
            [os.path.basename(s) for s in sources]
        ) if sources else "N/A"

        # ✅ CASE 1: RAG
        if route == "rag" and not is_weak_rag:
            return f"""
📚 RAG Answer:
{rag_text}

📄 Source: {formatted_sources}
"""

        # ✅ CASE 2: WEB
        elif route == "web":
            web_result = web_fallback(query)

            return f"""
🌐 Web Answer:
{web_result}
"""

        # ✅ CASE 3: HYBRID
        elif route == "hybrid":
            web_result = web_fallback(query)

            if is_weak_rag:
                return f"""
🌐 Web Answer:
{web_result}
"""

            return f"""
📚 From ML Knowledge Base:
{rag_text}

📄 Source: {formatted_sources}

🌐 From Web:
{web_result}
"""

        # fallback safety
        web_result = web_fallback(query)
        return f"""
🌐 Web Answer:
{web_result}
"""

    except Exception as e:
        return f"❌ Error occurred: {str(e)}"


# CLI test
if __name__ == "__main__":
    query = input("Ask your ML question: ")
    print(get_final_answer(query))
    print("DEBUG Score:", score)
    print("DEBUG RAG:", rag_result)