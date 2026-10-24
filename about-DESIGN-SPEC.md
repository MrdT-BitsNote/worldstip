# WorldStip 旅行小册子 · About 页标准设计规范

> 规范状态：**已定稿（2026-09-30）**。此后对 `about.html` 的所有维护必须遵循本规范。
> **硬性约束：允许同步更新数据（统计数字、目的地索引、文案数值），严禁修改排版规则与页面设计结构**（布局、配色机制、组件样式、交互逻辑、章节骨架一律锁定）。

---

## 一、文件与定位

| 项 | 值 |
|---|---|
| 唯一正本 | `D:\Coze\Drive\旅行规划大师\小册子\about.html` |
| 线上地址 | `https://worldstip.com/about.html` |
| 页面标题 | `WorldStip 旅行小册子 · 关于我们` |
| 页面类型 | 单页品牌介绍 + 站点构成 + 设计规范 |
| 既有备份 | `about_old_20260930.html`（重做前版本，仅归档） |

---

## 二、整体设计语言（Apple 风格）

- **质感**：毛玻璃、圆角卡片、柔和阴影、留白充足，现代克制。
- **视觉变量**：全部颜色/尺寸走 CSS 变量（`:root` 定义），改动一律改变量，不散改具体值。
- **字体栈**：`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Arial`（`--font`）。

### 配色机制（时间驱动，锁定）

**页面配色由当前时间决定，不跟随系统深浅色**：

- `06:00 — 18:00`（含）→ **亮色**（`:root` 默认）
- 其余时段 → **暗色**（`:root.dark`）

实现（`<head>` 内一段内联 IIFE，已内置，勿改）：

```
var d = new Date(), hh = d.getHours();
var dark = (hh < 6 || hh >= 18);   // 06:00-18:00 亮色，其余暗色
document.documentElement.classList.toggle('dark', dark);
document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
```

- 亮色关键值：`--bg:#f5f5f7`、`--bg-soft:#fff`、`--ink:#1d1d1f`、`--accent:#0071e3`、`--accent-2:#5e5ce6`、玻璃 `rgba(255,255,255,.72)`。
- `:root.dark`：`--bg:#000`、`--bg-soft:#151517`、`--ink:#f5f5f7`、玻璃 `rgba(28,28,30,.7)`、阴影加深。
- 系统强调色：`--pink/--green/--orange/--teal/--purple/--red` 用于分类色块、licence 左边条等。

---

## 三、页面结构（章节骨架，锁定）

自上而下固定顺序，新增/删改章节需谨慎（删除某一节时须同步其 `<nav>`/TOC 对应项）：

1. **顶部跟随导航** `<header class="nav">`（sticky 毛玻璃）
   - 左：logo + 品牌 `WorldStip / 旅行小册子`（链接 `index.html`）
   - 中：锚点链接：故事 / 价值观 / 为谁而作 / 站点一览 / 站点构成
   - 右：`← 返回小册子`（链接 `index.html`）
2. ~~**右侧跟随目录**~~ `<aside class="toc">` —— **已移除（2026-09-30）**：不再有右侧竖排目录栏，其生成 JS 与滚动高亮驱动均已删除，**不得恢复**。
3. **HERO** `<header class="hero">`：kicker `About WorldStip` + 大标题 + 副文案 + 往下翻指引
4. **宣言** `<section class="manifesto">`：Our Manifesto + 引语 + 署名
5. **品牌故事** `<section id="story">`：eyebrow `Our Story` + 3 张故事卡（card, `num → ico → h3 → p`）
6. **价值观** `<section id="values">`：eyebrow `What We Value` + 4 行（值图标 + h4 + 说明）
7. **为谁而作** `<section id="audience">`：eyebrow `Who It's For` + 左右两栏（For Travelers / What You Get，各一条 ul）
8. **站点一览** `<section id="glance">`：eyebrow `At a Glance` + 4 个统计格（目的地子页 / 省份地区 / 主题分类 / 区域直达）+ 主题色分类 chips
9. **站点构成** `<section id="inside">`：eyebrow `What's Inside` + 6 张构成卡 + **版权声明**（License）+ **设计规范**（How It's Made，页内展示规范摘要）
10. **CTA** `<section class="cta">`：下一站，去哪？ + `翻开旅行小册子 →`（链接 `index.html`）
11. **页脚** `<footer class="foot">`：署名（见下）
12. **脚本**：导航/滚动高亮 IIFE（仅驱动顶部 `.nav`，右侧 TOC 逻辑已删）

> `</div><!-- .wrap -->` 闭合后接两段 `<script>`，结构勿乱。

---

## 四、目的地索引（整站导航模块，已移除，锁定）

- **页面上不再保留「目的地索引 / Destination Index」任何区块**（原 `<section id="index">` 及 `.btn.idx-go` 按钮均已删，2026-09-30）。
- **顶部 `<nav>` 与右侧 TOC 中对应锚点均已移除**，不得恢复。
- 原 `DATA` 数据脚本、渲染 JS、索引 CSS 全部清理；目的地增减一律收敛到 `worldstip-sitemap.html` 维护。
- 整站导航入口改由小册子 **`index.html` 书侧「整站导航」卡片**（`🗺️ 整站导航 · 9 区域 · 211 城`，`.smnav`，超链 `worldstip-sitemap.html`）承担。

---

## 五、页脚（锁定文案与链接）

- 唯一保留一行署名：
  `MADE WITH CARE BY MrdT · 旅行小册子 · worldstip.com`
- **MrdT 为超链接**，跳转 `https://bitsnote.com`（`target="_blank" rel="noopener noreferrer"`）。
- `worldstip.com` 为超链接，跳 `https://worldstip.com`。
- **已删除**：`本页数据为静态统计，随每次发布刷新` 等辅助文案，**不得恢复**。

---

## 六、更新日志（已移除，锁定）

- **页面上不再保留「更新日志」区块**（原 `#news` section 已删）。
- `<nav>` 也**不保留更新日志锚点**。
- SEO 结构化数据（JSON-LD 等）中与更新日志相关的项已同步移除，保持一致即可，**勿加回**。

---

## 七、数据统计口径（写 about 时以 D 盘正本实测为准）

维护 about 时涉及以下数字，改动数据后须同步校对（当前值，2026-09-30）：

| 统计项 | 值 |
|---|---|
| 目的地子页（glance / audience / inside） | 211 |
| 省份/地区 | 20+ |
| 大主题分类 | 7 |
| 大区域直达 | 9 |
| 自然山水 | 66 |
| 城市都市 | 77 |
| 历史人文 | 29 |
| 海滨海岛 | 15 |
| 主题乐园 | 11 |
| 休闲度假 | 8 |
| 主题线路 | 11 |
| 港澳台 4 + 海外 3 | 7 |

---

## 八、响应式与可访问性（锁定）

- 断点：`900px`（网格/价值观/构成收窄）；`640px`（单列、nav 品牌小字隐藏、hero 上移）。
- 打印：隐藏 `.nav/.hero .scroll/.cta`；卡片避免分页断开。
- 交互：锚点平滑滚动 `scroll-behavior:smooth`、顶部导航滚动高亮（当前章节加粗/着色）。

---

## 九、维护动作速查

- **改一个数字**：只动对应统计格/chips/文案数值，不改卡。若影响 `glance`/`audience`/`inside` 多处，三处一起改，并核对「站点构成」卡片。
- **主题/配色**：只改 `:root` / `:root.dark` 变量，不触碰时间判断逻辑。
- **任何改动后**：
  1. 校验 `<div>/</div>` 平衡（当前健康基线 99/99，删索引/右侧 TOC 后更新）；
  2. headless Edge 截图三态验证（真实实时 / 强制白天 / 强制夜晚），无破版；
  3. 若有 SEO 影响（URL 集不变则无需动 sitemap），保持 OG/canonical/JSON-LD 一致。
- **严禁**：改回双重转义 DATA；恢复更新日志区块或导航锚点；恢复右侧 TOC 或目的地索引区块；改回跟随系统深浅色；恢复页脚辅助文案；恢复顶部"目的地索引"入口。
---

## 十、2026-10-24 结构调整：全站矩阵 + 紧凑化（覆盖上文冲突条款）

> 本节为**最新有效结构**，与上文第三节旧骨架冲突处，以本节为准。其余设计语言（时间驱动深浅色、CSS 变量、毛玻璃、圆角、字体栈）**保持不变**。

### 1. 变更内容
| 项 | 变更前 | 变更后 |
|---|---|---|
| `#dir` 章节 | 巨型横幅（84px "Dir" 大字，约 400px 高） | **已移除** |
| `#ai` 章节 | 金黑大卡（84px 图标 + 大标题 + 标签组，约 500px 高） | **改为单行条** `.ai-strip`（约 70px 高） |
| 新增 `#sites` | — | **全站矩阵**：四张紧凑卡片 `moto / agent / fun / dir` |
| 页面顺序 | hero → ai → dir → values → glance → inside → since → cta | hero → **sites** → ai → values → glance → inside → since → cta |
| 导航锚点 | AI 规划 / 理念 / 站点一览 / 站点构成 | **全站矩阵 / AI 规划 / 理念 / 站点一览 / 站点构成** |

### 2. 四站矩阵数据（唯一来源：各子站 title/description）
| 卡片 | 名称 | 副标 | 链接 | 指标 |
|---|---|---|---|---|
| 🏍️ | 摩托行 | MOTO | `https://moto.worldstip.com/` | 31 省区 · 1658 条实测路线 |
| 🤖 | Agent | AI PLANNER | `https://agent.worldstip.com/` | 千问技能 · 技能主页与更新 |
| 🍜 | Fun | FOOD & CITY | `https://fun.worldstip.com/` | 389 城 · 32.9 万 POI |
| 🧭 | Dir | DIRECTORY | `https://dir.worldstip.com/` | 9 个站点 · 一个入口 |

### 3. 组件与紧凑化参数
- `.site-grid`：4 列（≤900px 2 列，≤640px 1 列）；`.site-card` 用 `--ac`（强调色）与 `--ac-soft`（图标底色）自定义属性。
- 垂直节奏压缩：`.hero` 上内距 64→44px；`.sec-head` 52/26→34/18px；`.v-row` 20/22→15/17px；`.stat` 26/18→19/12px；`.ins-card` 22/20→16/16px；`.cta` 34/30→26/24px。
- 移动端 `.stats` 改 **2×2**（原单列，过长）。
- 防溢出：网格子项 `min-width:0`；`.site-desc/.site-meta/.ins-sub/.v-row p/.cat` 加 `overflow-wrap:anywhere`。

### 4. 校验基线（本次）
- 标签闭合：0 未闭合、0 错误；区块 `#sites/#ai/#values/#glance/#inside/#since` 齐全；四站外链各 1 处。
- 桌面 1440px、平板 820px、移动 500px 三态截图无破版；`body.scrollWidth` 在 390px 约束下 = 390，无横向溢出。
- 文件体积 35.1KB → 31.6KB。

### 5. 备份
- 改前版本：`about_pre_sites_20261024.html`（仅归档，勿再引用）。
