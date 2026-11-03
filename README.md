# 星沙 · Stardune

**Stardune** is an open-source, [shadcn/ui](https://ui.shadcn.com)-compatible component registry (`@stardune`) that draws UI with a seeded ink engine on sand-paper surfaces — night indigo, rose accent, star gold. The mood nods to *The Little Prince* (watercolor travel, desert sky); artwork and naming here are **original**, not official book assets.

The ink **engine** is adapted from [Looseleaf](https://github.com/kevintngo/looseleaf) (MIT). Tokens, recipes, and components are Stardune’s own. See [NOTICE](./NOTICE) and [docs/ENGINE.md](./docs/ENGINE.md).

## Quick start (this repo)

```bash
npm install
npm run dev      # http://127.0.0.1:4317
npm run typecheck
```

## Install sketch (consumer app)

After publishing or hosting `public/r/`:

```bash
npx shadcn@latest add @stardune/button
```

Point `components.json` at your registry base URL (placeholder in [registry.json](./registry.json)).

## Layout

```
src/lib/ink/          Ink engine + Stardune recipes
src/components/ui/    Radix/CVA components
src/styles/           theme.css (--sd-*), ink-state.css
public/r/             Registry item JSON (stub)
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite playground |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run registry:check` | Verify registry file paths |

Recent visual polish for the sample Button and playground is noted in [CHANGELOG.md](./CHANGELOG.md).

## License

MIT — Stardune contributors. Looseleaf engine portions retain Looseleaf’s MIT notice in [NOTICE](./NOTICE).

---

# Stardune (English)

Open shadcn registry **`@stardune`** with CSS tokens prefixed **`--sd-`**. One sample **Button** demonstrates `InkProvider` → `useInk` → `button-ink` recipe → layered SVG. Full component set is not in scope yet; extend `src/lib/ink/recipes/` and `public/r/` using the same pattern.
