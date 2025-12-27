
🎨 CineVerse Frontend 🎨
======================

      🌟  THE USER EXPERIENCE  🌟

This is the Next.js 15 frontend for CineVerse,
built for performance, UX, and scalability.

🧰 Tech Stack
-------------
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- React Query
- Axios
- Framer Motion

📂 Structure
-------------
frontend/
├── src/app
├── src/components
├── src/lib
├── public
└── Dockerfile

🚀 Run with Docker
------------------
docker build -t cineverse-frontend .
docker run -p 3000:3000 cineverse-frontend

🧑‍🔧 Run Locally
-----------------
npm install
npm run dev

🌐 URL
------
http://localhost:3000

⚙️ Environment Variable
------------------------
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001/api

✨ Best Practices
-----------------
- App Router + Suspense
- Strict TypeScript
- Optimized images
- Clean component structure
- Secure cookie handling

Frontend designed to be fast, clean, and delightful 💫
