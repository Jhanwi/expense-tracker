# 📊 Expense-Tracer: Secure Full-Stack Financial Ingestion & Analytics Engine

> A high-performance, authenticated full-stack web platform designed to isolate individual user profiles, log rolling monthly bill expenditures, and compile chronological financial analytics via interactive Year-over-Year data visualization.

---

## 📌 Table of Contents
- [✨ Key Engineering Features](#-key-engineering-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ System Architecture](#%EF%B8%8F-system-architecture)
- [🚀 Local Deployment Guide](#-local-deployment-guide)
- [🗄️ Database Schema Modeling](#%EF%B8%8F-database-schema-modeling)
- [📬 Contact](#-contact)

---

## ✨ Key Engineering Features

- **🔐 Multi-User Session Isolation**: Implements secure credential verification using **cryptographic password hashing (bcrypt)** and stateless **JSON Web Tokens (JWT)** to enforce strict data isolation at the database tier.
- **📊 Year-over-Year (YoY) Visual Analytics**: Integrates a dynamic side-by-side clustered vertical bar chart using **Chart.js** to map and compare running monthly balances for the current year directly against historical baselines.
- **⏱️ Inactivity Session Garbage Collection**: Features an advanced client-side event observer framework tracking global inputs (`mousemove`, `keydown`, `click`). Automatically purges local memory caches and forces redirection to the login gateway after **15 minutes of inactivity**.
- **🛠️ Full-Lifecycle CRUD Operations**: Complete programmatic implementation for adding, reading, inline updating, and cascading deletion of transaction records safely without DOM string-splitting conflicts.
- **💾 Relational Persistence Layer**: Leverages the **SQLAlchemy ORM** to manage connection states, map data entities, and dynamically build schema definitions out-of-the-box inside a local filesystem database.

---

## 🛠️ Tech Stack

### Backend API Tier
- **Language/Framework**: Python 3.12+ / FastAPI (Asynchronous REST framework)
- **Security Utilities**: PyJWT, Passlib (Bcrypt backend), Pydantic (Data validation layers)
- **Database Engine & ORM**: SQLite / SQLAlchemy ORM (Object Relational Mapper)

### Frontend Client Layer
- **Interface Structure**: Semantic HTML5, Modern CSS Layouts (CSS Grid / Flexbox Layout)
- **Data Rendering Canvas**: Vanilla ES6 JavaScript (Programmatic event delegation), Chart.js CDN

---

## 🏗️ System Architecture

```text
  +------------------------------------------------------------------------+

  |                        Browser Client Interface                        |
  |   [HTML5 Layout]  <-->  [CSS Slate-Charcoal Theme]  <-->  [Chart.js]   |
  +------------------------------------------------------------------------+
                                       │
                    Secure Client-Side API Fetch Requests
                        (Authorization: Bearer <JWT>)
                                       │
                                       ▼
  +------------------------------------------------------------------------+

  |                          FastAPI API Routing Engine                    |
  |   [/api/auth/*] Access Control  │  [/api/transactions/*] Protected Data  |
  +------------------------------------------------------------------------+
                                       │
                         Programmatic Data Operations
                                       │
                                       ▼
  +------------------------------------------------------------------------+

  |                        Relational Persistence Tier                     |
  |             [SQLAlchemy ORM Layer]  <-->  [SQLite Engine Pool]         |
  +------------------------------------------------------------------------+
```

---

## 🚀 Local Deployment Guide

Follow these steps to spin up the full-stack system natively on your local machine:

### 📋 Prerequisites
Ensure you have the latest stable distribution of **Python 3.12+** installed on your system.

### 🐍 1. Initialize the Backend Core Server
1. Open your terminal or Command Prompt, and navigate to the backend folder path:
   ```bash
   cd d:/smart-spend/backend
   ```
2. Create an isolated python virtual environment and activate it:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/Ubuntu/macOS:
   source venv/bin/activate
   ```
3. Install the application constraints and requirements:
   ```bash
   pip install fastapi uvicorn pydantic[email] sqlalchemy passlib[bcrypt] pyjwt python-multipart
   ```
4. Turn on the background development server engine:
   ```bash
   python -m uvicorn main:app --reload
   ```
   *(Verify the terminal displays: `INFO: Uvicorn running on http://127.0.0.1:8000`)*.

### 🖥️ 2. Host the Responsive UI Client
1. Open a **second, completely separate** terminal or Command Prompt window.
2. Step inside your frontend folder asset directory:
   ```bash
   cd d:/smart-spend/frontend
   ```
3. Boot up the local HTTP network distribution node:
   ```bash
   python -m http.server 3000
   ```
4. Launch your browser window and navigate to your production interface: **`http://localhost:3000`**

---

## 🗄️ Database Schema Modeling

The storage engine tracks objects and enforces isolation using two primary table layouts:

### 👤 User Entities Model (`users`)
- `id` (Integer, Primary Key, Auto-Increment)
- `username` (VARCHAR, Unique, Indexed)
- `email` (VARCHAR, Unique)
- `hashed_password` (VARCHAR, Secure Bcrypt String Capsule)

### 💸 Transaction Ledger Model (`transactions`)
- `id` (Integer, Primary Key, Auto-Increment)
- `user_id` (Integer, Indexed, Foreign Key mapped to User profile context)
- `category_id` (Integer, Maps to: Miscellaneous, Clothing, Transportation, HouseHold)
- `amount` (Float / Numeric Scalar Balance formatted in INR ₹)
- `description` (VARCHAR, Sanitized Input Text String)
- `date` (Date, Chronological timestamp)

---
## Screenshot Of The Website

<p align="center">Sign Up Page</p>
<p align="center">
 <img src="./static/signup.png">
</p>

<p align="center">Login Page</p>
<p align="center">
 <img src="./static/login.png">
</p>

<p align="center">Add Transaction Page</p>
<p align="center">
 <img src="./static/add.png">
</p>

<p align="center">Transaction History Page</p>
<p align="center">
 <img src="./static/history.png">
</p>

<p align="center">Category Wise Pie Chart For Current Year</p>
<p align="center">
 <img src="./static/pie.png">
</p>

<p align="center">Comparison Between Current Year And Previous Year Transactions</p>
<p align="center">
 <img src="./static/comparison.png">
</p>

<p align="center">Daily Line Chart for Current Month</p>
<p align="center">
 <img src="./static/line.png">
</p>


---

## 📬 Contact
- **Project Repository**: [https://github.com/jhanwi](https://github.com)
- **LinkedIn Profile**: [https://linkedin.com/jhanwi-kumari](https://linkedin.com)
