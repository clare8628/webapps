/**
 * Clare App Hub - 個人 Web APP 群覽網頁核心邏輯
 * 具備：中英雙語切換、分區群覽、APP 管理、滑鼠拖拉排序與跨組移動、點擊統計、數據視覺化與 CSV/JSON 匯出匯入
 */

const APP_VERSION = 'v2026.09.15.5';

// =============================================================================
// 1. 多語系字典 (i18n Dictionary)
// =============================================================================
const I18N = {
  'zh-Hant': {
    brandTitle: 'Clare App Hub',
    brandSubtitle: '個人日常生活與工作 APP 群覽手冊',
    btnStats: '使用統計與匯出',
    btnAddApp: '新增 APP',
    metricTotalApps: '收錄 APP 總數',
    metricWorkApps: '工作專區',
    metricLifeApps: '日常生活',
    metricTotalLaunches: '總點擊開啟次數',
    searchPlaceholder: '搜尋 APP 名稱、網址或描述...',
    viewSections: '分區群覽',
    viewGrid: '綜合網格',
    categoryAll: '全部應用',
    cat_work: '工作辦公',
    cat_life: '日常生活',
    cat_learning: '學習閱讀',
    cat_tools: '實用工具',
    cat_creation: '創意設計',
    cat_finance: '財務理財',
    emptyTitle: '尚未找到相符的 Web APP',
    emptyDesc: '試著更換搜尋關鍵字，或點擊上方「新增 APP」加入您的應用。',
    emptyAddBtn: '立刻新增 APP',
    footerWabiSabi: '「簡單而專注的生活，藏於方寸井然的器具之中。」',
    footerDataNotice: '所有資料均安全儲存於個人本機瀏覽器中',
    modalAddTitle: '新增 Web APP',
    modalEditTitle: '編輯 Web APP',
    formName: 'APP 名稱',
    formUrl: '網址 URL',
    formCategory: '所屬類型',
    formScope: '使用場景維度',
    scopeWork: '工作用途 (Work)',
    scopeLife: '日常生活 (Life)',
    formIcon: '圖示或 Emoji',
    formColor: '代表色系',
    formDescription: '簡介備註 / 說明',
    formPinned: '釘選至常用精選 (Pinned to top)',
    btnCancel: '取消',
    btnSave: '儲存應用',
    statsTitle: '個人 APP 使用數據統計與匯出',
    statsSubtitle: '追蹤工作與日常生活節奏，掌握數位工具使用習慣',
    statBoxTotalClicks: '累計啟用次數',
    statBoxClicksHint: '每次點擊卡片自動計入',
    statBoxWorkRatio: '工作使用佔比',
    statBoxLifeRatio: '生活休閒佔比',
    statBoxActiveApp: '最常使用 APP',
    statsRankingTitle: '🏆 常用排行榜 Top 5',
    exportSectionTitle: '📦 數據備份與匯出管理',
    exportSectionDesc: '支援將 APP 清單與使用紀錄匯出為 CSV 報表或完整 JSON 備份檔，隨時可跨裝置還原。',
    btnExportCSV: '匯出 CSV 使用報表',
    btnExportJSON: '匯出完整備份 (JSON)',
    btnImportJSON: '匯入備份檔 (JSON)',
    btnResetDefaults: '重置為初始範例資料',
    confirmDeleteTitle: '確認移除此 APP？',
    confirmDeleteDesc: '您確定要從群覽中移除「{name}」嗎？此操作無法還原。',
    btnDeleteConfirm: '確認移除',
    toastAppSaved: 'APP 已成功儲存！',
    toastAppDeleted: 'APP 已成功移除。',
    toastDataReset: '已重置為初始範例資料。',
    toastImportSuccess: '成功匯入 {count} 個 APP 資料！',
    toastImportError: '匯入失敗：檔案格式不正確。',
    toastUrlError: '請填寫正確的網址（包含 http:// 或 https://）。',
    toastOrderUpdated: '已更新 APP 排列順序。',
    toastCategoryChanged: '已將「{name}」移至【{cat}】分類！',
    dragEmptyHint: '可拖曳 APP 至此分類區塊',
    dragHandleHint: '長按滑鼠拖曳可調整位置或跨組分類',
    clicksUnit: '次點擊',
    lastUsed: '最後使用：'
  },
  'en': {
    brandTitle: 'Clare App Hub',
    brandSubtitle: 'Personal Daily & Work Web App Editorial Gallery',
    btnStats: 'Analytics & Export',
    btnAddApp: 'Add App',
    metricTotalApps: 'Total Apps',
    metricWorkApps: 'Work Apps',
    metricLifeApps: 'Life Apps',
    metricTotalLaunches: 'Total Launches',
    searchPlaceholder: 'Search apps by name, url, or notes...',
    viewSections: 'Grouped Rows',
    viewGrid: 'Unified Grid',
    categoryAll: 'All Apps',
    cat_work: 'Work & Productivity',
    cat_life: 'Daily Life & Living',
    cat_learning: 'Study & Reading',
    cat_tools: 'Tools & Utilities',
    cat_creation: 'Creative & Design',
    cat_finance: 'Finance & Wealth',
    emptyTitle: 'No Matching Apps Found',
    emptyDesc: 'Try adjusting your search query, or click "Add App" to create one.',
    emptyAddBtn: 'Add App Now',
    footerWabiSabi: '"A focused, intentional life unfolds within orderly tools."',
    footerDataNotice: 'All data is stored securely in your local browser.',
    modalAddTitle: 'Add New Web App',
    modalEditTitle: 'Edit Web App',
    formName: 'App Name',
    formUrl: 'Web URL',
    formCategory: 'Category',
    formScope: 'Domain Scope',
    scopeWork: 'Work Purpose',
    scopeLife: 'Daily Life',
    formIcon: 'Icon or Emoji',
    formColor: 'Accent Tint',
    formDescription: 'Description / Notes',
    formPinned: 'Pin to top',
    btnCancel: 'Cancel',
    btnSave: 'Save App',
    statsTitle: 'App Usage Statistics & Data Export',
    statsSubtitle: 'Reflect on your digital rhythm between work and mindful living',
    statBoxTotalClicks: 'Total Launches',
    statBoxClicksHint: 'Auto-recorded upon click',
    statBoxWorkRatio: 'Work Ratio',
    statBoxLifeRatio: 'Life Ratio',
    statBoxActiveApp: 'Most Active App',
    statsRankingTitle: '🏆 Most Frequently Used (Top 5)',
    exportSectionTitle: '📦 Data Backup & Export',
    exportSectionDesc: 'Export your catalog & analytics to CSV or JSON backup files anytime.',
    btnExportCSV: 'Export CSV Report',
    btnExportJSON: 'Export Full Backup (JSON)',
    btnImportJSON: 'Import Backup (JSON)',
    btnResetDefaults: 'Reset to Default Apps',
    confirmDeleteTitle: 'Confirm Removal',
    confirmDeleteDesc: 'Are you sure you want to remove "{name}"? This cannot be undone.',
    btnDeleteConfirm: 'Delete App',
    toastAppSaved: 'App saved successfully!',
    toastAppDeleted: 'App removed.',
    toastDataReset: 'Reset to default sample apps.',
    toastImportSuccess: 'Successfully imported {count} apps!',
    toastImportError: 'Import failed: Invalid JSON format.',
    toastUrlError: 'Please enter a valid URL (starting with http:// or https://).',
    toastOrderUpdated: 'App position updated.',
    toastCategoryChanged: 'Moved "{name}" to {cat}!',
    dragEmptyHint: 'Drag and drop apps into this category',
    dragHandleHint: 'Drag to reorder or move across groups',
    clicksUnit: 'clicks',
    lastUsed: 'Last opened: '
  }
};

// =============================================================================
// 2. 初始精選資料 (含 Notion 匯入之個人專屬 Web APP)
// =============================================================================
const NOTION_IMPORTED_APPS = [
  {
    id: 'app-cashflow',
    name: '退休金流管理',
    url: 'https://cashflow.clare8628.workers.dev/',
    category: 'finance',
    scope: 'life',
    icon: '🪙',
    color: '#B59359',
    description: '退休金流試算、被動收入配置與提領安全策略規劃',
    pinned: true,
    clickCount: 15,
    lastOpened: Date.now() - 3600000 * 3,
    createdAt: Date.now() - 86400000 * 10
  },
  {
    id: 'app-etf-backtest',
    name: 'ETF & Stock Backtest Platform',
    url: 'https://etf-backtest-platform.clare8628.workers.dev/',
    category: 'finance',
    scope: 'work',
    icon: '📈',
    color: '#4B6C7B',
    description: 'ETF 與美股歷史數據回測、投資組合績效與風險報酬分析',
    pinned: true,
    clickCount: 28,
    lastOpened: Date.now() - 3600000 * 2,
    createdAt: Date.now() - 86400000 * 12
  },
  {
    id: 'app-asset-mgt',
    name: '個人資產管理系統',
    url: 'https://mgtasset.clare8628.workers.dev/',
    category: 'finance',
    scope: 'life',
    icon: '💼',
    color: '#C06C4C',
    description: '個人與家庭資產配置、淨值走勢追蹤與資產負債管理',
    pinned: true,
    clickCount: 22,
    lastOpened: Date.now() - 3600000 * 4,
    createdAt: Date.now() - 86400000 * 14
  },
  {
    id: 'app-group-stu',
    name: '分組系統 Student Grouping',
    url: 'https://groupstu.clare8628.workers.dev/',
    category: 'work',
    scope: 'work',
    icon: '👥',
    color: '#5E7761',
    description: '學生分組演算法、課堂協作團隊分配與名單匯入管理',
    pinned: true,
    clickCount: 18,
    lastOpened: Date.now() - 3600000 * 6,
    createdAt: Date.now() - 86400000 * 15
  },
  {
    id: 'app-ai-role',
    name: 'AI角色產生器 — 客製化機器人助理指令',
    url: 'https://arolebuilder.pages.dev/',
    category: 'creation',
    scope: 'work',
    icon: '🤖',
    color: '#9B7382',
    description: '客製化 AI 角色設定、System Prompt 與機器人助理指令建構',
    pinned: true,
    clickCount: 35,
    lastOpened: Date.now() - 3600000 * 1,
    createdAt: Date.now() - 86400000 * 16
  },
  {
    id: 'app-prompt-builder',
    name: 'PromptBuilder — AI 開發 Prompt 建構器',
    url: 'https://pbuilder.pages.dev/',
    category: 'tools',
    scope: 'work',
    icon: '⚡',
    color: '#C06C4C',
    description: 'AI 應用開發 Prompt 工程結構化建構、測試與優化工具',
    pinned: true,
    clickCount: 40,
    lastOpened: Date.now() - 3600000 * 1.5,
    createdAt: Date.now() - 86400000 * 18
  },
  {
    id: 'app-peer-review',
    name: '作業同儕互評平台',
    url: 'https://peer-review-platform.pages.dev/',
    category: 'learning',
    scope: 'work',
    icon: '📝',
    color: '#4B6C7B',
    description: '課程學生作業盲審互評、同儕評分回饋與學習歷程評量',
    pinned: true,
    clickCount: 25,
    lastOpened: Date.now() - 3600000 * 5,
    createdAt: Date.now() - 86400000 * 20
  }
];

const DEFAULT_APPS = [
  ...NOTION_IMPORTED_APPS,

  // 更多實用日常精選
  {
    id: 'app-notion',
    name: 'Notion 筆記庫',
    url: 'https://www.notion.so',
    category: 'work',
    scope: 'work',
    icon: '📓',
    color: '#4B6C7B',
    description: '整合工作專案管理、思維構思與團隊文件庫',
    pinned: false,
    clickCount: 12,
    lastOpened: Date.now() - 3600000 * 7,
    createdAt: Date.now() - 86400000 * 30
  },
  {
    id: 'app-spotify',
    name: 'Spotify 專注音樂',
    url: 'https://open.spotify.com',
    category: 'life',
    scope: 'life',
    icon: '🎧',
    color: '#5E7761',
    description: '日系 Lofi、環境白噪音與放鬆休閒音樂清單',
    pinned: false,
    clickCount: 30,
    lastOpened: Date.now() - 3600000 * 2,
    createdAt: Date.now() - 86400000 * 32
  },
  {
    id: 'app-calendar',
    name: 'Google 日曆',
    url: 'https://calendar.google.com',
    category: 'work',
    scope: 'work',
    icon: '🗓️',
    color: '#5B7B88',
    description: '會議安排、時間區塊規劃與個人待辦事項提醒',
    pinned: false,
    clickCount: 14,
    lastOpened: Date.now() - 3600000 * 8,
    createdAt: Date.now() - 86400000 * 25
  },
  {
    id: 'app-excalidraw',
    name: 'Excalidraw 手繪白板',
    url: 'https://excalidraw.com',
    category: 'creation',
    scope: 'work',
    icon: '🎨',
    color: '#C06C4C',
    description: '架構圖、流程草圖與日系溫暖風格手繪圖板',
    pinned: false,
    clickCount: 19,
    lastOpened: Date.now() - 3600000 * 4,
    createdAt: Date.now() - 86400000 * 22
  }
];

// 分類定義表
const CATEGORY_META = {
  work: { labelKey: 'cat_work', icon: '💼', order: 1 },
  tools: { labelKey: 'cat_tools', icon: '🛠️', order: 2 },
  finance: { labelKey: 'cat_finance', icon: '🪙', order: 3 },
  creation: { labelKey: 'cat_creation', icon: '🎨', order: 4 },
  learning: { labelKey: 'cat_learning', icon: '📚', order: 5 },
  life: { labelKey: 'cat_life', icon: '🍵', order: 6 }
};

// =============================================================================
// 3. 狀態管理器 (State Management)
// =============================================================================
class AppState {
  constructor() {
    this.currentLang = localStorage.getItem('clare_lang') || localStorage.getItem('komorebi_lang') || 'zh-Hant';
    this.currentTheme = localStorage.getItem('clare_theme') || localStorage.getItem('komorebi_theme') || 'light';
    this.viewMode = localStorage.getItem('clare_view_mode') || localStorage.getItem('komorebi_view_mode') || 'sections'; // 'sections' | 'grid'
    this.selectedCategory = 'all'; // 'all' or category key
    this.searchQuery = '';
    this.deleteTargetId = null;

    // 載入 APP 資料（自動讀取並平滑過渡）
    const storedApps = localStorage.getItem('clare_apps') || localStorage.getItem('komorebi_apps');
    if (storedApps) {
      try {
        this.apps = JSON.parse(storedApps);
      } catch (e) {
        console.error('Failed to parse local stored apps, falling back to defaults:', e);
        this.apps = [...DEFAULT_APPS];
      }
    } else {
      this.apps = [...DEFAULT_APPS];
    }

    // 自動合併與補齊 Notion 匯入的 7 款專屬 Web APP
    const existingUrls = new Set(this.apps.map(a => (a.url || '').trim().replace(/\/+$/, '')));
    let hasNew = false;
    for (const nApp of NOTION_IMPORTED_APPS) {
      const cleanUrl = nApp.url.trim().replace(/\/+$/, '');
      if (!existingUrls.has(cleanUrl)) {
        this.apps.unshift({ ...nApp });
        existingUrls.add(cleanUrl);
        hasNew = true;
      }
    }

    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem('clare_apps', JSON.stringify(this.apps));
  }

  setLang(lang) {
    this.currentLang = lang;
    localStorage.setItem('clare_lang', lang);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    localStorage.setItem('clare_theme', theme);
  }

  setViewMode(mode) {
    this.viewMode = mode;
    localStorage.setItem('clare_view_mode', mode);
  }

  addApp(appData) {
    const newApp = {
      id: 'app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      createdAt: Date.now(),
      clickCount: 0,
      lastOpened: null,
      ...appData
    };
    this.apps.unshift(newApp);
    this.saveToStorage();
    return newApp;
  }

  updateApp(id, updatedFields) {
    const index = this.apps.findIndex(a => a.id === id);
    if (index !== -1) {
      this.apps[index] = { ...this.apps[index], ...updatedFields };
      this.saveToStorage();
      return this.apps[index];
    }
    return null;
  }

  deleteApp(id) {
    this.apps = this.apps.filter(a => a.id !== id);
    this.saveToStorage();
  }

  recordAppClick(id) {
    const app = this.apps.find(a => a.id === id);
    if (app) {
      app.clickCount = (app.clickCount || 0) + 1;
      app.lastOpened = Date.now();
      this.saveToStorage();
    }
  }

  resetToDefaults() {
    this.apps = JSON.parse(JSON.stringify(DEFAULT_APPS));
    this.saveToStorage();
  }
}

const state = new AppState();

// =============================================================================
// 4. UI 渲染引擎 (Render Engine)
// =============================================================================

function t(key, params = {}) {
  const dict = I18N[state.currentLang] || I18N['zh-Hant'];
  let text = dict[key] || key;
  for (const [pKey, pVal] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${pKey}\\}`, 'g'), pVal);
  }
  return text;
}

function applyI18n() {
  document.documentElement.lang = state.currentLang;
  document.getElementById('currentLangText').textContent = state.currentLang === 'zh-Hant' ? 'EN' : '繁中';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  renderCategoryTabs();
  renderAppGallery();
  updateMetricsBar();
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.currentTheme);
  const iconSun = document.getElementById('iconSun');
  const iconMoon = document.getElementById('iconMoon');
  if (state.currentTheme === 'dark') {
    iconSun.classList.add('hidden');
    iconMoon.classList.remove('hidden');
  } else {
    iconSun.classList.remove('hidden');
    iconMoon.classList.add('hidden');
  }
}

function updateMetricsBar() {
  const totalApps = state.apps.length;
  const workApps = state.apps.filter(a => a.scope === 'work').length;
  const lifeApps = state.apps.filter(a => a.scope === 'life').length;
  const totalClicks = state.apps.reduce((sum, a) => sum + (a.clickCount || 0), 0);

  document.getElementById('metricTotalApps').textContent = totalApps;
  document.getElementById('metricWorkApps').textContent = workApps;
  document.getElementById('metricLifeApps').textContent = lifeApps;
  document.getElementById('metricTotalLaunches').textContent = totalClicks;
}

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = '';

  // "全部" Tab
  const allBtn = document.createElement('button');
  allBtn.className = `tab-btn ${state.selectedCategory === 'all' ? 'active' : ''}`;
  allBtn.type = 'button';
  allBtn.innerHTML = `<span>${t('categoryAll')}</span><span class="tab-count">${state.apps.length}</span>`;
  allBtn.addEventListener('click', () => {
    state.selectedCategory = 'all';
    renderCategoryTabs();
    renderAppGallery();
  });
  container.appendChild(allBtn);

  // 各分類 Tab
  for (const [catKey, meta] of Object.entries(CATEGORY_META)) {
    const count = state.apps.filter(a => a.category === catKey).length;
    if (count > 0 || state.selectedCategory === catKey) {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${state.selectedCategory === catKey ? 'active' : ''}`;
      btn.type = 'button';
      btn.innerHTML = `<span>${meta.icon} ${t(meta.labelKey)}</span><span class="tab-count">${count}</span>`;
      btn.addEventListener('click', () => {
        state.selectedCategory = catKey;
        renderCategoryTabs();
        renderAppGallery();
      });
      container.appendChild(btn);
    }
  }
}

function filterApps() {
  const query = state.searchQuery.toLowerCase().trim();
  return state.apps.filter(app => {
    // 類別過濾
    if (state.selectedCategory !== 'all' && app.category !== state.selectedCategory) {
      return false;
    }
    // 搜尋過濾
    if (query) {
      const matchName = (app.name || '').toLowerCase().includes(query);
      const matchUrl = (app.url || '').toLowerCase().includes(query);
      const matchDesc = (app.description || '').toLowerCase().includes(query);
      return matchName || matchUrl || matchDesc;
    }
    return true;
  });
}

// =============================================================================
// 全域拖曳狀態 (Drag and Drop State)
// =============================================================================
let draggedAppId = null;
let isDraggingActive = false;

function renderAppGallery() {
  const gallery = document.getElementById('galleryContainer');
  const emptyState = document.getElementById('emptyState');
  gallery.innerHTML = '';

  const filtered = filterApps();

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  if (state.viewMode === 'sections' && state.selectedCategory === 'all' && !state.searchQuery) {
    // 模式 1：依類型分區呈現 (Grouped Section Rows)
    // 遍歷所有已定義的分類，確保各分區均可供拖放，維持使用者手動排列順序
    const sortedCats = Object.keys(CATEGORY_META).sort((a, b) => {
      const ordA = CATEGORY_META[a] ? CATEGORY_META[a].order : 99;
      const ordB = CATEGORY_META[b] ? CATEGORY_META[b].order : 99;
      return ordA - ordB;
    });

    for (const catKey of sortedCats) {
      const catApps = filtered.filter(app => app.category === catKey);
      const meta = CATEGORY_META[catKey] || { labelKey: catKey, icon: '📁' };

      const section = document.createElement('section');
      section.className = 'category-section';
      section.setAttribute('data-category', catKey);

      const sectionHeader = document.createElement('header');
      sectionHeader.className = 'section-header';
      sectionHeader.innerHTML = `
        <div class="section-header-title-wrap">
          <h2 class="section-title">${meta.icon} ${t(meta.labelKey)}</h2>
          <span class="section-subtitle">${catApps.length} ${state.currentLang === 'zh-Hant' ? '個應用' : 'apps'}</span>
        </div>
        <span class="section-count-badge">${catKey.toUpperCase()}</span>
      `;
      section.appendChild(sectionHeader);

      const grid = document.createElement('div');
      grid.className = 'cards-grid';
      grid.setAttribute('data-category', catKey);

      // 容器支援跨組拖入空白處或空分類
      grid.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        grid.classList.add('drag-over-container');
      });
      grid.addEventListener('dragleave', (e) => {
        if (!grid.contains(e.relatedTarget)) {
          grid.classList.remove('drag-over-container');
        }
      });
      grid.addEventListener('drop', (e) => {
        e.preventDefault();
        grid.classList.remove('drag-over-container');
        if (draggedAppId && !e.target.closest('.app-card')) {
          handleAppDropToCategory(draggedAppId, catKey);
        }
      });

      if (catApps.length === 0) {
        const placeholder = document.createElement('div');
        placeholder.className = 'empty-category-placeholder';
        placeholder.innerHTML = `<span>🍃 ${t('dragEmptyHint')}</span>`;
        grid.appendChild(placeholder);
      } else {
        for (const app of catApps) {
          grid.appendChild(createAppCard(app, catKey));
        }
      }

      section.appendChild(grid);
      gallery.appendChild(section);
    }
  } else {
    // 模式 2：綜合網格 (Unified Grid) 或單一分類檢視
    const grid = document.createElement('div');
    grid.className = 'cards-grid';
    if (state.selectedCategory !== 'all') {
      grid.setAttribute('data-category', state.selectedCategory);
    }

    grid.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      grid.classList.add('drag-over-container');
    });
    grid.addEventListener('dragleave', (e) => {
      if (!grid.contains(e.relatedTarget)) {
        grid.classList.remove('drag-over-container');
      }
    });
    grid.addEventListener('drop', (e) => {
      e.preventDefault();
      grid.classList.remove('drag-over-container');
      if (draggedAppId && !e.target.closest('.app-card') && state.selectedCategory !== 'all') {
        handleAppDropToCategory(draggedAppId, state.selectedCategory);
      }
    });

    for (const app of filtered) {
      grid.appendChild(createAppCard(app, app.category));
    }
    gallery.appendChild(grid);
  }
}

function createAppCard(app, currentCategory) {
  const card = document.createElement('article');
  card.className = 'app-card';
  card.style.setProperty('--card-accent', app.color || '#C06C4C');
  card.setAttribute('data-id', app.id);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('draggable', 'true');

  // 判定 Icon 是 Emoji 還是圖片
  let iconHtml = '🌐';
  if (app.icon) {
    if (app.icon.startsWith('http://') || app.icon.startsWith('https://') || app.icon.startsWith('data:image')) {
      iconHtml = `<img class="card-icon-img" src="${escapeHtml(app.icon)}" alt="${escapeHtml(app.name)}" loading="lazy" onerror="this.outerHTML='🌐'">`;
    } else {
      iconHtml = escapeHtml(app.icon);
    }
  }

  // 簡化網址顯示
  let displayUrl = app.url;
  try {
    const u = new URL(app.url);
    displayUrl = u.hostname + (u.pathname !== '/' ? u.pathname : '');
  } catch (e) {}

  const scopeBadgeClass = app.scope === 'work' ? 'scope-work-badge' : 'scope-life-badge';
  const scopeBadgeText = app.scope === 'work' ? (state.currentLang === 'zh-Hant' ? '工作' : 'Work') : (state.currentLang === 'zh-Hant' ? '生活' : 'Life');

  card.innerHTML = `
    <div>
      <div class="card-top">
        <div class="card-icon-box" style="border-color: ${app.color ? app.color + '40' : 'transparent'}">${iconHtml}</div>
        <div class="card-meta">
          <div class="card-title-row">
            <h3 class="card-title">${escapeHtml(app.name)}</h3>
            ${app.pinned ? '<span class="card-pinned-star" title="Pinned">★</span>' : ''}
            <span class="card-drag-handle" title="${escapeHtml(t('dragHandleHint'))}" aria-label="Drag Handle">⠿</span>
          </div>
          <p class="card-url">${escapeHtml(displayUrl)}</p>
        </div>
      </div>
      <p class="card-desc">${escapeHtml(app.description || '無備註說明')}</p>
    </div>

    <div class="card-footer">
      <div class="card-stats-tag">
        <span class="card-scope-badge ${scopeBadgeClass}">${scopeBadgeText}</span>
        <span>•</span>
        <span>${app.clickCount || 0} ${t('clicksUnit')}</span>
      </div>

      <div class="card-actions" onclick="event.stopPropagation()">
        <button type="button" class="card-action-btn edit-btn" title="編輯" aria-label="Edit">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button type="button" class="card-action-btn delete-btn" title="移除" aria-label="Delete">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `;

  // ---------------------------------------------------------------------------
  // 拖曳事件處理 (Drag & Drop Handlers)
  // ---------------------------------------------------------------------------
  card.addEventListener('dragstart', (e) => {
    draggedAppId = app.id;
    isDraggingActive = true;
    e.dataTransfer.setData('text/plain', app.id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      card.classList.add('dragging');
    }, 0);
  });

  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    document.querySelectorAll('.app-card').forEach(c => c.classList.remove('drop-before', 'drop-after'));
    document.querySelectorAll('.cards-grid').forEach(g => g.classList.remove('drag-over-container'));
    setTimeout(() => {
      isDraggingActive = false;
      draggedAppId = null;
    }, 150);
  });

  card.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedAppId || draggedAppId === app.id) return;
    e.dataTransfer.dropEffect = 'move';

    const rect = card.getBoundingClientRect();
    const isLeft = e.clientX < rect.left + rect.width / 2;
    if (isLeft) {
      card.classList.add('drop-before');
      card.classList.remove('drop-after');
    } else {
      card.classList.add('drop-after');
      card.classList.remove('drop-before');
    }
  });

  card.addEventListener('dragleave', () => {
    card.classList.remove('drop-before', 'drop-after');
  });

  card.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isBefore = card.classList.contains('drop-before');
    card.classList.remove('drop-before', 'drop-after');
    document.querySelectorAll('.cards-grid').forEach(g => g.classList.remove('drag-over-container'));

    if (draggedAppId && draggedAppId !== app.id) {
      handleAppDrop(draggedAppId, app.id, isBefore, currentCategory || app.category);
    }
  });

  // ---------------------------------------------------------------------------
  // 點擊卡片跳轉（防呆：拖拉放開滑鼠時不觸發跳轉）
  // ---------------------------------------------------------------------------
  const handleLaunch = () => {
    if (isDraggingActive) return;
    state.recordAppClick(app.id);
    updateMetricsBar();
    const clicksTag = card.querySelector('.card-stats-tag span:last-child');
    if (clicksTag) clicksTag.textContent = `${app.clickCount} ${t('clicksUnit')}`;
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  card.addEventListener('click', handleLaunch);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLaunch();
    }
  });

  // 編輯按鈕
  const editBtn = card.querySelector('.edit-btn');
  editBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openEditDialog(app);
  });

  // 刪除按鈕
  const deleteBtn = card.querySelector('.delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openDeleteConfirm(app);
  });

  return card;
}

// -----------------------------------------------------------------------------
// 拖放位置重排與跨組分類處理函數
// -----------------------------------------------------------------------------
function handleAppDrop(sourceId, targetId, insertBefore, targetCategory) {
  const sourceIndex = state.apps.findIndex(a => a.id === sourceId);
  const targetIndex = state.apps.findIndex(a => a.id === targetId);
  if (sourceIndex === -1 || targetIndex === -1) return;

  const [movedApp] = state.apps.splice(sourceIndex, 1);
  const prevCategory = movedApp.category;

  // 跨組移動時更新分類與建議維度
  if (targetCategory && movedApp.category !== targetCategory) {
    movedApp.category = targetCategory;
    if (targetCategory === 'work') movedApp.scope = 'work';
    else if (targetCategory === 'life') movedApp.scope = 'life';
  }

  // 重新定位 targetIndex
  let newTargetIndex = state.apps.findIndex(a => a.id === targetId);
  if (!insertBefore) {
    newTargetIndex += 1;
  }
  state.apps.splice(newTargetIndex, 0, movedApp);
  state.saveToStorage();

  // 提示通知
  if (prevCategory !== movedApp.category) {
    const catLabel = t(CATEGORY_META[movedApp.category]?.labelKey || movedApp.category);
    showToast(t('toastCategoryChanged', { name: movedApp.name, cat: catLabel }));
  } else {
    showToast(t('toastOrderUpdated'));
  }

  renderCategoryTabs();
  renderAppGallery();
  updateMetricsBar();
}

function handleAppDropToCategory(sourceId, targetCategory) {
  const sourceIndex = state.apps.findIndex(a => a.id === sourceId);
  if (sourceIndex === -1) return;

  const [movedApp] = state.apps.splice(sourceIndex, 1);
  const prevCategory = movedApp.category;
  movedApp.category = targetCategory;
  if (targetCategory === 'work') movedApp.scope = 'work';
  else if (targetCategory === 'life') movedApp.scope = 'life';

  // 插入至該分類最後一個項目後面
  let lastIndexOfCat = -1;
  for (let i = state.apps.length - 1; i >= 0; i--) {
    if (state.apps[i].category === targetCategory) {
      lastIndexOfCat = i;
      break;
    }
  }
  if (lastIndexOfCat !== -1) {
    state.apps.splice(lastIndexOfCat + 1, 0, movedApp);
  } else {
    state.apps.push(movedApp);
  }

  state.saveToStorage();

  if (prevCategory !== targetCategory) {
    const catLabel = t(CATEGORY_META[targetCategory]?.labelKey || targetCategory);
    showToast(t('toastCategoryChanged', { name: movedApp.name, cat: catLabel }));
  } else {
    showToast(t('toastOrderUpdated'));
  }

  renderCategoryTabs();
  renderAppGallery();
  updateMetricsBar();
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }[m]));
}

// =============================================================================
// 5. 新增 / 編輯 APP 彈窗對話框
// =============================================================================
const appDialog = document.getElementById('appDialog');
const appForm = document.getElementById('appForm');

function openAddDialog() {
  document.getElementById('dialogTitle').textContent = t('modalAddTitle');
  appForm.reset();
  document.getElementById('appId').value = '';
  document.getElementById('appColor').value = '#C06C4C';
  document.getElementById('appPinned').checked = false;
  appDialog.showModal();
}

function openEditDialog(app) {
  document.getElementById('dialogTitle').textContent = t('modalEditTitle');
  document.getElementById('appId').value = app.id;
  document.getElementById('appName').value = app.name || '';
  document.getElementById('appUrl').value = app.url || '';
  document.getElementById('appCategory').value = app.category || 'work';
  document.getElementById('appScope').value = app.scope || 'work';
  document.getElementById('appIcon').value = app.icon || '';
  document.getElementById('appColor').value = app.color || '#C06C4C';
  document.getElementById('appDescription').value = app.description || '';
  document.getElementById('appPinned').checked = !!app.pinned;
  appDialog.showModal();
}

function closeAppDialog() {
  appDialog.close();
}

appForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('appId').value;
  const name = document.getElementById('appName').value.trim();
  let url = document.getElementById('appUrl').value.trim();
  const category = document.getElementById('appCategory').value;
  const scope = document.getElementById('appScope').value;
  const icon = document.getElementById('appIcon').value.trim();
  const color = document.getElementById('appColor').value;
  const description = document.getElementById('appDescription').value.trim();
  const pinned = document.getElementById('appPinned').checked;

  if (!name || !url) return;

  // 補足 http 協定
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }

  if (id) {
    state.updateApp(id, { name, url, category, scope, icon, color, description, pinned });
  } else {
    state.addApp({ name, url, category, scope, icon, color, description, pinned });
  }

  closeAppDialog();
  renderCategoryTabs();
  renderAppGallery();
  updateMetricsBar();
  showToast(t('toastAppSaved'));
});

document.getElementById('btnCancelDialog').addEventListener('click', closeAppDialog);
document.getElementById('btnCloseDialog').addEventListener('click', closeAppDialog);

// 支援點擊 dialog backdrop 關閉
appDialog.addEventListener('click', (e) => {
  const rect = appDialog.getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    closeAppDialog();
  }
});

// 顏色預設選擇器快捷點擊
document.getElementById('colorPresets').addEventListener('click', (e) => {
  const dot = e.target.closest('.preset-color-dot');
  if (dot) {
    const color = dot.getAttribute('data-color');
    document.getElementById('appColor').value = color;
  }
});

// =============================================================================
// 6. 刪除確認對話框
// =============================================================================
const deleteConfirmDialog = document.getElementById('deleteConfirmDialog');

function openDeleteConfirm(app) {
  state.deleteTargetId = app.id;
  document.getElementById('deleteAppName').textContent = app.name;
  deleteConfirmDialog.showModal();
}

function closeDeleteConfirm() {
  state.deleteTargetId = null;
  deleteConfirmDialog.close();
}

document.getElementById('btnCancelDelete').addEventListener('click', closeDeleteConfirm);
document.getElementById('btnCloseDeleteConfirm').addEventListener('click', closeDeleteConfirm);
document.getElementById('btnConfirmDelete').addEventListener('click', () => {
  if (state.deleteTargetId) {
    state.deleteApp(state.deleteTargetId);
    closeDeleteConfirm();
    renderCategoryTabs();
    renderAppGallery();
    updateMetricsBar();
    showToast(t('toastAppDeleted'));
  }
});

deleteConfirmDialog.addEventListener('click', (e) => {
  const rect = deleteConfirmDialog.getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    closeDeleteConfirm();
  }
});

// =============================================================================
// 7. 使用數據統計與視覺化面板 (Statistics & Export)
// =============================================================================
const statsDialog = document.getElementById('statsDialog');

function openStatsDialog() {
  renderStatisticsContent();
  statsDialog.showModal();
}

function closeStatsDialog() {
  statsDialog.close();
}

function renderStatisticsContent() {
  const apps = state.apps;
  const totalClicks = apps.reduce((sum, a) => sum + (a.clickCount || 0), 0);

  // 工作 vs 生活次數統計
  const workClicks = apps.filter(a => a.scope === 'work').reduce((sum, a) => sum + (a.clickCount || 0), 0);
  const lifeClicks = apps.filter(a => a.scope === 'life').reduce((sum, a) => sum + (a.clickCount || 0), 0);

  const workRatio = totalClicks > 0 ? Math.round((workClicks / totalClicks) * 100) : 0;
  const lifeRatio = totalClicks > 0 ? 100 - workRatio : 0;

  // 最常使用 APP
  const sortedByClicks = [...apps].sort((a, b) => (b.clickCount || 0) - (a.clickCount || 0));
  const topApp = sortedByClicks[0];

  document.getElementById('statTotalClicks').textContent = totalClicks;
  document.getElementById('statWorkRatio').textContent = `${workRatio}%`;
  document.getElementById('statLifeRatio').textContent = `${lifeRatio}%`;
  document.getElementById('statWorkCountText').textContent = `${workClicks} ${t('clicksUnit')}`;
  document.getElementById('statLifeCountText').textContent = `${lifeClicks} ${t('clicksUnit')}`;

  if (topApp && (topApp.clickCount || 0) > 0) {
    document.getElementById('statTopApp').textContent = topApp.name;
    document.getElementById('statTopAppClicks').textContent = `${topApp.clickCount} ${t('clicksUnit')}`;
  } else {
    document.getElementById('statTopApp').textContent = '-';
    document.getElementById('statTopAppClicks').textContent = `0 ${t('clicksUnit')}`;
  }

  // 進度條比例
  document.getElementById('ratioWorkPercent').textContent = `${workRatio}%`;
  document.getElementById('ratioLifePercent').textContent = `${lifeRatio}%`;
  document.getElementById('ratioProgressWork').style.width = `${totalClicks > 0 ? workRatio : 50}%`;
  document.getElementById('ratioProgressLife').style.width = `${totalClicks > 0 ? lifeRatio : 50}%`;

  // 排行榜清單 (Top 5)
  const rankList = document.getElementById('statsRankList');
  rankList.innerHTML = '';
  const top5 = sortedByClicks.slice(0, 5);

  top5.forEach((app, idx) => {
    const li = document.createElement('li');
    li.className = 'rank-item';
    li.innerHTML = `
      <div class="rank-left">
        <span class="rank-index">#${idx + 1}</span>
        <span class="rank-icon">${escapeHtml(app.icon || '🌐')}</span>
        <span class="rank-name">${escapeHtml(app.name)}</span>
      </div>
      <span class="rank-clicks">${app.clickCount || 0} ${t('clicksUnit')}</span>
    `;
    rankList.appendChild(li);
  });
}

document.getElementById('btnOpenStats').addEventListener('click', openStatsDialog);
document.getElementById('btnCloseStats').addEventListener('click', closeStatsDialog);
statsDialog.addEventListener('click', (e) => {
  const rect = statsDialog.getBoundingClientRect();
  const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
    && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    closeStatsDialog();
  }
});

// =============================================================================
// 8. 數據匯出與匯入 (CSV & JSON Export/Import)
// =============================================================================

// 匯出 CSV 報表
document.getElementById('btnExportCSV').addEventListener('click', () => {
  const headers = ['ID', '名稱 (Name)', '分類 (Category)', '場景 (Scope)', '網址 (URL)', '點擊次數 (Clicks)', '最後開啟時間 (Last Opened)', '建立時間 (Created At)'];
  const rows = state.apps.map(a => [
    `"${a.id}"`,
    `"${(a.name || '').replace(/"/g, '""')}"`,
    `"${a.category || ''}"`,
    `"${a.scope || ''}"`,
    `"${(a.url || '').replace(/"/g, '""')}"`,
    a.clickCount || 0,
    `"${a.lastOpened ? new Date(a.lastOpened).toLocaleString() : '-'}"`,
    `"${new Date(a.createdAt).toLocaleString()}"`
  ]);

  // UTF-8 BOM 避免 Excel 亂碼
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `clare_apps_report_${new Date().toISOString().slice(0, 10)}.csv`);
});

// 匯出 JSON 備份
document.getElementById('btnExportJSON').addEventListener('click', () => {
  const exportPayload = {
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    apps: state.apps
  };
  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  downloadBlob(blob, `clare_backup_${new Date().toISOString().slice(0, 10)}.json`);
});

// 匯入 JSON 備份
document.getElementById('fileImportJSON').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      let importedApps = null;
      if (Array.isArray(data)) {
        importedApps = data;
      } else if (data && Array.isArray(data.apps)) {
        importedApps = data.apps;
      }

      if (!importedApps || importedApps.length === 0) {
        throw new Error('Invalid format: no apps found');
      }

      // 驗證結構
      state.apps = importedApps.map(item => ({
        id: item.id || ('app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)),
        name: item.name || 'Untitled App',
        url: item.url || 'https://example.com',
        category: item.category || 'work',
        scope: item.scope || 'work',
        icon: item.icon || '🌐',
        color: item.color || '#C06C4C',
        description: item.description || '',
        pinned: !!item.pinned,
        clickCount: Number(item.clickCount) || 0,
        lastOpened: item.lastOpened || null,
        createdAt: item.createdAt || Date.now()
      }));

      state.saveToStorage();
      renderCategoryTabs();
      renderAppGallery();
      updateMetricsBar();
      renderStatisticsContent();
      showToast(t('toastImportSuccess', { count: state.apps.length }));
    } catch (err) {
      console.error('Import error:', err);
      showToast(t('toastImportError'));
    } finally {
      e.target.value = '';
    }
  };
  reader.readAsText(file);
});

// 重置範例資料
document.getElementById('btnResetData').addEventListener('click', () => {
  if (confirm(state.currentLang === 'zh-Hant' ? '確定要重置為預設範例資料嗎？這將覆蓋現有修改。' : 'Reset to default sample apps? This will overwrite current changes.')) {
    state.resetToDefaults();
    renderCategoryTabs();
    renderAppGallery();
    updateMetricsBar();
    renderStatisticsContent();
    showToast(t('toastDataReset'));
  }
});

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// =============================================================================
// 9. Toast 通知元件
// =============================================================================
let toastTimeout = null;
function showToast(msg) {
  const toast = document.getElementById('toast');
  const messageEl = document.getElementById('toastMessage');
  messageEl.textContent = msg;
  toast.classList.remove('hidden');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

// =============================================================================
// 10. 事件監聽與初始化 (Initialization)
// =============================================================================

function init() {
  applyTheme();
  applyI18n();

  // 新增按鈕
  document.getElementById('btnOpenAddApp').addEventListener('click', openAddDialog);
  document.getElementById('btnEmptyAdd').addEventListener('click', openAddDialog);

  // 主題切換
  document.getElementById('btnThemeToggle').addEventListener('click', () => {
    const nextTheme = state.currentTheme === 'light' ? 'dark' : 'light';
    state.setTheme(nextTheme);
    applyTheme();
  });

  // 語系切換
  document.getElementById('btnLangToggle').addEventListener('click', () => {
    const nextLang = state.currentLang === 'zh-Hant' ? 'en' : 'zh-Hant';
    state.setLang(nextLang);
    applyI18n();
  });

  // 檢視模式切換 (分區群覽 vs 綜合網格)
  const btnSections = document.getElementById('btnViewSections');
  const btnGrid = document.getElementById('btnViewGrid');

  function updateViewButtons() {
    if (state.viewMode === 'sections') {
      btnSections.classList.add('active');
      btnSections.setAttribute('aria-pressed', 'true');
      btnGrid.classList.remove('active');
      btnGrid.setAttribute('aria-pressed', 'false');
    } else {
      btnGrid.classList.add('active');
      btnGrid.setAttribute('aria-pressed', 'true');
      btnSections.classList.remove('active');
      btnSections.setAttribute('aria-pressed', 'false');
    }
  }

  btnSections.addEventListener('click', () => {
    state.setViewMode('sections');
    updateViewButtons();
    renderAppGallery();
  });

  btnGrid.addEventListener('click', () => {
    state.setViewMode('grid');
    updateViewButtons();
    renderAppGallery();
  });

  updateViewButtons();

  // 即時搜尋
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery) {
      btnClearSearch.classList.remove('hidden');
    } else {
      btnClearSearch.classList.add('hidden');
    }
    renderAppGallery();
  });

  btnClearSearch.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    btnClearSearch.classList.add('hidden');
    renderAppGallery();
    searchInput.focus();
  });
}

// 啟動應用
document.addEventListener('DOMContentLoaded', init);
