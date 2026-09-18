/**
 * Clare WebAPPs Hub - Cloudflare Worker REST API
 * 搭配 Cloudflare D1 (env.DB)
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...CORS_HEADERS,
    },
  });
}

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // 非 /api/* 路徑一律交給靜態資源處理 (index.html / app.js / style.css...)
    if (!path.startsWith('/api/')) {
      return env.ASSETS.fetch(request);
    }

    try {
      // 1. GET /api/apps : 取得所有應用清單
      if (request.method === 'GET' && (path === '/api/apps' || path === '/api/apps/')) {
        const { results } = await env.DB.prepare(
          'SELECT * FROM apps ORDER BY sort_order ASC, created_at DESC'
        ).all();

        // 格式化欄位轉換為前端慣用格式
        const apps = (results || []).map(r => ({
          id: r.id,
          name: r.name,
          url: r.url,
          category: r.category,
          scope: r.scope,
          icon: r.icon,
          color: r.color,
          description: r.description,
          pinned: Boolean(r.pinned),
          clickCount: Number(r.click_count) || 0,
          sortOrder: Number(r.sort_order) || 0,
          lastOpened: r.last_opened,
          createdAt: r.created_at,
          updatedAt: r.updated_at
        }));

        return jsonResponse({ success: true, count: apps.length, apps });
      }

      // 2. POST /api/apps : 新增單筆應用
      if (request.method === 'POST' && (path === '/api/apps' || path === '/api/apps/')) {
        const body = await request.json();
        const id = body.id || ('app-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4));
        const now = Date.now();

        // 取得目前最大排序值
        const maxSortRow = await env.DB.prepare('SELECT MIN(sort_order) as min_sort FROM apps').first();
        const nextSort = (maxSortRow?.min_sort || 1) - 1;

        await env.DB.prepare(`
          INSERT INTO apps (id, name, url, category, scope, icon, color, description, pinned, click_count, sort_order, last_opened, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          id,
          body.name || 'Untitled App',
          body.url || 'https://',
          body.category || 'work',
          body.scope || 'work',
          body.icon || '🌐',
          body.color || '#C06C4C',
          body.description || '',
          body.pinned ? 1 : 0,
          Number(body.clickCount) || 0,
          nextSort,
          body.lastOpened || null,
          body.createdAt || now,
          now
        ).run();

        return jsonResponse({ success: true, id, message: 'App added successfully' }, 201);
      }

      // 3. PUT /api/apps/reorder : 批次更新排序 (供拖拉排序使用)
      if (request.method === 'PUT' && path === '/api/apps/reorder') {
        const body = await request.json(); // { orders: [{ id, sortOrder, category?, scope? }] }
        if (Array.isArray(body.orders)) {
          const stmts = body.orders.map((item, idx) => {
            if (item.category) {
              return env.DB.prepare(
                'UPDATE apps SET sort_order = ?, category = ?, scope = COALESCE(?, scope), updated_at = ? WHERE id = ?'
              ).bind(idx + 1, item.category, item.scope || null, Date.now(), item.id);
            }
            return env.DB.prepare(
              'UPDATE apps SET sort_order = ?, updated_at = ? WHERE id = ?'
            ).bind(idx + 1, Date.now(), item.id);
          });
          await env.DB.batch(stmts);
          return jsonResponse({ success: true, message: 'Order updated' });
        }
        return jsonResponse({ success: false, error: 'Invalid payload' }, 400);
      }

      // 4. PUT /api/apps/:id/click : 累計點擊次數
      const clickMatch = path.match(/^\/api\/apps\/([^/]+)\/click$/);
      if (request.method === 'POST' && clickMatch) {
        const appId = clickMatch[1];
        const now = Date.now();
        await env.DB.prepare(
          'UPDATE apps SET click_count = click_count + 1, last_opened = ?, updated_at = ? WHERE id = ?'
        ).bind(now, now, appId).run();
        return jsonResponse({ success: true, message: 'Click recorded' });
      }

      // 5. PUT /api/apps/:id : 更新應用資訊
      const appMatch = path.match(/^\/api\/apps\/([^/]+)$/);
      if (request.method === 'PUT' && appMatch) {
        const appId = appMatch[1];
        const body = await request.json();
        const now = Date.now();

        await env.DB.prepare(`
          UPDATE apps SET
            name = COALESCE(?, name),
            url = COALESCE(?, url),
            category = COALESCE(?, category),
            scope = COALESCE(?, scope),
            icon = COALESCE(?, icon),
            color = COALESCE(?, color),
            description = COALESCE(?, description),
            pinned = COALESCE(?, pinned),
            updated_at = ?
          WHERE id = ?
        `).bind(
          body.name,
          body.url,
          body.category,
          body.scope,
          body.icon,
          body.color,
          body.description,
          body.pinned !== undefined ? (body.pinned ? 1 : 0) : null,
          now,
          appId
        ).run();

        return jsonResponse({ success: true, message: 'App updated' });
      }

      // 6. DELETE /api/apps/:id : 刪除應用
      if (request.method === 'DELETE' && appMatch) {
        const appId = appMatch[1];
        await env.DB.prepare('DELETE FROM apps WHERE id = ?').bind(appId).run();
        return jsonResponse({ success: true, message: 'App deleted' });
      }

      // 7. POST /api/apps/reset : 重置為預設值
      if (request.method === 'POST' && path === '/api/apps/reset') {
        // 先清空
        await env.DB.prepare('DELETE FROM apps').run();
        return jsonResponse({ success: true, message: 'Apps table cleared' });
      }

      return jsonResponse({ success: false, error: 'Endpoint Not Found' }, 404);
    } catch (err) {
      return jsonResponse({ success: false, error: err.message, stack: err.stack }, 500);
    }
  }
};
