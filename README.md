
🎬✨ CineVerse ✨🎬
=================

      🍿  WELCOME TO CINEVERSE  🍿
   --------------------------------
     Book Movies. Pick Seats.
        Enjoy the Show.
   --------------------------------

CineVerse is a full‑stack **Movie Ticket Booking Platform** built with modern
frontend, backend, and DevOps practices.

🚀 Tech that powers CineVerse:
- Frontend: Next.js 15 + TypeScript
- Backend: Spring Boot 3 (Java 17)
- Database: PostgreSQL
- DevOps: Docker & Docker Compose

🌐 Architecture
---------------

Browser 🧑‍💻 → Frontend (3000) → Backend API (3001) → PostgreSQL (5432)

📁 Project Structure
--------------------

CineVerse/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md

✨ Features
-----------
- 🎥 Browse movies publicly
- 🔐 JWT authentication
- 🎟️ Ticket booking
- 🛠️ Admin dashboard
- 💳 Payment‑ready checkout
- 🐳 Fully Dockerized

🐳 Run with Docker (Recommended)
--------------------------------

Prerequisites:
- Docker
- Docker Compose

Command:
docker compose up --build

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001/api

🧑‍🔧 Run Locally (Traditional)
-------------------------------

Tools Needed:
- Node.js 20+
- Java 17
- Maven
- PostgreSQL

Steps:
1. Start PostgreSQL and create database
2. Run backend with Maven
3. Run frontend with npm

🛡️ Best Practices
------------------
- Stateless JWT auth
- Environment‑based config
- Clean Git history
- Type‑safe frontend
- Docker multi‑stage builds

🎉 Enjoy CineVerse & happy coding!
