"""
deploy.py
一鍵建立 Cloudflare D1 資料庫並部署 Worker API
跨平台無編碼問題，最穩定簡潔。
"""

import subprocess
import re
import os
import sys

def run_cmd(cmd, check=True):
    print(f"\n>> 執行: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
    print(res.stdout)
    if res.stderr:
        print(res.stderr)
    return res

def main():
    print("=======================================================")
    print("  Cloudflare D1 資料庫與 Worker API 一鍵配置與部署")
    print("=======================================================")

    # 1. 檢查登入
    print("\n[1/4] 檢查 Cloudflare 登入狀態...")
    check_login = subprocess.run("npx wrangler whoami", shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if "You are not authenticated" in check_login.stdout or check_login.returncode != 0:
        print("未登入 Cloudflare，即將開啟瀏覽器進行登入授權...")
        subprocess.run("npx wrangler login", shell=True)
    else:
        print("已成功連接 Cloudflare 帳戶！")

    # 2. 建立 D1 資料庫
    print("\n[2/4] 檢查或建立 D1 資料庫 (webapps-db)...")
    res_create = subprocess.run("npx wrangler d1 create webapps-db", shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
    output = res_create.stdout + res_create.stderr
    print(output)

    d1_id = None
    m = re.search(r'database_id\s*=\s*"([^"]+)"', output)
    if m:
        d1_id = m.group(1)
    else:
        # 如果已存在，從 list 查詢
        res_list = subprocess.run("npx wrangler d1 list", shell=True, capture_output=True, text=True, encoding="utf-8", errors="replace")
        for line in res_list.stdout.splitlines():
            if "webapps-db" in line:
                uuid_match = re.search(r'([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})', line)
                if uuid_match:
                    d1_id = uuid_match.group(1)
                    break

    if d1_id:
        print(f"\n[OK] 取得 D1 資料庫 ID: {d1_id}")
        if os.path.exists("wrangler.toml"):
            with open("wrangler.toml", "r", encoding="utf-8") as f:
                c = f.read()
            c = re.sub(r'database_id\s*=\s*"[^"]*"', f'database_id = "{d1_id}"', c)
            with open("wrangler.toml", "w", encoding="utf-8") as f:
                f.write(c)
            print("[OK] 已自動更新 wrangler.toml 中的 database_id！")
    else:
        print("[提示] 請確認 wrangler.toml 內的 database_id 設定。")

    # 3. 匯入資料表與初始資料
    print("\n[3/4] 匯入資料表結構 (schema.sql) 至遠端 D1...")
    subprocess.run("npx wrangler d1 execute webapps-db --remote --file=./schema.sql --yes", shell=True)

    # 4. 部署 Worker API
    print("\n[4/4] 部署 Worker API 至 Cloudflare...")
    subprocess.run("npx wrangler deploy", shell=True)

    print("\n=======================================================")
    print("  部署完成！跨裝置 Cloudflare D1 同步 API 已就緒。")
    print("=======================================================\n")

if __name__ == "__main__":
    main()
