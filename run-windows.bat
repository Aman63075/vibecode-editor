@echo off
title VibeCode Editor - Windows Launcher
echo ===================================================
echo       VibeCode Editor - Windows Setup & Run
echo ===================================================
echo.

:: 1. Check if .env exists
if not exist .env (
    echo [.env] file missing. Creating from .env.example...
    copy .env.example .env
    echo [.env] created successfully.
) else (
    echo [.env] file found.
)

echo.
:: 2. Install dependencies if node_modules missing
if not exist node_modules (
    echo [npm] Installing dependencies...
    call npm install
) else (
    echo [npm] Dependencies already installed.
)

echo.
:: 3. Generate Prisma client
echo [Prisma] Generating Prisma Client...
call npx prisma generate

echo.
:: 4. Push schema to MongoDB
echo [Prisma] Syncing schema to MongoDB...
call npx prisma db push

echo.
echo ===================================================
echo  Starting VibeCode Editor at http://localhost:3000
echo ===================================================
echo.
call npm run dev
pause
