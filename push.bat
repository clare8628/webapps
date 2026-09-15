@echo off
setlocal enabledelayedexpansion

echo ============================================
echo   Clare App Hub - 自動編號並推送到 GitHub
echo ============================================

:: 1. 執行版本號更新腳本
python update_version.py
if %ERRORLEVEL% neq 0 (
    echo [ERROR] 更新版本號失敗！
    exit /b %ERRORLEVEL%
)

:: 2. 取得提交訊息 (若未帶參數則使用預設訊息)
set "COMMIT_MSG=%~1"
if "%COMMIT_MSG%"=="" (
    for /f "tokens=*" %%v in ('python -c "import json; print(json.load(open('version.json'))['version'])"') do set CURRENT_VER=%%v
    set "COMMIT_MSG=release: update version !CURRENT_VER!"
)

echo [GIT] 暫存變更檔案...
git add .

echo [GIT] 提交中: "%COMMIT_MSG%"
git commit -m "%COMMIT_MSG%"

echo [GIT] 推送至 GitHub main 分支...
git push origin main

echo ============================================
echo   完成！已成功更新版本並推送到 GitHub。
echo ============================================
