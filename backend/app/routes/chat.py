from fastapi import APIRouter
from pydantic import BaseModel
from app.core.main_pipeline import get_final_answer

router = APIRouter()

class Query(BaseModel):
    query: str

@router.post("/chat")
def chat(query: Query):
    answer = get_final_answer(query.query)
    return {"answer": answer}