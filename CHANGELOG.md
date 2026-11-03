# Changelog

## Unreleased

### Input & Card

- **`input-ink` / `Input`**: Sand-slip wash field, rose/pencil outline, hover rose-wash, **star + horizon focus** ring, invalid ember wash layer.
- **`card-ink` / `Card`**: Sand-slip panel with soft gold tint and **double loose border**; shadcn-style `CardHeader`, `Title`, `Description`, `Content`, `Footer`.
- Shared **`wash-utils.ts`** for layered watercolor fills; registry stubs `@stardune/input`, `@stardune/card`.

### Visual — Button & playground (星沙 polish)

- **Button ink**: Replaced marker-style `bandFill` strokes with layered **watercolor washes** (`rose-wash`, `wash-rose`, star/ember tints), softer loose outlines, and a **star-gold focus** halo plus horizon pencil ring.
- **Variants**: Primary reads as painted rose on sand; secondary as gold wash; outline/ghost/link use sand slip and horizon/rose washes instead of notebook fills.
- **Theme**: Slightly deeper rose and muted text for **AA contrast** on sand; explicit `destructive-foreground`.
- **Playground**: Sand-paper stage with abstract dune curves and star pattern, dark-mode toggle, and sections for variants, sizes, and disabled states.
