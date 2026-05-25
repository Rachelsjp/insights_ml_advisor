from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
def login(username: str, password: str):
    if username == "admin" and password == "admin123":
        return {"token": "fake-jwt-token"}
    return {"error": "Invalid credentials"}