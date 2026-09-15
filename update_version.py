#!/usr/bin/env python3
"""
update_version.py
自動計算並更新專案版本編號。
規則：vYYYY.MM.DD.<build_count>
執行時會更新 version.json，並同步置換 index.html 與 app.js 中的版本號。
"""

import os
import re
import datetime
import subprocess
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
VERSION_JSON_PATH = os.path.join(BASE_DIR, "version.json")
INDEX_HTML_PATH = os.path.join(BASE_DIR, "index.html")
APP_JS_PATH = os.path.join(BASE_DIR, "app.js")

def get_git_commit_count():
    try:
        out = subprocess.check_output(["git", "rev-list", "--count", "HEAD"], cwd=BASE_DIR)
        return int(out.decode().strip())
    except Exception:
        return 1

def generate_new_version():
    today_str = datetime.date.today().strftime("%Y.%m.%d")
    git_count = get_git_commit_count()
    # 預期的下一個 build 編號 = 現有提交數 + 1
    next_build = git_count + 1

    # 如果有現存的 version.json，可讀取比對
    current_build = 0
    if os.path.exists(VERSION_JSON_PATH):
        try:
            with open(VERSION_JSON_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                current_build = int(data.get("build", 0))
        except Exception:
            pass

    build_num = max(next_build, current_build + 1)
    version_str = f"v{today_str}.{build_num}"

    version_data = {
        "version": version_str,
        "build": build_num,
        "updatedAt": datetime.date.today().isoformat()
    }

    # 1. 寫入 version.json
    with open(VERSION_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(version_data, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # 2. 更新 index.html 中的版本標籤
    if os.path.exists(INDEX_HTML_PATH):
        with open(INDEX_HTML_PATH, "r", encoding="utf-8") as f:
            html_content = f.read()

        # 置換 <span id="appVersionBadge">...</span> 或 <span class="version-badge"...
        new_html = re.sub(
            r'(<span[^>]*id=["\']appVersionBadge["\'][^>]*>)(.*?)(</span>)',
            rf'\g<1>{version_str}\g<3>',
            html_content
        )
        if new_html != html_content:
            with open(INDEX_HTML_PATH, "w", encoding="utf-8") as f:
                f.write(new_html)

    # 3. 更新 app.js 中的 APP_VERSION 常數
    if os.path.exists(APP_JS_PATH):
        with open(APP_JS_PATH, "r", encoding="utf-8") as f:
            js_content = f.read()

        new_js = re.sub(
            r'const APP_VERSION\s*=\s*[\'"][^\'"]*[\'"];',
            f"const APP_VERSION = '{version_str}';",
            js_content
        )
        if new_js != js_content:
            with open(APP_JS_PATH, "w", encoding="utf-8") as f:
                f.write(new_js)

    print(f"[Version Updated] -> {version_str} (Build #{build_num})")
    return version_str

if __name__ == "__main__":
    generate_new_version()
