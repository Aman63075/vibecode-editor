# 🪟 Windows Setup Guide - VibeCode Editor

Agar aap iss project ko **Windows laptop/PC** par chalana chahte hain, toh neeche diye gaye steps follow karein.

---

## 1. 📥 Windows Me Kya-Kya Install Karna Hai?

Apne Windows laptop me ye 4 software install karein:

### A. Node.js (v20 LTS ya v22 LTS)
- **Website**: [https://nodejs.org/](https://nodejs.org/)
- **LTS version** download karke install karein. Installation me sab default settings rehne dein.
- Verify karne ke liye Command Prompt (cmd) me run karein:
  ```cmd
  node -v
  npm -v
  ```

### B. Git for Windows
- **Website**: [https://git-scm.com/download/win](https://git-scm.com/download/win)
- Download aur install karein (default options ke saath).

### C. MongoDB (Database)
Prisma ko MongoDB chalane ke liye **Replica Set (`rs0`)** ki zaroorat hoti hai. Iske 2 aasaan tareeqe hain:

#### Tareeqa 1: Docker ke zariye (Sabse aasaan - 1 Click)
Agar aapke paas **Docker Desktop** installed hai:
Project folder me jakar cmd me bas yeh run karein:
```cmd
docker compose up -d
```
Yeh automatically MongoDB ko replica set `rs0` ke saath start kar dega!

#### Tareeqa 2: Native Windows MongoDB Installer (Bina Docker ke)
1. [MongoDB Community Download](https://www.mongodb.com/try/download/community) par jaiye aur Windows MSI installer download karein.
2. Install karte waqt **"Run as a Network Service user"** aur **"Install MongoDB Compass"** checked rehne dein.
3. Install hone ke baad Notepad ko **"Run as Administrator"** karke yeh file open karein:
   ```text
   C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg
   ```
4. File ke last me yeh 2 lines add karein:
   ```yaml
   replication:
     replSetName: rs0
   ```
5. File save karein.
6. Windows Search me **"Services"** search karein, list me **MongoDB Server** par right-click karke **Restart** karein.
7. Ab Command Prompt me `mongosh` type karein aur enter karein, fir yeh command run karein:
   ```javascript
   rs.initiate()
   ```
   Agar output `{ ok: 1 }` aaye, toh aapka MongoDB Replica Set ready hai!

---

### D. Ollama for Windows (AI Code Suggestions & Chat ke liye)
1. **Website**: [https://ollama.com/download/windows](https://ollama.com/download/windows)
2. Installer download karke run karein.
3. Install hone ke baad Command Prompt (cmd) me yeh command run karke model download karein:
   ```cmd
   ollama pull codellama
   ```
   *(Agar aapke laptop me RAM kam hai ya fast suggestions chahiye, toh aap `ollama pull qwen2.5-coder:1.5b` bhi chala sakte hain).*

---

## 2. ⚙️ Project Configuration (.env)

Project root folder me [`.env.example`](file:///.env.example) se ek [`.env`](file:///.env) file banayein:

```env
# MongoDB URL (Replica Set rs0)
DATABASE_URL="mongodb://127.0.0.1:27017/vibecode?replicaSet=rs0&directConnection=true"

# NextAuth Secret (Koi bhi 32+ characters ka random string)
AUTH_SECRET="vibe-code-editor-secret-key-32chars-min-change-this"

NEXTAUTH_URL="http://localhost:3000"

# Optional: Google & GitHub OAuth (Agar real accounts se login chahiye)
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
AUTH_GITHUB_ID=""
AUTH_GITHUB_SECRET=""

# Ollama AI Configuration
OLLAMA_HOST="http://localhost:11434"
OLLAMA_MODEL="codellama:latest"
```

---

## 3. 🚀 Windows Par Project Kaise Chalayein?

### Option A: 1-Click Launcher (Sabse aasaan)
Project folder me jo **`run-windows.bat`** file hai, us par **Double-Click** karein!
Yeh automatically:
1. `.env` check karega
2. `npm install` karega
3. `npx prisma generate` karega
4. `npx prisma db push` karega
5. Dev server start kar dega: **http://localhost:3000**

### Option B: Manual Command Line
Agar cmd ya PowerShell se chalana hai:
```cmd
cd 35-building-vibe-code-editor

npm install
npx prisma generate
npx prisma db push
npm run dev
```

Browser me **http://localhost:3000** open karein aur maze karein!
