<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# extract all the commands without duplicates and group them, for future re-use. create it like a document

Here is a first, organized, **deduplicated** command reference from your bash history, grouped for future reuse.[^1]

***

## Project and filesystem

```bash
# Create / work with project
mkdir -p movie-ticket
cd movie-ticket
ls
ll
pwd
clear

# Temporary dump copies
cp -rp movie-ticket dump
rm -rf dump/

# Generic structure checks
tree
tree frontend || find frontend -type f | sort
tree backend  || find backend  -type f | sort
find . -type f -empty
find . -type f -size 0c
```


***

## Node, NPM, Yarn, toolchain

```bash
# Node & NPM install and PATH
tar -xf /share/node-v20.19.6-linux-x64.tar.xz
mv node-v20.19.6-linux-x64/ node-v20.19.6
export PATH=$PATH:/mw/node-v20.19.6/bin
echo "export PATH=$PATH:/mw/node-v20.19.6/bin" >> ~/.bash_profile
npm -v
node -v
source ~/.bash_profile

# Yarn global
npm install -g yarn
```


***

## Frontend: create \& manage apps

```bash
# Vite React app
mkdir -p frontend/{public,src/{api,pages,components,styles,utils}}
touch frontend/{index.html,package.json,vite.config.js}
touch frontend/public/favicon.svg
touch frontend/src/{main.jsx,App.jsx}
touch frontend/src/api/client.js
touch frontend/src/pages/{Home.jsx,Movies.jsx,Showtimes.jsx,Seats.jsx,Confirmation.jsx}
touch frontend/src/components/{Navbar.jsx,MovieCard.jsx,Seat.jsx}
touch frontend/src/styles/global.css
touch frontend/src/utils/constants.js

cd frontend
npm init -y
npm install vite @vitejs/plugin-react react react-dom react-router-dom
npm install -D @types/react @types/react-dom
npm pkg set scripts.dev="vite" scripts.build="vite build" scripts.preview="vite preview"
npm run dev
npm run dev --host
npm run dev -- --host 0.0.0.0

# Next.js app
cd movie-ticket
rm -rf frontend
mkdir frontend
npx create-next-app@latest frontend --ts --tailwind --eslint --app --src-dir --import-alias "@/*"

cd frontend
npm install
npm run dev

# Reinstall / reset frontend
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```


***

## Frontend: Tailwind \& Next 15 fixes

```bash
# Tailwind / PostCSS basic setup
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Tailwind v4 + Next 15 config (manual files)
cat > postcss.config.js <<'EOF'
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
EOF

cat > tailwind.config.js <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f172a',
        foreground: '#f8fafc',
        primary: '#6366f1',
        secondary: '#94a3b8',
      },
    },
  },
  plugins: [],
};
EOF

cat > src/app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0f172a;
  --foreground: #f8fafc;
  --primary: #6366f1;
  --secondary: #94a3b8;
}

body {
  @apply bg-[var(--background)] text-[var(--foreground)] font-sans antialiased;
  min-height: 100vh;
}

a,
button {
  @apply transition-all duration-200 hover:opacity-80;
}
EOF

# Example Next config variants you used
cat > next.config.js <<'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['192.168.56.101'],
  },
};
module.exports = nextConfig;
EOF
```


***

## Frontend: CineVerse minimal starter

```bash
# Minimal Next 15 + Tailwind project files
cat > package.json <<'EOF'
{
  "name": "movie-ticket-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "autoprefixer": "^10.4.20",
    "next": "15.0.3",
    "postcss": "^8.4.47",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.6.3"
  }
}
EOF

mkdir -p src/app
cat > src/app/layout.tsx <<'EOF'
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CineVerse',
  description: 'Book your favorite movies easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased">
        <header className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 shadow-lg">
          <div className="container mx-auto text-center text-white text-2xl font-semibold">
            🎬 CineVerse
          </div>
        </header>
        <main className="container mx-auto py-10">{children}</main>
      </body>
    </html>
  );
}
EOF

cat > src/app/page.tsx <<'EOF'
export default function Home() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-primary">
        Welcome to CineVerse
      </h1>
      <p className="text-secondary">
        Book movie tickets, explore showtimes, and enjoy a seamless experience.
      </p>
      <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition">
        Browse Movies
      </button>
    </div>
  );
}
EOF
```


***

## Backend: Java/Spring Boot project

```bash
# Tooling
tar -xf /share/jdk-17.0.17_linux-x64_bin.tar.gz
tar -xf /share/apache-maven-3.9.12-bin.tar.gz
mv apache-maven-3.9.12 maven-3.9.12
export PATH=$PATH:/mw/jdk-17.0.17/bin:/mw/maven-3.9.12/bin
java -version
javac -version
mvn --version

# Spring Boot skeleton
mkdir -p backend/src/{main/{java/com/cinema/app/{controller,service,model,repository,security,dto},resources},test/java/com/cinema/app}
touch backend/{pom.xml,Dockerfile,README.md}
touch backend/src/main/java/com/cinema/app/MovieTicketApplication.java
touch backend/src/main/resources/{application.yml,data.sql,schema.sql}
touch backend/src/test/java/com/cinema/app/MovieTicketTests.java

# Typical build/run
cd backend
mvn clean package -DskipTests
java -jar target/backend-1.0.0.jar

# Background run with nohup
nohup java -jar target/backend-1.0.0.jar > nohup.out 2>&1 &
tail -n 30 nohup.out
```


***

## Backend: API smoke tests (curl)

```bash
# Health
curl -v http://localhost:3001/actuator/health

# Auth register/login
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "name":"Test User",
    "password":"password"
  }'

curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password"}'

# Movies (JWT example)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:3001/api/movies | jq .

curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:3001/api/admin/movies | jq .
```


***

## Git and GitHub

```bash
# Global config
git config --global user.email "madhankumar150598@gmail.com"
git config --global user.name "kumar-madhan"
git config --global init.defaultBranch master
git config pull.rebase false

# Init & push
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:kumar-madhan/movie-ticket.git
git push -u origin main

# Switch / rename branches
git checkout main
git branch -m main master
git push -u origin master
git push origin --delete main

# Remote reset pattern
git remote remove origin
git remote add origin git@github.com:kumar-madhan/movie-ticket.git
git push -u origin master
```


***

## Docker and Postgres

```bash
# Containers
docker ps
docker compose up -d db
docker stop <container_id>

# Postgres in container
docker exec -it movieticket-db psql -U postgres
docker exec -it movieticket-db psql -U postgres -d movieticket

# Local psql
psql -h localhost -U postgres -d postgres
psql -d movieticket -c "select email,password from users;"
```


***

## Firewall / ports / networking

```bash
# Open ports
sudo firewall-cmd --permanent --add-port=5173/tcp
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
sudo firewall-cmd --list-ports

# Port debugging
netstat -tunlp
ss -tunlp
curl http://localhost:5173
curl http://localhost:3000
hostname -i
```


***

## Process management

```bash
ps -ef | grep admin
ps -ef | grep java
ps -ef | grep npm
kill -9 <pid>
pkill -f backend-1.0.0.jar || true

# Kill dev servers by port (pattern you used)
lsof -ti:3000 | xargs kill -TERM 2>/dev/null || true
lsof -ti:3000 | xargs kill -9   2>/dev/null || true
```


***

## “Dump project to single file” patterns

```bash
# Generic: dump all files content from a clean copy
cp -rp movie-ticket dump
cd dump
rm -rf .git frontend/node_modules frontend/.next backend/target

find . -type f -exec sh -c '
  echo "=== {} ===";
  cat "{}";
  echo -e "\n\n"
' \; > ~/all-file-content.txt
```


***

If you want, this can be turned into a Markdown “Movie Ticket Dev Cookbook” file (e.g. `COMMANDS.md`) inside your repo, and split further into “one-click” scripts (setup, dev-start, backend-build, dump-sources).

<div align="center">⁂</div>

[^1]: file.bash_history

