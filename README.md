# iTab-Home

专为效率与美观打造的轻量级个人新标签页与仪表盘（Startpage / Dashboard）。高保真复刻 iTab 风格，支持全套卡片小组件、个性化设置、多引擎搜索，并对 Vercel 部署进行零配置优化。

## ✨ 特性一览

1. **时钟与农历日期**：
   - 极简大字体实时数字时钟（秒级刷新）。
   - 公历、星期、农历日期计算（如 `9月7日 星期一 七月廿六`）。

2. **多引擎智能搜索**：
   - 默认集成必应（Bing）、谷歌（Google）、百度、B站（Bilibili）、GitHub、知乎搜索。
   - 毛玻璃药丸胶囊设计，支持快捷切换。

3. **核心卡片小组件**：
   - **i天气**：实时气温、天气状态、6天天气趋势条。
   - **下一个假期**：中秋节、国庆节、元旦等节假日剩余天数倒计时。
   - **股市行情**：深成指、上证指数、创业板指实时行情（红涨绿跌，符合国内习惯）。
   - **热搜榜**：精简保留**微博**与**知乎**热搜榜单，点击一键直达话题搜索。
   - **纪念日（你在世界已经）**：月球背景，自定义出生日期并动态计算存活天数。
   - **日历**：撕历风日历卡片，动态显示年、月、日、年内第几天、周次与农历。
   - **下班倒计时**：发薪/周五/节假日倒数，实时秒级递增计算“今天赚了多少钱 ¥”，搭配 3D 治愈橘猫吉祥物。
   - **电影日历**：每日经典电影推荐与豆瓣评分台词。

4. **快捷应用矩阵与 Dock**：
   - **常用工具网格 (6x2)**：设置、Chrome 应用、淘宝、京东、微博、扣子空间、豆瓣、同花顺、豆包 AI、小红书、引导、扩展管理。
   - **底部双排 Dock**：常用开发/社交/AI 站点（V2EX、Twitter、知乎、B站、YouTube、Gemini、Claude/ChatGPT、Linux.do、Cloudflare 等）及个人 Homelab 快捷入口（CPA Keeper、CLI Proxy API、Codex Usage 等）。
   - **添加图标**：随时自定义添加新网站或内网私有服务。

5. **个性化首选项（设置中心）**：
   - 壁纸切换：高清唯美动漫、原图截图背景、必应每日壁纸、自定义图床 URL。
   - 纪念日、下班时间、城市、月薪参数自定义。
   - 配置导出 / 导入备份（JSON 格式）。

---

## 🚀 部署到 Vercel

本项目已包含 `vercel.json`，纯静态 SPA 零配置即可部署：

1. 将当前项目初始化并推送到你的 GitHub：
   ```bash
   cd /Users/lynn/workspace/projects/iTab-Home
   git init -b main
   git add .
   git commit -m "feat: initial commit for iTab-Home"
   git remote add origin https://github.com/<你的用户名>/iTab-Home.git
   git push -u origin main
   ```
2. 登录 [Vercel](https://vercel.com/)，点击 **Add New Project**，导入该仓库。
3. Framework Preset 选择 **Vite**（默认自动识别），点击 **Deploy** 即可！

---

## 💻 本地开发与构建

```bash
# 进入目录
cd /Users/lynn/workspace/projects/iTab-Home

# 安装依赖
pnpm install

# 启动本地开发服务 (支持 HMR 热更新)
pnpm dev

# 生产环境打包
pnpm run build

# 本地预览构建产物
pnpm run preview
```

---

## 🛠️ 技术栈

- **框架**：[React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **样式**：[Tailwind CSS v4](https://tailwindcss.com/)
- **图标**：[Lucide React](https://lucide.dev/) + 高保真品牌 Vector SVGs
- **农历算法**：[lunar-javascript](https://6tail.cn/calendar/api.html)
- **存储**：`localStorage`（持久化用户配置，支持导入导出）
