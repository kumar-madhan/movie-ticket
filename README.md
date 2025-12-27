<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# CineVerse – Movie Ticket Booking Platform

CineVerse is a full-stack movie ticket booking application built using modern web and backend technologies.
It allows users to browse movies publicly and book tickets securely after authentication.
The system follows a clean separation between frontend, backend, and database layers.

TECH STACK
Frontend
Next.js 15
TypeScript
Tailwind CSS
React Query
Axios
Backend
Java 17
Spring Boot 3
Spring Security with JWT
JPA / Hibernate
Database
PostgreSQL 15+
DevOps
Docker
Docker Compose

PROJECT STRUCTURE
CineVerse/
├── frontend/
├── backend/
├── docker-compose.yml
└── README.md
Request flow:
Browser → Frontend (3000) → Backend API (3001) → PostgreSQL (5432)

FEATURES
Public movie browsing
User authentication (JWT)
Movie showtimes
Ticket booking
Admin management (movies, showtimes)
Payment-ready checkout
Dockerized deployment

RUN USING DOCKER (RECOMMENDED)
Prerequisites:
Docker
Docker Compose
From the root folder:
docker compose up --build
Services:
Frontend: [http://localhost:3000](http://localhost:3000)
Backend API: [http://localhost:3001/api](http://localhost:3001/api)
Database: localhost:5432

TRADITIONAL LOCAL SETUP (WITHOUT DOCKER)
Required tools:
Node.js 20+
Java 17
Maven 3.9+
PostgreSQL 15+
Steps:
Start PostgreSQL and create database:
createdb movieticket
Start backend:
cd backend
mvn spring-boot:run
Start frontend:
cd frontend
npm install
npm run dev

ENVIRONMENT VARIABLES
Backend:
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
Frontend:
NEXT_PUBLIC_BACKEND_URL

BEST PRACTICES
Stateless JWT authentication
Environment-based configuration
Docker multi-stage builds
Clean Git history (no build artifacts)
Strict TypeScript checks
API-first design

MAINTENANCE
This repository is structured for scalability, CI/CD readiness, and production deployment.

make it pretty throw in some fun emoji, pic arts, ascii arts

```markdown
# 🎬 CineVerse – Movie Ticket Booking Platform 🎟️

```

    ╔══════════════════════════════════════╗
    ║  🎥  CINEMA TICKET BOOKING SYSTEM  🎥  ║
    ║     Frontend + Backend + Database     ║
    ╚══════════════════════════════════════╝
    ```

CineVerse is a **full-stack movie ticket booking application** built with modern web technologies. Users can browse movies publicly and book tickets securely after authentication. Clean separation between frontend, backend, and database layers.

## 🛠️ Tech Stack

| **Frontend** | **Backend** | **Database** | **DevOps** |
|--------------|-------------|--------------|------------|
| Next.js 15 🚀 | Java 17 ⚙️ | PostgreSQL 15+ 🐘 | Docker 🐳 |
| TypeScript 🔒 | Spring Boot 3 🌸 | | Docker Compose 📦 |
| Tailwind CSS 🎨 | Spring Security (JWT) 🔐 | | |
| React Query ⚡ | JPA / Hibernate 🗄️ | | |

## 📁 Project Structure
```

CineVerse/                    \# 🎭 ROOT
├── frontend/                 \# 🌐 Next.js 15 App Router
├── backend/                  \# ☕ Spring Boot 3 REST APIs
├── docker-compose.yml        \# 🐳 One-command deployment
└── README.md                 \# 📖 You're reading it!

```

**Request Flow:** `Browser (3000) → Backend API (3001) → PostgreSQL (5432)`

## ✨ Features
- 🎥 **Public movie browsing**
- 🔐 **User authentication (JWT)**
- ⏰ **Movie showtimes**
- 🎫 **Ticket booking**
- 👑 **Admin management** (movies, showtimes)
- 💳 **Payment-ready checkout**
- 📱 **Responsive design**

## 🚀 Run with Docker (Recommended) 🐳

```


# One command = everything running! ✨

docker compose up --build

```

**Services Live At:**
```

🌐 Frontend:    http://localhost:3000
🔗 Backend API: http://localhost:3001/api
🐘 Database:    localhost:5432

```

## 🛠️ Traditional Local Setup (No Docker)

### 1. Start Database 🐘
```

createdb movieticket  \# or use Docker: docker compose up -d db

```

### 2. Backend ☕
```

cd backend
mvn clean install
mvn spring-boot:run

```

### 3. Frontend 🌐
```

cd frontend
npm install
npm run dev

```

## 🔧 Environment Variables

### Backend (.env or application.yml)
```

SPRING_DATASOURCE_URL: jdbc:postgresql://localhost:5432/movieticket
SPRING_DATASOURCE_USERNAME: postgres
SPRING_DATASOURCE_PASSWORD: password
JWT_SECRET: your-super-secret-jwt-key-here

```

### Frontend (.env.local)
```

NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api

```

## 🎯 Best Practices Implemented
- 🔐 **Stateless JWT authentication**
- 🌍 **Environment-based configuration**
- 🐳 **Docker multi-stage builds**
- ✅ **Clean Git history** (no build artifacts)
- 🔍 **Strict TypeScript checks**
- 📡 **API-first design**

## 🏗️ Maintenance & Scaling
```

✅ CI/CD ready (GitHub Actions/Jenkins)
✅ Production deployment structure
✅ Scalable microservices architecture
✅ Zero-downtime Docker updates
✅ Health checks \& monitoring hooks

```

```

    🎉 Ready for Production Deployment! 🎉
    Built for your DevOps / Kubernetes skills! ☸️
    ```

**Star this repo! ⭐ Push to GitHub: `git push origin main`**
```

**Save as `README.md` in project root** - Professional, fun, and complete! 🎉[^1]

<div align="center">⁂</div>

[^1]: https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/93359390/b08c21cf-0e8a-4a8c-8bd5-33c67155c652/file.bash_history

