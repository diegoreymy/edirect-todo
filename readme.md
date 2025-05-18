# EDirectInsure TODO List

This project is a task management application, divided into frontend (Angular) and backend (Spring Boot), orchestrated with Docker Compose.

---

## 🧱 Project Structure

```text
edirect-todo/
├── edirect-todo-api/    # Backend: Java 17 + Spring Boot + Maven
├── edirect-todo-ui/     # Frontend: Angular 19
└── docker-compose.yml   # Orchestrates services: PostgreSQL, API, and UI
```

---

## ✅ Prerequisites

- Docker
- Docker Compose

---

## 🚀 Running with Docker

1. In the root directory of the project, run:

   ```bash
   docker-compose up -d
   ```

2. Wait for all services to start:

   - `edirect-todo-db` (PostgreSQL)  
   - `edirect-todo-api` (Spring Boot)  
   - `edirect-todo-ui` (Angular)

3. Open your browser and go to:

   ```
   http://localhost:4200
   ```

---

