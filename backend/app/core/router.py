# router.py

def decide_route(score, rag_answer):
    """
    Decide how to answer the query.

    Routes:
    - "rag"     → Use only RAG
    - "web"     → Use only Web search
    - "hybrid"  → Combine RAG + Web
    """

    # Normalize answer
    rag_text = rag_answer.strip() if rag_answer else ""

    # 🚨 Case 1: No answer → Web
    if rag_text == "":
        return "web"

    # 🚨 Case 2: Weak answer detection
    weak_phrases = ["i don't know", "not sure", "no information"]
    is_weak = any(phrase in rag_text.lower() for phrase in weak_phrases)

    # 🎯 Case 3: Strong confidence → RAG
    if score < 1.2 and not is_weak:
        return "rag"

    # ⚖️ Case 4: Medium confidence OR weak → Hybrid
    if score < 2 or is_weak:
        return "hybrid"

    # ❌ Case 5: Low confidence → Web
    return "web"