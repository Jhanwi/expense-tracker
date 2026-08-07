from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from pydantic import BaseModel, EmailStr
from datetime import date as dt_date, datetime, timedelta
from passlib.context import CryptContext
import models
import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY", "SUPER_SECRET_SECURITY_PASSPORT_TOKEN_KEY")
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

app = FastAPI(title="Expense Tracker Core API Engine")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

Base.metadata.create_all(bind=engine)

class UserSignUp(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class TransactionCreate(BaseModel):
    category_id: int
    amount: float
    description: str
    date: dt_date

def get_current_user_id(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None: 
            raise HTTPException(status_code=401, detail="Invalid session parameters.")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Session expired.")


@app.post("/api/auth/signup")
def signup(user: UserSignUp, db: Session = Depends(get_db)):
    # Verify that your model class name matches perfectly (e.g., UserModel)
    existing_user = db.query(models.UserModel).filter(models.UserModel.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    
    new_user = models.UserModel(
        username=user.username,
        email=user.email,
        hashed_password=pwd_context.hash(user.password)
    )
    db.add(new_user)
    db.commit()
    return {"message": "Success"}


@app.post("/api/auth/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.UserModel).filter(models.UserModel.username == user.username).first()
    if not db_user or not pwd_context.verify(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid credentials.")
    
    expiry = datetime.utcnow() + timedelta(hours=24)
    token = jwt.encode({"sub": db_user.id, "exp": expiry, "username": db_user.username}, SECRET_KEY, algorithm=ALGORITHM)
    return {"access_token": token, "token_type": "bearer", "username": db_user.username}

@app.get("/api/transactions")
def get_transactions(current_user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    return db.query(models.TransactionModel).filter(models.TransactionModel.user_id == current_user_id).order_by(models.TransactionModel.date.desc()).all()

@app.post("/api/transactions")
def create_transaction(tx: TransactionCreate, current_user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    new_tx = models.TransactionModel(
        user_id=current_user_id, category_id=tx.category_id,
        amount=tx.amount, description=tx.description, date=tx.date
    )
    db.add(new_tx)
    db.commit()
    return {"message": "Success"}

@app.put("/api/transactions/{transaction_id}")
def update_transaction(transaction_id: int, tx: TransactionCreate, current_user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    db_tx = db.query(models.TransactionModel).filter(models.TransactionModel.id == transaction_id, models.TransactionModel.user_id == current_user_id).first()
    if not db_tx: raise HTTPException(status_code=404, detail="Target tracking missing.")
    db_tx.amount = tx.amount
    db_tx.category_id = tx.category_id
    db_tx.description = tx.description
    db.commit()
    return {"message": "Updated"}

@app.delete("/api/transactions/{transaction_id}")
def delete_transaction(transaction_id: int, current_user_id: int = Depends(get_current_user_id), db: Session = Depends(get_db)):
    db_tx = db.query(models.TransactionModel).filter(models.TransactionModel.id == transaction_id, models.TransactionModel.user_id == current_user_id).first()
    if not db_tx: raise HTTPException(status_code=404, detail="Target tracking missing.")
    db.delete(db_tx)
    db.commit()
    return {"message": "Deleted"}
