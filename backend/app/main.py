from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.routes.auth import router as auth_router
from app.routes.chat import router as chat_router

# Import DB setup
from app.core.database import Base, engine
from app.db.database import Base, engine
from app.db import models

Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# ✅ Enable CORS (important for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later restrict to your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create database tables
Base.metadata.create_all(bind=engine)

# ✅ Register routes
app.include_router(auth_router)
app.include_router(chat_router)

# ✅ Health check route
@app.get("/")
def health():
    print("🚀 Backend started")
    return {"status": "ML Advisor SaaS Backend Running 🚀"}