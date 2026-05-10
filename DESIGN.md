---
name: Artisk
description: AI-powered brand system platform — builds, manages, and evolves visual brand systems.
colors:
  artisk-green: "#EBFBD1"
  artisk-dark: "#0A0F0C"
  orb-lime-bright: "#c8f06b"
  orb-lime-muted: "#a5e055"
  white-glass: "rgba(255, 255, 255, 0.55)"
  white-glass-header: "rgba(255, 255, 255, 0.6)"
  white-glass-light: "rgba(255, 255, 255, 0.45)"
  text-primary: "rgba(0, 0, 0, 0.85)"
  text-secondary: "rgba(0, 0, 0, 0.55)"
  text-tertiary: "rgba(0, 0, 0, 0.35)"
  border-subtle: "rgba(0, 0, 0, 0.05)"
  border-image: "rgba(0, 0, 0, 0.06)"
typography:
  display:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(40px, 8vw, 64px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(30px, 5vw, 36px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Roboto, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  sm: "12px"
  md: "16px"
  lg: "28px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  2xl: "112px"
components:
  button-primary:
    backgroundColor: "#0A0F0C"
    textColor: "#FFFFFF"
    rounded: "9999px"
    padding: "12px 24px"
  glass-card:
    backgroundColor: "rgba(255, 255, 255, 0.55)"
    rounded: "12px"
  glass-header:
    backgroundColor: "rgba(255, 255, 255, 0.6)"
    rounded: "0px"
---

# Design System: Artisk

## 1. Overview

**Creative North Star: "Aurora Greenhouse"**

Artisk 的界面是一间极光温室。纯白为底，如同温室的玻璃穹顶；两颗巨大的叶绿素光斑漂浮在空间中，以生物般的节奏呼吸、游动，永不触碰。半透明的凝雾玻璃层叠其上 — `backdrop-filter: blur(20px)` 捕捉着光斑的余晖，`inset 0 1px 0 rgba(255,255,255,0.8)` 在每张卡片顶部凝聚高光，像玻璃表面凝集的水雾。

这是一个精确的有机系统：排版是 Roboto 的冷静网格，间距遵循 8px-12px-16px 的精确步长；而运动和氛围来自 framer-motion 的重阻尼弹簧物理和 CSS 八段不规则呼吸动画。秩序是骨骼，有机是肌肉。

**Key Characteristics:**
- 纯白底色，两颗绿色光斑飘浮游动，互不碰撞
- 凝雾玻璃卡片：半透 `0.55` alpha、20px blur、顶部白色高光
- 弹簧阻尼物理驱动所有交互（stiffness: 8–300, damping: 6–20, mass: 0.5–3）
- 滚动 scrubbing 驱动章节进出场（`useScroll` + `useSpring`）
- Roboto 单字族，636 字重级差建立层级

## 2. Colors

浅绿同色系在纯白上漂浮。绿色是氛围，不是信息。

### Primary
- **Artisk Dark** (`#0A0F0C`): 主按钮、深色强调。仅在 CTA 和寥寥几处使用，保持稀有。
- **Orb Lime Bright** (`#c8f06b`): 光斑 1，右上角 900px 大光晕。最亮的绿色锚点。
- **Orb Lime Muted** (`#a5e055`): 光斑 2，左上角 700px 光晕。稍暗，形成层次。

### Neutral
- **White Base** (`#fff`): 页面底色。干净的背景让光斑和玻璃有发挥空间。
- **White Glass** (rgba(255,255,255,0.55)): 卡片默认背景。刚好透出底下光斑。
- **White Glass Header** (rgba(255,255,255,0.6)): 导航栏，比卡片略不透明以确立层级。
- **White Glass Light** (rgba(255,255,255,0.45)): FAQ 条目等轻量玻璃面。
- **Text Primary** (rgba(0,0,0,0.85)): 标题和强调文字。
- **Text Secondary** (rgba(0,0,0,0.55)): 正文和描述。
- **Text Tertiary** (rgba(0,0,0,0.35)): 占位、辅助信息。
- **Border Subtle** (rgba(0,0,0,0.05)): 玻璃面的外框。
- **Border Image** (rgba(0,0,0,0.06)): 图片和嵌入式区域的外框。

### Named Rules
**The No-Black Rule.** 所有"黑色"文字都是 `rgba(0,0,0,0.85)`，不是 `#000`。所有边框都是淡黑透明而非实色灰。玻璃感源自透明度层级，不是色值本身。

## 3. Typography

**Font:** Roboto, with system-ui / Segoe UI / sans-serif fallback.

**Character:** 工业级精准但有温度。Roboto 的几何骨架配合 `-0.02em` 显示屏级 tracking，标题有呼吸感。字重级差 600 ↔ 400 清晰分开信息层级。

### Hierarchy
- **Display** (600, clamp(40px, 8vw, 64px), 1.1, -0.02em): Hero 主标题。永远只有一句。
- **Headline** (600, clamp(30px, 5vw, 36px), 1.2, -0.01em): Section 标题。从 display 下拉一级。
- **Body** (400, 14px, 1.6): 正文和描述。最大宽度 65ch。
- **Label** (600, 12px, 0.05em, uppercase): Section 标签（"CORE FEATURES"、"HOW IT WORKS"）。12px 全大写 + wider tracking = 结构信号。

### Named Rules
**The Single-Voice Rule.** 整个系统只用 Roboto。不用衬线装饰、不用 mono 代码块、不用手写体点缀。统一的字体让排版成为一个安静可信的容器。

## 4. Elevation

Artisk 的深度不来自投影，来自透明度。玻璃面通过叠加和模糊制造 z 轴：导航栏 (0.6 alpha) 在卡片 (0.55) 之上，卡片在光斑之上。投影极轻 (`0 1px 2px rgba(0,0,0,0.02)`)，只提供微弱的"抬起"暗示，不是主要的深度手段。

### Shadow Vocabulary
- **ambient-card** (`0 1px 2px rgba(0,0,0,0.02), 0 4px 16px rgba(0,0,0,0.04)`): 玻璃卡片默认投影。微不可察，只提供一点点分离。
- **ambient-card-hover** (`0 2px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.08)`): hover 态，投影加深并扩散。
- **inset-highlight** (`.glass-card` 的 `inset 0 1px 0 rgba(255,255,255,0.8)`): 卡片顶部白色高光。这是玻璃拟态的核心 — 模拟边缘折射。

### Named Rules
**The Depth-by-Transparency Rule.** 如果元素需要比另一个元素"高"，给它更白的背景和更大的 blur，而不是更深的投影。投影只做最后的精调。

## 5. Components

所有组件由 framer-motion `useScroll` + `useSpring` 驱动滚动进出场。交互由 `whileHover` + `whileTap` 配合弹簧过渡处理。

### Buttons
- **Shape:** 完全圆角胶囊 (9999px)
- **Primary:** Artisk Dark (`#0A0F0C`) 背景，白色文字，12px 24px padding。hover 时 `y: -2px` + 投影扩散。tap 时 `y: 0`。过渡用轻弹簧 (stiffness: 300, damping: 20, mass: 0.5)。

### Glass Cards
- **Corner Style:** 12px 圆角
- **Background:** `rgba(255,255,255,0.55)` + `backdrop-filter: blur(20px)`
- **Border:** 1px `rgba(0,0,0,0.05)`
- **Internal Highlight:** `inset 0 1px 0 rgba(255,255,255,0.8)` — 凝雾玻璃的灵魂
- **Hover:** 上浮 4-6px（质量 1.5 的弹簧），投影从 ambient-card 过渡到 ambient-card-hover
- **Internal Padding:** 20-24px

### Navigation
- **Glass Header:** 固定顶部，`rgba(255,255,255,0.6)` + `blur(20px)`。边框 `rgba(0,0,0,0.05)`。进入时从 `y: -80` 弹簧弹入。
- **Links:** 13px medium，`text-secondary` 默认 + `text-primary` hover。

### FAQ Items
- **Shape:** 16px 圆角
- **Background:** `rgba(255,255,255,0.45)` + `blur(12px)`，hover 时到 `0.7`
- **Summary:** 14px 600 weight，原生 `<details>` 元素。toggle 图标旋转 45° 展开。

### Hero Images
- **Shape:** 12px 圆角，细边框
- **Animation:** 由 `useScroll` scrubbing 驱动，左右两列随滚动进度滑出视口
- **Layout:** 3 行 × 3 列，2 竖 1 横交替排列

### Background Orbs
- **Nature:** 2 个 `position: fixed` 光斑，各自在独立区域 (左上 / 右上) 随机游走，永不碰撞
- **Movement:** framer-motion 弹簧游走 (stiffness: 8, damping: 6, mass: 3 — 超重慢漂)，每 6 秒换目标
- **Breathe:** CSS `@keyframes`，8 段不规则关键帧，scale ±14%、opacity 0.06↔0.65，缩小才变暗
- **Blend:** `mix-blend-mode: screen` 融入白底

## 6. Do's and Don'ts

PRODUCT.md 禁止了传统 SaaS 奶油风、AI 陈词滥调的紫色渐变、企业软件的"安全"风和过度装饰的 Crypto/web3 风。这些在此沿用。

### Do:
- **Do** 用透明度层级代替深色投影，深度来自玻璃层叠
- **Do** 保持排版单调 (Roboto only)，让字体成为安静的结构容器
- **Do** 动效用弹簧阻尼 (framer-motion spring)，不用 ease-in-out 或 linear
- **Do** 滚动进度绑定 scrubbing，动画是滚动位置的反函数，不是自动播放
- **Do** `rgba(0,0,0,0.85)` 作为最深文字，`rgba(0,0,0,0.05)` 作为最淡边框。永远不是纯黑

### Don't:
- **Don't** 用蓝色 CTA 或紫色渐变 — AI-category 陈词滥调
- **Don't** 用 `border-left` / `border-right` > 1px 做彩色装饰条纹
- **Don't** 给文字上渐变色 (`background-clip: text` gradient)
- **Don't** 用实色投影 (box-shadow > 0.1 opacity) — 深度来自透明度
- **Don't** 多个相同尺寸的图标+标题+文字卡片网格 — 每个 section 布局应不同
- **Don't** 模态弹窗作为第一选择 — 所有交互优先内联或渐进
