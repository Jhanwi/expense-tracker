# 💰 Expense Tracker

> Expense Tracker is a full-stack web application I built to keep track of daily income and expenses. I wanted to build something where I could practice working with a React frontend, FastAPI backend, SQLAlchemy, database operations, authentication, and REST APIs in one project

---

## 🌟 Features

* 🔐 User signup and login
* 🔑 JWT-based authentication
* ➕ Add income and expense transactions
* ✏️ Edit transactions
* 🗑️ Delete transactions
* 📊 View income, expenses, and balance
* 🏷️ Organize transactions by category
* 🔎 Filter transactions
* 📄 Import transactions from CSV files
* 📜 View transaction history
* 📱 Responsive user interface

---

## 🖥️ How It Works

```text
┌──────────────────┐
│  React Frontend  │
│                  │
│  UI + Forms +    │
│  CSV Import      │
└────────┬─────────┘
         │
      REST API
         │
         ▼
┌──────────────────┐
│  FastAPI Backend │
│                  │
│ Auth + CRUD +    │
│ Validation       │
└────────┬─────────┘
         │
     SQLAlchemy
         │
         ▼
┌──────────────────┐
│ SQLite Database  │
└──────────────────┘
```

The React frontend communicates with the FastAPI backend through REST APIs. The backend handles authentication, validation, and transaction operations, while SQLAlchemy is used for database operations.

---

## ⚡ Features Overview

| Feature           | Description                                  |
| ----------------- | -------------------------------------------- |
| 🔐 Authentication | User signup, login, and JWT authentication   |
| 💸 Transactions   | Add, edit, and delete transactions           |
| 📊 Dashboard      | View income, expenses, and balance           |
| 🏷️ Categories    | Organize and filter transactions             |
| 📄 CSV Import     | Import multiple transactions from a CSV file |
| 🗄️ Database      | Store application data using SQLite          |
| 🔌 REST API       | Backend APIs built with FastAPI              |

---

## 🔐 Authentication

The application uses JWT-based authentication.

```text
Create Account
      ↓
    Login
      ↓
Credentials Verified
      ↓
  JWT Token
      ↓
Protected API Requests
```

Passwords are hashed before being stored in the database.

---

## 📄 CSV Import

The application allows users to import multiple transactions using a CSV file.

Example:

```csv
date,description,category,amount
2026-01-10,Groceries,Food,850
2026-01-12,Bus Ticket,Travel,50
2026-01-15,Electricity Bill,Bills,1200
```

This makes it easier to add multiple expenses without entering them one by one.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* JWT
* Passlib

### Database

* SQLite

### Tools

* Git
* GitHub
* Docker
* VS Code

---

## 📁 Project Structure

```text
expense-tracker/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── seed.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Jhanwi/expense-tracker.git
cd expense-tracker
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL provided by Vite in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` directory.

```env
DATABASE_URL=sqlite:///./expense_tracker.db
SECRET_KEY=your_secret_key
```

Keep your actual secret values out of the repository.

---

## 🧠 What I Learned

Building this project helped me get practical experience with:

* Creating REST APIs using FastAPI
* Connecting a React frontend with a Python backend
* Working with SQLAlchemy ORM
* Designing and working with database models
* Implementing JWT authentication
* Password hashing
* Handling forms and API requests
* Processing CSV files
* Using environment variables
* Debugging frontend and backend issues
* Using Git and GitHub
* Running applications with Docker

---

## 🔨 Future Improvements

* [ ] Add PostgreSQL support
* [ ] Add monthly and yearly spending reports
* [ ] Add charts for expense analysis
* [ ] Improve transaction search and filtering
* [ ] Add pagination
* [ ] Improve validation and error messages
* [ ] Deploy the application

---

## 📌 Project Status

🟢 **Active portfolio project**

This project was built to gain practical experience with full-stack development, backend development, REST APIs, authentication, and database integration.

---

## 👩‍💻 Author

**Jhanwi Kumari**

[GitHub](https://github.com/Jhanwi)
