# Changelog

## Unreleased

### Select, Switch, Radio Group

- **`select-ink`**: Trigger reuses `field-wash-frame` + **open** horizon wash; **`select-content`** sand-slip panel.
- **`switch-ink`**: Sand track, **baobab/rose** checked wash, separate **thumb** recipe.
- **`radio-ink`**: Circle outline; **rose/baobab** inner wash when selected; star/horizon focus.

### Textarea, Label, Checkbox

- **`field-wash-frame.ts`**: Shared sand-slip field ink for Input and Textarea (star/horizon focus, invalid/disabled).
- **`textarea-ink` / `Textarea`**: Multiline field with softer corner radius.
- **`checkbox-ink` / `Checkbox`**: Sand square; **baobab wash + hand check**; indeterminate **horizon** bar; Radix Checkbox.
- **`label-ink` / `Label`**: Typography-first Radix label; optional `inkLine` decorative underline only.

### Input & Card

- **`input-ink` / `Input`**: Sand-slip wash field, rose/pencil outline, hover rose-wash, **star + horizon focus** ring, invalid ember wash layer.
- **`card-ink` / `Card`**: Sand-slip panel with soft gold tint and **double loose border**; shadcn-style `CardHeader`, `Title`, `Description`, `Content`, `Footer`.
- Shared **`wash-utils.ts`** for layered watercolor fills; registry stubs `@stardune/input`, `@stardune/card`.

### Visual — Button & playground (星沙 polish)

- **Button ink**: Replaced marker-style `bandFill` strokes with layered **watercolor washes** (`rose-wash`, `wash-rose`, star/ember tints), softer loose outlines, and a **star-gold focus** halo plus horizon pencil ring.
- **Variants**: Primary reads as painted rose on sand; secondary as gold wash; outline/ghost/link use sand slip and horizon/rose washes instead of notebook fills.
- **Theme**: Slightly deeper rose and muted text for **AA contrast** on sand; explicit `destructive-foreground`.
- **Playground**: Sand-paper stage with abstract dune curves and star pattern, dark-mode toggle, and sections for variants, sizes, and disabled states.
