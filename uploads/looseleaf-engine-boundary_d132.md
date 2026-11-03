# Looseleaf 引擎边界（可复用 vs 必须自建）

源码：`/workspace/looseleaf-ref`（`https://github.com/kevintngo/looseleaf`，MIT，Copyright 2026 Looseleaf contributors）  
约束：只借技术与渲染引擎；**不**复用 token / 配色 / Kevin Sans / 贴纸等资产。

## 架构一句话

每个手绘表面 = 宿主 DOM（Radix/`data-slot`）+ 背后一层 `<svg data-ink>`。  
描边由**带种子的纯 TS recipe**生成；颜色走 `var(--ll-*)`；hover/press/focus 等状态由 **CSS 显隐预绘 layer**，不是 React 重画。

---

## 可复用（技术 / 引擎）

| 路径 | 角色 |
|------|------|
| `src/lib/ink/rng.ts` | 种子化 RNG / hash |
| `src/lib/ink/noise.ts` | 笔迹 wobble 噪声 |
| `src/lib/ink/geom.ts` | 路径 densify / spline / PathWriter / tier 精度 |
| `src/lib/ink/types.ts` | PenSpec、Layer、Tier 等类型 |
| `src/lib/ink/pen.ts` | 笔迹 ribbon 几何 → SVG path（核心画笔） |
| `src/lib/ink/pens.ts` | 笔种参数表（felt/pencil/marker 物理；**换色键即可**） |
| `src/lib/ink/paint.ts` | PaintKey → CSS var 映射 API（**键名/前缀需自换**） |
| `src/lib/ink/fills.ts` | wash / bandFill / blobFill 等填充原语 |
| `src/lib/ink/shapes.ts` | box / underline / focusRing 等形状原语 |
| `src/lib/ink/builder.ts` | `Ink` 画布：layer/part、出 SVG 字符串 |
| `src/lib/ink/recipes/index.ts`（仅 `defineRecipe` / `runRecipe` / knobs / bucketBox） | recipe 协议与运行时 |
| `src/lib/ink/react/provider.tsx` | `InkProvider`（tier/density/knobs/defs） |
| `src/lib/ink/react/hooks.ts` | `useInk` / `useInkCore` / seed / ResizeObserver |
| `src/lib/ink/react/svg.tsx` | `InkSvg`：把 frame layers 挂到宿主 |
| `src/lib/ink/react/cache.ts` | frame 缓存 |
| `src/lib/ink/react/defs.tsx` + `ensure-defs.ts` | 共享 grain mask defs |
| `src/lib/ink/textures.ts` + `textures*.generated.ts` | grain/paper tile **管线**（tile 位图内容建议自烘焙） |
| `src/lib/ink/art/dsl.ts` + `art/types.ts` | 路径 DSL 解析（画图标的工具层，非 Stubby 资产） |
| `src/lib/utils.ts` | `cn`（clsx+twMerge） |
| `tools/registry*.mjs` + `tools/registry/` | shadcn registry 扫描/打包/校验 |
| `components.json` 结构、`data-slot` / Radix / CVA 约定 | 组件分发与 API 兼容模式 |
| `src/styles/looseleaf.css` 中 **约 666–940 行** `svg[data-ink] [data-layer=…]` 状态机 | 引擎态 CSS（**去掉 `--ll-*` 色值与 Kevin 字体后可改编**） |

**模式可复用、内容不可抄：** `defineRecipe` + `useInk({ recipe, params, kind, seed })` 接线方式；各 `*-ink.ts` 只当写法参考。

---

## 必须自建（视觉 / 品牌 / 资产）

| 路径 / 类别 | 原因 |
|-------------|------|
| `src/styles/looseleaf.css` 的 `:root` `--ll-*` 色板与 shadcn 语义别名 | Looseleaf 本本纸/马克笔品牌色 |
| `src/styles/fonts.css`、`src/styles/fonts/KevinSans-*.woff2`、`public/fonts/`、`assets/fonts-ttf/` 里 Kevin/手写展示字体 | Kevin Sans 与品牌手感（IBM Plex Mono 可另议 OFL，但非「小王子」主视觉） |
| `src/lib/ink/recipes/*-ink.ts`（除 `recipes/index.ts` 协议外） | 编码本本圆角、虚线框、马克笔填充等「笔记本外观」 |
| `src/components/ui/*.tsx` 里绑定上述 recipe 的 class/token（`font-hand`、`--ll-*`、pencil/paper 语义） | 组件皮是他们的；可只学 Radix/`data-slot`/CVA 骨架后重写 |
| `src/lib/ink/art/stickers/**`、`doodles/**`、`icons/**`、`mascots/**`（Stubby）、`scenes/**`、`badge-gen`、`rubber-stamp` 等具体图形 | 贴纸/涂鸦/吉祥物资产 |
| `src/lib/ink/paper/stocks.ts`、faces、edges 等偏 kraft/pad/graph 的纸材配方 | 本本纸对象美学 |
| `src/lib/ink/typography-tiles.generated.ts` | 与 Kevin 字贴图相关 |
| docs/blocks 演示、OG、mascot 示例 | 品牌站点内容 |
| 任何「小王子」官方角色名/原书插图 | IP；需原创水彩/星球/玫瑰气质资产 |

`paint.ts` / `pens.ts`：**可 fork API**，但默认 PaintKey 名与指向的 `--ll-*` 必须换成自有 token（如 `--pp-*`）。

---

## 组件接引擎的最小调用链（以 Button 为例）

1. App 包 `<InkProvider>`（注入 knobs/tier/density + 可选 defs）  
2. `Button` → `useInk({ recipe: buttonRecipe, params, kind: "button", seed })`  
3. `useInkCore` 量宿主盒、算 seed、按需懒绘 focus/pressed → `inkFrame(recipe, …)`  
4. `runRecipe` / `Ink` builder + `pen`/`shapes`/`fills` → 各 `data-layer` 的 SVG 片段  
5. `InkSvg` 以绝对定位 `<svg data-ink="button">` 叠在宿主下  
6. CSS：`svg[data-ink] [data-layer=hover|pressed|focus|…]` 随 `:hover` / `:active` / `:focus-visible` / `disabled` 显隐  
7. 填色/描边颜色 = recipe 内 `paint('marker')` → `var(--ll-marker)`（新库换成自有 var）

---

## 建议的新库目录骨架

```
prince-ui/   # 自命名
  src/lib/ink/{rng,noise,geom,pen,pens,paint,fills,shapes,builder,types,textures}.ts
  src/lib/ink/react/{provider,hooks,svg,cache,defs}.tsx
  src/lib/ink/recipes/{index.ts,button-ink.ts,...}   # 全新小王子风 recipe
  src/components/ui/{button,input,...}.tsx           # Radix+CVA，接 useInk
  src/styles/{theme.css, ink-state.css, fonts.css} # 自有 token；状态机改编自 looseleaf
  tools/registry/                                    # 改编 registry 管线
  public/r/  registry.json
```

---

## 许可证

- **MIT**：fork 引擎代码须在副本中保留 `Copyright (c) 2026 Looseleaf contributors` 与 MIT 全文（或 NOTICE）。  
- 自有 recipe/token/字体/插画用自己的版权声明即可。  
- README 写明：基于 Looseleaf ink 引擎思路/代码改编，**视觉与资产独立**。  
- IBM Plex Mono 若保留：SIL OFL 1.1 另附。

---

## 风险 / 坑

1. **Token 前缀耦合**：引擎硬编码 `--ll-*`、`ll-` mask id、`data-ll-scope`；换皮要全局改前缀，否则 CSS/SVG 对不上。  
2. **Recipes ≈ 视觉**：只抄引擎却原样带上 `button-ink.ts` 仍是 Looseleaf 脸；小王子风必须重写 recipe（水彩边、更软的 wobble、沙漠/夜空色）。  
3. **状态在 CSS**：漏改编 `svg[data-ink] [data-layer…]` 规则会出现「画了但永远看不见 hover」。  
4. **SSR/种子**：`useId` 作默认 seed；跨端一致需显式 `seed`。  
5. **性能**：每组件 SVG + ResizeObserver；密度 `calm` / `tier` 控制复杂度，新库需保留。  
6. **Registry 体积**：`registry.json` 会内联源码；改 namespace/`@your-ns` 与 theme 依赖字段。  
7. **IP**：风格致敬 ≠ 使用官方小王子形象；命名与素材保持原创。  
8. **辨识度**：即便 MIT 允许，整包 Kevin Sans + Stubby + 现成 recipe 会与 Looseleaf 撞脸，也违背「只用引擎」约束。
