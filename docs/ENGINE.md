# Ink engine boundary

Stardune reuses **Looseleaf’s MIT ink engine** (see [NOTICE](../NOTICE)) for seeded SVG strokes, layer caching, and CSS-driven ink states. Visual identity is independent: `--sd-*` tokens, recipes, and components are Stardune originals.

## Reused (under `src/lib/ink/`)

| Area | Role |
|------|------|
| `rng`, `noise`, `geom` | Seeded randomness and path geometry |
| `pen`, `pens`, `paint`, `fills`, `shapes`, `builder` | Stroke generation and SVG assembly |
| `recipes/index.ts` | `defineRecipe` / `runRecipe` protocol |
| `react/*` | `InkProvider`, `useInk`, `InkSvg`, defs/cache |
| `textures*.ts` | Grain/paper tile pipeline (Stardune-mapped colors) |
| `art/dsl.ts`, `art/types.ts` | Path DSL for future icon tooling |

## Stardune-owned

- `src/styles/theme.css`, `ink-state.css`, `stardune.css`
- `src/lib/ink/recipes/*` (except protocol in `index.ts`)
- `src/components/ui/*`
- All `--sd-*` paint keys in `paint.ts` / `pens.ts`

## Wiring (button)

1. App wraps content in `<InkProvider>`.
2. Component calls `useInk({ recipe, params, kind, seed })`.
3. Recipe draws layers via `Ink` builder; `InkSvg` mounts `svg[data-ink]`.
4. `ink-state.css` toggles `[data-layer=hover|pressed|focus|…]` from host pseudo-states.

Reference clone (not shipped): `looseleaf-ref/` (gitignored).
