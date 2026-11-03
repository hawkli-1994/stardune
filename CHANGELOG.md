# Changelog

## Unreleased

### Accordion, Collapsible

- **`disclosure-ink`**: Shared sand-slip **triggers** with pencil dividers; **open** layer rose/horizon underline; soft **content** wash; **accordion item** divider ink.
- **`accordion.tsx`**: Radix Accordion (Item, Header, Trigger, Content) with ink triggers and content panel.
- **`collapsible.tsx`**: Radix Collapsible trigger + content; accordion-style height animations in `stardune.css`.
- Registry stubs `@stardune/accordion`, `@stardune/collapsible`.

### Table, Dropdown Menu

- **`table-ink` / `Table`**: Sand-slip surface with soft **pencil/horizon row rules**; shadcn table parts (Header, Body, Row, Head, Cell, Caption).
- **`dropdown-menu-ink`**: Compact **sand-slip panel**; menu items with **rose hover/focus** wash ink; full Radix dropdown set.
- **`ink-state.css`**: `[data-highlighted]` shows menu item hover layer for keyboard focus.
- Registry stubs `@stardune/table`, `@stardune/dropdown-menu`.

### Sheet, ScrollArea, Sidebar

- **`sheet-ink` / `Sheet`**: Dialog-based slide-over with **dusk overlay** + lifted **sand-slip** panel (top/bottom/left/right).
- **`scroll-area-ink` / `ScrollArea`**: Radix scroll area with optional **rose/horizon thumb** wash ink.
- **`sidebar-ink` / `Sidebar`**: Sand-slip **rail** ink; `SidebarProvider`, `Trigger`, `Inset`, menu primitives (`--sd-sidebar-width*`).
- Registry stubs `@stardune/sheet`, `@stardune/scroll-area`, `@stardune/sidebar`.

### Avatar, Skeleton, Alert

- **`avatar-ink` / `Avatar`**: Soft circular **sand-slip double ring** (Radix Image/Fallback); no mascot art.
- **`skeleton-ink` / `Skeleton`**: Sand-shade base + **busy** shimmer layer; CSS respects `prefers-reduced-motion` and `data-motion="reduced"` (`ink-state.css`).
- **`alert-ink` / `Alert`**: Sand-slip panel with left accent — **rose** default, **baobab** success, **ember** warning/destructive, **horizon** info; `AlertTitle` / `AlertDescription`.
- Registry stubs `@stardune/avatar`, `@stardune/skeleton`, `@stardune/alert`.

### Tooltip, Toast, Separator

- **`panel-wash`**: `drawCompactSandSlipPanel` for small floating surfaces.
- **`tooltip-ink` / `Tooltip`**: Compact sand-slip panel; Radix Tooltip provider/trigger/content.
- **`toast-ink` / `Toast` + `Toaster`**: Radix Toast stack with `useToast()` helper (no sonner — matches `radix-ui` deps).
- **`separator-ink` / `Separator`**: Soft pencil + horizon rule ink; horizontal and vertical orientations.
- Registry stubs `@stardune/tooltip`, `@stardune/toast`, `@stardune/separator`.

### Slider, Progress, Badge

- **`slider-ink` / `Slider`**: Sand track, **rose/baobab** range wash, sand-slip thumb with **star focus** halo; Radix Slider (track, range, thumb recipes).
- **`progress-ink` / `Progress`**: Sand track + **rose/horizon** fill wash on the indicator; Radix Progress.
- **`badge-ink` / `Badge`**: Soft sand-slip pill; **rose** (default), **star** (secondary), **baobab** (destructive), outline sand frame; CVA variants.
- Registry stubs `@stardune/slider`, `@stardune/progress`, `@stardune/badge`.

### Dialog, Popover, Tabs

- **`panel-wash.ts`**: Shared sand-slip double-border panel (Card, Dialog, Popover).
- **`dialog-ink` / `Dialog`**: Dusk radial overlay (CSS) + lifted panel ink.
- **`popover-ink` / `Popover`**: Compact floating panel.
- **`tabs-ink` / `Tabs`**: Triggers with rose/horizon active underline wash (`data-state=active` → checked layer).

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
