# 部署指南（DEPLOY.md）

本项目为**纯静态网站**（HTML+CSS+JS），托管在 GitHub Pages 免费空间。

## 1. 首次部署（已完成前验证，供重建参考）

### 方式 A：GitHub CLI（推荐）

```powershell
# 1) 安装 gh（若未装）
winget install --id GitHub.cli
# 2) 登录（按提示在浏览器完成）
gh auth login
# 3) 建仓并推送（在项目目录执行）
git remote add origin https://github.com/<你的用户名>/sicau-timeline.git
git push -u origin main
# 4) 开启 Pages（分支 main + 根目录）
gh api -X POST repos/<你的用户名>/sicau-timeline/pages -f "source[branch]=main" -f "source[path]=/"
```

### 方式 B：网页操作

1. 在 github.com 新建空仓库 `sicau-timeline`（不要勾选 README）。
2. 本地在项目目录：
   ```powershell
   git remote add origin https://github.com/<你的用户名>/sicau-timeline.git
   git push -u origin main    # 首次推送会弹出浏览器登录
   ```
3. 仓库 Settings → Pages → Source 选 `Deploy from a branch` → Branch `main` / `/ (root)` → Save。
4. 等待 1–2 分钟，访问 `https://<你的用户名>.github.io/sicau-timeline/` 。

## 2. 日常更新（发新版本）

```powershell
git add -A
git commit -m "data: 更新xxx"
git push
```

推送即自动重新发布（Pages 构建 1–2 分钟）。**无需任何编译步骤。**

## 3. 回滚方法

| 场景 | 操作 |
|---|---|
| 刚推的改动有问题 | `git revert HEAD` 生成反向提交后 `git push`（最安全） |
| 想回退多步 | `git log --oneline` 找到目标提交 → `git revert <commit>..HEAD` → push |
| 网页上快速回滚 | GitHub 仓库 → Commits → 找到某次提交 → "Revert" 按钮 → 自动开 PR/提交 |
| 灾难恢复 | 本地仓库还在就直接重新 `git push --force-with-lease`（警告：会覆盖远端历史，仅自己仓库可用） |

回滚后 Pages 同样需要 1–2 分钟生效；可用 Ctrl+F5 强刷验证。

## 4. 发布前检查清单

- [ ] `python tools/validate_data.py` 0 错误
- [ ] `python tools/check_app.py` 全过（控制台 0 报错、375px 无横滚、卡片数正确）
- [ ] `git status` 中没有 `research/`（第三方素材）与任何参考图
- [ ] 隐私扫描：无学号 / 身份证 / 手机号（`tools/` 里可复用扫描命令）
- [ ] 线上打开后 Ctrl+F5 与本地观感一致
