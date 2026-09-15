@echo off
setlocal enabledelayedexpansion

echo =======================================================
echo   Cloudflare D1 資料庫與 Worker API 一鍵配置與部署
echo =======================================================
echo.

:: 1. 檢查是否已登入 Cloudflare
echo [1/4] 檢查 Cloudflare 登入狀態...
call npx wrangler whoami >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo.
    echo 請先在開啟的瀏覽器視窗中完成 Cloudflare 授權登入：
    call npx wrangler login
    if %ERRORLEVEL% neq 0 (
        echo [ERROR] 登入失敗或已取消，請稍後重試。
        pause
        exit /b 1
    )
)
echo 已成功連接 Cloudflare 帳戶！
echo.

:: 2. 建立 Cloudflare D1 資料庫
echo [2/4] 檢查 / 建立 Cloudflare D1 資料庫 (webapps-db)...
for /f "tokens=*" %%i in ('call npx wrangler d1 create webapps-db 2^>^&1') do (
    echo %%i
    echo %%i | findstr /C:"database_id" >nul
    if !ERRORLEVEL! equ 0 (
        for /f "tokens=3 delims= " %%a in ("%%i") do set D1_ID=%%~a
    )
)

:: 若已存在或上面抓不到，嘗試從 d1 list 抓取
if "%D1_ID%"=="" (
    for /f "tokens=1,2 delims= " %%a in ('call npx wrangler d1 list 2^>^&1 ^| findstr "webapps-db"') do (
        set D1_ID=%%a
    )
)

echo.
if not "%D1_ID%"=="" (
    echo 成功確認 D1 資料庫 ID: %D1_ID%
    :: 更新 wrangler.toml 中的 database_id
    python -c "
import re
with open('wrangler.toml', 'r', encoding='utf-8') as f:
    c = f.read()
c = re.sub(r'database_id\s*=\s*\"[^\"]*\"', f'database_id = \"%D1_ID%\"', c)
with open('wrangler.toml', 'w', encoding='utf-8') as f:
    f.write(c)
"
) else (
    echo 提示: 若已有 webapps-db，請確認 wrangler.toml 中的 database_id 是否正確。
)
echo.

:: 3. 初始化 D1 資料表結構與種子資料
echo [3/4] 匯入資料表結構 (schema.sql) 至遠端 D1...
call npx wrangler d1 execute webapps-db --remote --file=./schema.sql --yes
if %ERRORLEVEL% neq 0 (
    echo [WARN] 遠端 D1 初始化時遇到警示或資料已存在，繼續執行部署...
)
echo.

:: 4. 部署 Worker API
echo [4/4] 部署 Worker API 至 Cloudflare...
call npx wrangler deploy
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Worker 部署失敗！
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo =======================================================
echo   部署完成！跨裝置 Cloudflare D1 同步 API 已就緒。
echo =======================================================
pause
