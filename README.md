# 晴嵐・Komorebi App Hub (個人 Web APP 群覽網頁)

> 「簡單而專注的生活，藏於方寸井然的器具之中。」  
> 一款以**日系溫潤極簡編輯美學 (Japanese Warm Minimalism & Editorial Style)** 設計的個人日常生活與工作 Web APP 群覽單頁網站。

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## ▍專案定位與設計理念
- **專案定位**：個人日常生活與工作 APP 群覽手冊
- **設計風格**：極簡編輯式、日系溫潤（和紙質地色彩、炭墨字階、陶橘印章徽章、細膩 1px 邊框與浮雕微動態）
- **語言支援**：中英雙語（繁體中文 / English）即時切換
- **技術規格**：原生 HTML5 + Vanilla CSS + ES6 JavaScript，零重型依賴、支援響應式設計（RWD）、純本機 `localStorage` 資料安全保存

---

## ▍核心功能 (Features)

### 1. 📂 同類型分區群覽 (Categorized Section Rows)
- 同一類型的 APP 會整齊收納在同一區塊/列中（💼 工作辦公、🛠️ 實用工具、🪙 財務理財、🎨 創意設計、📚 學習閱讀、🍵 日常生活）。
- 支援一鍵切換**「分區群覽」**與**「綜合網格」**檢視模式。
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

本專案為靜態單頁應用（SPA），無需繁複的建置步驟：

```bash
# 複製專案
git clone https://github.com/clare8628/webapps.git
cd webapps

# 使用 Python 啟動本機伺服器
python3 -m http.server 4321

# 或直接使用任何靜態檔案伺服器開啟 index.html
```
在瀏覽器中造訪 `http://localhost:4321` 即可體驗！

---

## ▍目錄結構
```
.
├── index.html        # 主頁面結構、刊頭、指標列與原生 dialog 彈窗
├── style.css         # 和紙色系、炭墨階層、RWD 響應式與深淺色模式
├── app.js            # i18n 雙語、APP 管理、點擊統計與資料匯出匯入
├── prompt.md         # 原始需求定位文件
└── README.md         # 專案說明文檔
```

---

## ▍授權協議
MIT License © 2026 Komorebi App Gallery
