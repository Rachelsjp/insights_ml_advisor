# ingest_docs.py (inside ML_Advisor/src)

import os
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_core.documents import Document
import docx2txt
from dotenv import load_dotenv

# Load environment variables (like OPENAI_API_KEY)
load_dotenv()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATA_PATH = os.path.join(BASE_DIR, "data")
PERSIST_DIRECTORY = os.path.join(BASE_DIR, "chroma_db")

# Load documents
documents = []
for root, dirs, files in os.walk(DATA_PATH):
    for file in files:
        if file.endswith(".txt") or file.endswith(".docx"):
            file_path = os.path.join(root, file)
            if file.endswith(".docx"):
                content = docx2txt.process(file_path)
            else:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
            documents.append(Document(page_content=content, metadata={"source": file_path}))

print(f"Total documents loaded: {len(documents)}")

# Split documents into chunks for embeddings
text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=100
)
docs = text_splitter.split_documents(documents)
print(f"Total chunks created: {len(docs)}")

# Create embeddings
embedding = HuggingFaceEmbeddings(
    model_name="all-MiniLM-L6-v2"
)

# Create / persist Chroma vector store
vectordb = Chroma.from_documents(
    documents=docs,
    embedding=embedding,
    persist_directory=PERSIST_DIRECTORY
)
vectordb.persist()

print("Ingestion complete. Vector store saved to:", PERSIST_DIRECTORY)