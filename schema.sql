-- D1 Database Schema for Clare App Hub

DROP TABLE IF EXISTS apps;

CREATE TABLE IF NOT EXISTS apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL,
  scope TEXT NOT NULL,
  icon TEXT,
  color TEXT,
  description TEXT,
  pinned INTEGER DEFAULT 0,
  click_count INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  last_opened INTEGER,
  created_at INTEGER,
  updated_at INTEGER
);

-- 建立索引以加速排序與查詢
CREATE INDEX IF NOT EXISTS idx_apps_sort ON apps(sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_apps_category ON apps(category);

-- 插入初始預設應用資料
INSERT INTO apps (id, name, url, category, scope, icon, color, description, pinned, click_count, sort_order, last_opened, created_at, updated_at) VALUES
('app-cashflow', '退休金流管理', 'https://cashflow.clare8628.workers.dev/', 'finance', 'life', '🪙', '#B59359', '退休金流試算、被動收入配置與提領安全策略規劃', 1, 15, 1, 1726358400000, 1725500000000, 1726358400000),
('app-etf-backtest', 'ETF & Stock Backtest Platform', 'https://etf-backtest-platform.clare8628.workers.dev/', 'finance', 'work', '📈', '#4B6C7B', 'ETF 與美股歷史數據回測、投資組合績效與風險報酬分析', 1, 28, 2, 1726362000000, 1725300000000, 1726362000000),
('app-asset-mgt', '個人資產管理系統', 'https://mgtasset.clare8628.workers.dev/', 'finance', 'life', '💼', '#C06C4C', '個人與家庭資產配置、淨值走勢追蹤與資產負債管理', 1, 22, 3, 1726354800000, 1725100000000, 1726354800000),
('app-group-stu', '分組系統 Student Grouping', 'https://groupstu.clare8628.workers.dev/', 'work', 'work', '👥', '#5E7761', '學生分組演算法、課堂協作團隊分配與名單匯入管理', 1, 18, 4, 1726347600000, 1725000000000, 1726347600000),
('app-ai-role', 'AI角色產生器 — 客製化機器人助理指令', 'https://arolebuilder.pages.dev/', 'creation', 'work', '🤖', '#9B7382', '客製化 AI 角色設定、System Prompt 與機器人助理指令建構', 1, 35, 5, 1726365600000, 1724900000000, 1726365600000),
('app-prompt-builder', 'PromptBuilder — AI 開發 Prompt 建構器', 'https://pbuilder.pages.dev/', 'tools', 'work', '⚡', '#C06C4C', 'AI 應用開發 Prompt 工程結構化建構、測試與優化工具', 1, 40, 6, 1726363800000, 1724700000000, 1726363800000),
('app-peer-review', '作業同儕互評平台', 'https://peer-review-platform.pages.dev/', 'learning', 'work', '📝', '#4B6C7B', '課程學生作業盲審互評、同儕評分回饋與學習歷程評量', 1, 25, 7, 1726351200000, 1724500000000, 1726351200000),
('app-notion', 'Notion 筆記庫', 'https://www.notion.so', 'work', 'work', '📓', '#4B6C7B', '整合工作專案管理、思維構思與團隊文件庫', 0, 12, 8, 1726344000000, 1723700000000, 1726344000000),
('app-spotify', 'Spotify 專注音樂', 'https://open.spotify.com', 'life', 'life', '🎧', '#5E7761', '日系 Lofi、環境白噪音與放鬆休閒音樂清單', 0, 30, 9, 1726362000000, 1723500000000, 1726362000000),
('app-calendar', 'Google 日曆', 'https://calendar.google.com', 'work', 'work', '🗓️', '#5B7B88', '會議安排、時間區塊規劃與個人待辦事項提醒', 0, 14, 10, 1726340400000, 1724100000000, 1726340400000),
('app-excalidraw', 'Excalidraw 手繪白板', 'https://excalidraw.com', 'creation', 'work', '🎨', '#C06C4C', '架構圖、流程草圖與日系溫暖風格手繪圖板', 0, 19, 11, 1726354800000, 1724400000000, 1726354800000);
