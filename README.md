# 🚀 HRMS Lite – Full Stack Human Resource Management System

## 📌 Overview
**HRMS Lite** is a production-ready, full-stack web application designed to streamline employee record management and daily attendance tracking. 

This project demonstrates a complete end-to-end implementation, featuring a robust FastAPI backend, a responsive Next.js frontend, and a relational PostgreSQL database. It focuses on clean architecture, strict data validation, and deployment stability.

---

## 🌐 Live Application

| Component | Link |
| :--- | :--- |
| **Frontend (Vercel)** | [View Live Site](https://hrms-lite-delta-vert.vercel.app/) |
| **Backend API (Render)** | [API Documentation (Swagger)](https://hrms-lite-4fab.onrender.com/docs) |

---

## 🏗 Architecture

The system follows a classic three-tier architecture:



1. **Client (Next.js):** Handles user interactions, state management, and API consumption.
2. **Server (FastAPI):** Manages business logic, RESTful endpoints, and Pydantic validation.
3. **Database (PostgreSQL):** Ensures data persistence and relational integrity through unique constraints.

---

## 🧱 Core Features

### 👥 Employee Management
* **Full CRUD:** Create, view, and delete employee records.
* **Data Integrity:** Strict prevention of duplicate Employee IDs and Email addresses.
* **Search:** Case-insensitive employee lookup for easier management.

### 📅 Attendance Management
* **Mark Attendance:** Log daily status as `PRESENT` or `ABSENT`.
* **Daily Constraints:** Database-level prevention of duplicate entries for the same employee on the same day.
* **History:** Retrieve specific attendance logs per employee.

### 📊 Dashboard
* Real-time aggregation of total employees.
* Daily snapshots showing "Present Today" vs. "Absent Today" counts.

---

## 🗄 Database Design

### Employee Table
| Field | Type | Constraint |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `employee_id` | String | Unique |
| `full_name` | String | Required |
| `email` | String | Unique |
| `department` | String | Required |

### Attendance Table
| Field | Type | Constraint |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `employee_id` | FK | References `Employee.id` |
| `date` | Date | Required |
| `status` | Enum | `PRESENT` / `ABSENT` |

> **Note:** A unique composite constraint exists on `(employee_id, date)` to ensure one attendance record per employee per day.

---

## 🛠 Technology Stack

* **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS.
* **Backend:** FastAPI, SQLAlchemy ORM, Pydantic, Uvicorn.
* **Database:** PostgreSQL (Production), SQLite (Development).
* **Deployment:** Vercel (Frontend), Render (Backend & Database).

---

It looks like your Markdown had a few structural hiccups—specifically with nested code blocks, inconsistent headers, and the alignment of the environment variables table.

I’ve cleaned it up to be more scannable and professional. I also converted the environment variables into a proper Markdown table and adjusted the directory structure for better readability.

---

## 💻 Running Locally

### 1. Backend Setup

```bash
cd backend
python -m venv venv

```

**Activate Virtual Environment:**

* **Windows:** `venv\Scripts\activate`
* **Mac/Linux:** `source venv/bin/activate`

**Install & Run:**

```bash
pip install -r requirements.txt
uvicorn main:app --reload

```

> 🌐 **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev

```

> 🌐 **Local URL:** [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000)

---

## ⚙️ Environment Variables

| Variable | Scope | Description |
| --- | --- | --- |
| `DATABASE_URL` | Backend | PostgreSQL connection string for production. |
| `NEXT_PUBLIC_API_URL` | Frontend | The URL of your deployed FastAPI backend. |

---

## 📂 Repository Structure

```text
hrms-lite/
├── backend/
│   ├── routers/       # API Route handlers
│   ├── models.py      # SQLAlchemy Database models
│   ├── schemas.py     # Pydantic data validation
│   ├── database.py    # Session and Engine config
│   └── main.py        # Entry point
├── frontend/
│   ├── src/
│   ├── components/    # Reusable UI elements
│   └── app/           # Next.js App Router pages
└── README.md

```

---

## ⚠️ Assumptions & Limitations

* **Auth:** No authentication is implemented (designed for internal lightweight use).
* **Pagination:** Data is currently returned in full lists.
* **UI:** Focus is placed on data integrity and functionality over complex animations.

---

## ✅ Project Status

* **Deployment:** Success (Vercel + Render).
* **Database:** Production PostgreSQL is live.
* **Integrity:** All database constraints and Pydantic validations are active and tested.

---
