from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.main_pipeline import get_final_answer
from app.core.security import get_current_user
from app.db.database import get_db
from app.db.models import ChatHistory

router = APIRouter()


# Request schema
class Query(BaseModel):
    query: str


@router.post("/chat")
def chat(
    query: Query,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """
    Chat endpoint with:
    - JWT authentication
    - Chat history storage
    """

    # 🔹 Get answer from your RAG pipeline
    answer = get_final_answer(query.query)

    # 🔹 Save chat history to DB
    chat_entry = ChatHistory(
        user_id=user.id,
        question=query.query,
        answer=answer
    )

    db.add(chat_entry)
    db.commit()

    return {
        "answer": answer,
        "user": user.email
    }