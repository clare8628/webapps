# Cloudflare D1 資料庫與 Worker API 一鍵配置與部署 (PowerShell 版)
$ErrorActionPreference = "Stop"

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  Cloudflare D1 資料庫與 Worker API 一鍵配置與部署" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

# 1. 檢查 Cloudflare 登入狀態
Write-Host "[1/4] 檢查 Cloudflare 登入狀態..." -ForegroundColor Yellow
$loginCheck = & npx wrangler whoami 2>&1 | Out-String

if ($loginCheck -match "You are not authenticated") {
    Write-Host "請在即將開啟的瀏覽器視窗中完成 Cloudflare 登入授權..." -ForegroundColor Green
    & npx wrangler login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] 登入失敗或已取消！" -ForegroundColor Red
        Exit 1
    }
}
Write-Host "已成功連接 Cloudflare 帳戶！" -ForegroundColor Green
Write-Host ""

# 2. 檢查 / 建立 Cloudflare D1 資料庫
Write-Host "[2/4] 檢查 / 建立 Cloudflare D1 資料庫 (webapps-db)..." -ForegroundColor Yellow
$d1CreateOutput = & npx wrangler d1 create webapps-db 2>&1 | Out-String
$d1Id = $null

if ($d1CreateOutput -match 'database_id\s*=\s*"([^"]+)"') {
    $d1Id = $matches[1]
} elseif ($d1CreateOutput -match '([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})') {
    $d1Id = $matches[1]
} else {
    # 嘗試由 d1 list 搜尋
    $listOutput = & npx wrangler d1 list 2>&1 | Out-String
    if ($listOutput -match '([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\s+webapps-db') {
        $d1Id = $matches[1]
    }
}

if ($d1Id) {
    Write-Host "成功確認 D1 資料庫 ID: $d1Id" -ForegroundColor Green
    $wranglerContent = Get-Content "wrangler.toml" -Raw -Encoding utf8
    $newWranglerContent = $wranglerContent -replace 'database_id\s*=\s*"[^"]*"', "database_id = `"$d1Id`""
    Set-Content "wrangler.toml" -Value $newWranglerContent -Encoding utf8
    Write-Host "已更新 wrangler.toml 設定！" -ForegroundColor Green
} else {
    Write-Host "提示: 請確認 wrangler.toml 中的 database_id。" -ForegroundColor Yellow
}
Write-Host ""

# 3. 初始化 D1 資料表結構與資料
Write-Host "[3/4] 匯入資料表結構 (schema.sql) 至遠端 D1..." -ForegroundColor Yellow
try {
    & npx wrangler d1 execute webapps-db --remote --file=./schema.sql --yes
} catch {
    Write-Host "[WARN] 結構已存在或略過：" $_.Exception.Message -ForegroundColor Yellow
}
Write-Host ""

# 4. 部署 Worker API
Write-Host "[4/4] 部署 Worker API 至 Cloudflare..." -ForegroundColor Yellow
& npx wrangler deploy
if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=======================================================" -ForegroundColor Cyan
    Write-Host "  部署完成！跨裝置 Cloudflare D1 同步 API 已就緒。" -ForegroundColor Cyan
    Write-Host "=======================================================" -ForegroundColor Cyan
} else {
    Write-Host "[ERROR] 部署過程中發生錯誤！" -ForegroundColor Red
}
