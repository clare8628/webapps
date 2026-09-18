@chcp 65001 >nul
@echo off
setlocal

echo [1/4] Checking Cloudflare login...
call npx wrangler whoami >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Opening browser to login Cloudflare...
    call npx wrangler login
)

echo [2/4] Creating D1 database (webapps-db)...
call npx wrangler d1 create webapps-db

echo [3/4] Initializing D1 database schema...
call npx wrangler d1 execute webapps-db --remote --file=./schema.sql --yes

echo [4/4] Deploying Worker API...
call npx wrangler deploy

echo Done!
pause
