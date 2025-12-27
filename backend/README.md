
🎬 CineVerse Backend 🎬
======================

      ⚙️  POWERING THE PLATFORM  ⚙️

This Spring Boot backend serves as the brain of CineVerse,
handling authentication, bookings, and business logic.

🧰 Tech Stack
-------------
- Java 17
- Spring Boot 3
- Spring Security (JWT)
- JPA / Hibernate
- PostgreSQL
- Docker

📂 Structure
-------------
backend/
├── controller
├── service
├── repository
├── model
├── security
└── dto

🚀 Run with Docker
------------------
docker build -t cineverse-backend .
docker run -p 3001:3001 cineverse-backend

🧑‍🔧 Run Locally
-----------------
mvn clean install
mvn spring-boot:run

📡 API Base URL
---------------
http://localhost:3001/api

🔐 Configuration
----------------
Uses environment variables:
- SPRING_DATASOURCE_URL
- SPRING_DATASOURCE_USERNAME
- SPRING_DATASOURCE_PASSWORD
- JWT_SECRET

✅ Best Practices
-----------------
- Layered architecture
- DTO‑based responses
- Stateless security
- Transaction‑safe booking

Backend built for scale, security, and clarity 🚀
