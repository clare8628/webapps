# 健平・Clare App Hub (個人 Web APP 群覽網頁)

> 「簡單而專注的生活，藏於方寸井然的器具之中。」  
> 一款以**日系溫潤極簡編輯美學 (Japanese Warm Minimalism & Editorial Style)** 設計的個人日常生活與工作 Web APP 群覽單頁網站。

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## ▍專案定位與設計理念
- **專案定位**：個人日常生活與工作 APP 群覽手冊
- **設計風格**：極簡編輯式、日系溫潤（和紙質地色彩、炭墨字階、陶橘印章徽章「健平」、細膩 1px 邊框與浮雕微動態）
- **語言支援**：中英雙語（繁體中文 / English）即時切換
- **技術規格**：原生 HTML5 + Vanilla CSS + ES6 JavaScript，零重型依賴、支援響應式設計（RWD）、純本機 `localStorage` 資料安全保存

---

## ▍核心功能 (Features)

### 1. 📂 同類型分區群覽與自由拖曳排序 (Categorized Rows & Drag & Drop)
- 同一類型的 APP 會整齊收納在同一區塊/列中（💼 工作辦公、🛠️ 實用工具、🪙 財務理財、🎨 創意設計、📚 學習閱讀、🍵 日常生活）。
- **滑鼠拖拉排序與跨組移動**：直接按住卡片即可在同組內自由調整順序，亦可直接跨組拖放至其他分類，自動變更分類並即時持久化儲存！
- 支援一鍵切換**「分區群覽」**與**「綜合網格」**檢視模式（綜合網格亦全面支援拖曳排序）。
- 支援即時關鍵字模糊搜尋（即時過濾名稱、網址、備註）。

### 2. ⚡ 個人 Web APP 管理
- 點擊右上角「新增 APP」即可快速加入自訂應用（支援名稱、URL、所屬分類、工作/生活維度、Icon/Emoji、代表色系、備註與釘選置頂）。
- 支援卡片直接編輯與安全二次確認刪除。

### 3. 📊 使用數據統計與視覺化分析
- 點擊卡片跳轉開啟 APP 時，自動累計使用次數並記錄最後啟動時間。
- 內建**「使用統計與匯出」**面板：
  - 工作用途 vs 日常生活使用比例長條圖
  - 累計總點擊次數與最常使用 APP
  - 🏆 常用排行榜 Top 5

### 4. 📦 數據備份與匯出
- **匯出 CSV 報表**：自動附帶 UTF-8 BOM，防止 Excel 開啟亂碼。
- **匯出 JSON 備份檔**：隨時備份所有 APP 設定與點擊紀錄。
- **匯入 JSON 備份檔**：支援跨裝置、跨瀏覽器無縫還原資料。

### 5. 🌓 日系墨夜深色模式 (Sumi Ink Dark Mode)
- 支援淺色和紙白與深色墨夜模式切換，柔和舒適，護眼不刺眼。

---

## ▍收錄專屬應用 (Included Web Apps)

| 圖示 | 應用名稱 | 網址 URL | 所屬分類 | 維度場景 |
| :---: | :--- | :--- | :---: | :---: |
| 🪙 | **退休金流管理** | `https://cashflow.clare8628.workers.dev/` | 財務理財 | 🍵 日常生活 |
| 📈 | **ETF & Stock Backtest Platform** | `https://etf-backtest-platform.clare8628.workers.dev/` | 財務理財 | 💼 工作辦公 |
| 💼 | **個人資產管理系統** | `https://mgtasset.clare8628.workers.dev/` | 財務理財 | 🍵 日常生活 |
| 👥 | **分組系統 Student Grouping** | `https://groupstu.clare8628.workers.dev/` | 工作辦公 | 💼 工作辦公 |
| 🤖 | **AI角色產生器** | `https://arolebuilder.pages.dev/` | 創意設計 | 💼 工作辦公 |
| ⚡ | **PromptBuilder** | `https://pbuilder.pages.dev/` | 實用工具 | 💼 工作辦公 |
| 📝 | **作業同儕互評平台** | `https://peer-review-platform.pages.dev/` | 學習閱讀 | 💼 工作辦公 |

---

## ▍本地啟動 (Get Started)

```bash
# 複製專案
git clone https://github.com/clare8628/webapps.git
cd webapps

# 方式一：僅預覽前端頁面（不含 D1 API）
python3 -m http.server 4321 --directory public

# 方式二：使用 wrangler 本機模擬完整 Worker + D1（推薦）
npx wrangler dev
```
在瀏覽器中造訪對應網址即可體驗！

---

## ▍版本自動編號機制 (Version Auto-bump)
本專案支援自動版本編號（格式：`vYYYY.MM.DD.<build>`）：
- **一鍵推送腳本**：雙擊或在終端機執行 `push.bat`（或 `python update_version.py`），會自動遞增版本號、更新 `version.json`、`index.html` 與 `app.js`，並直接推送至 GitHub。
- **Git Hook**：內建 `.git/hooks/pre-commit`，每次 commit 時自動更新版本編號。
- **CI 自動化**：亦可透過 `.github/workflows/bump_version.yml` 在 GitHub 雲端自動處理。

---

## ▍架構：單一 Cloudflare Worker（靜態頁面 + D1 REST API）
本專案已由 Cloudflare Pages 全面改為 **Cloudflare Workers 架構**：同一個 Worker 透過 `[assets]` 設定同時提供 `public/` 靜態頁面與 `/api/*` REST API，並整合 **Cloudflare D1** 全球分散式 SQL 資料庫：
- **靜態資源**：`wrangler.toml` 的 `[assets]` 區塊指向 `public/`，未命中 `/api/*` 的請求由 Cloudflare 直接送出靜態檔案，不會呼叫 Worker script。
- **API 核心**：`worker.js` 處理所有 `/api/*` 路徑的輕量 RESTful API；其餘路徑回退交給靜態資源（`env.ASSETS.fetch`）。
- **資料庫定義**：`schema.sql` 結構包含應用屬性、排序權重與點擊次數。
- **持續部署**：`main` 分支每次 push，GitHub Actions（`.github/workflows/bump_version.yml`）會自動編版本號並透過 `wrangler deploy` 部署到 Cloudflare Workers（需在 repo 設定 `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets）。
- **首次手動設定**：在專案根目錄雙擊執行 `deploy_cf.bat`（或 `python deploy.py`），一鍵建立 D1 資料庫、匯入 `schema.sql` 並完成首次部署（後續變更改由 GitHub Actions 自動部署，`schema.sql` 不會被 CI 自動重跑，避免覆蓋雲端資料）。
- **離線與本機備援**：網路斷線時自動優雅回退至 `localStorage`，確保隨時皆可使用。

---

## ▍目錄結構
```
.
├── public/            # Cloudflare Worker 靜態資源目錄 ([assets] directory)
│   ├── index.html     # 主頁面結構、刊頭、指標列與原生 dialog 彈窗
│   ├── style.css      # 和紙色系、炭墨階層、RWD 響應式與深淺色模式
│   ├── app.js         # i18n 雙語、APP 管理、點擊統計與 D1 雲端同步
│   └── version.json   # 版本中繼資料 (版本號、建置次數、更新日期)
├── worker.js          # Cloudflare Worker：/api/* REST API + 靜態資源回退
├── wrangler.toml      # Cloudflare Worker、assets 與 D1 資料庫綁定設定
├── schema.sql         # Cloudflare D1 資料庫結構與初始預設應用資料
├── deploy_cf.bat      # 首次一鍵建立 D1 並部署 Worker 互動腳本
├── update_version.py  # 版本號自動計算與檔案同步更新腳本
├── push.bat           # 一鍵更新版本並推送至 GitHub 捷徑腳本
├── .github/workflows/bump_version.yml # CI：自動編版本號 + wrangler deploy
├── prompt.md          # 原始需求定位文件
└── README.md          # 專案說明文檔
```


---

## ▍授權協議
MIT License © 2026 Clare App Gallery
