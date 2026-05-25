import os
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings

embedding = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

# ✅ ABSOLUTE PATH FIX (VERY IMPORTANT)
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "chroma_db")

print("DEBUG DB PATH:", DB_PATH)

vectordb = Chroma(
    persist_directory=DB_PATH,
    embedding_function=embedding
)

# DEBUG
try:
    print("DEBUG DB COUNT:", vectordb._collection.count())
except Exception as e:
    print("DEBUG ERROR:", str(e))


def get_docs_with_scores(query):
    docs = vectordb.similarity_search_with_score(query, k=3)

    print("DEBUG QUERY:", query)
    print("DEBUG DOCS:", docs)

    return docs