from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ✅ FIXED IMPORTS
from app.routes.chat import router as chat_router
from app.routes.auth import router as auth_router

# (Optional - only if you created upload.py)
from app.routes.upload import router as upload_router  

app = FastAPI()

# ✅ CORS (needed for React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES
app.include_router(chat_router)
app.include_router(auth_router)

# ✅ OPTIONAL (only if upload.py exists)
try:
    app.include_router(upload_router)
except:
    pass

# ✅ HEALTH CHECK
@app.get("/")
def health():
    return {"status": "ok"}