export type PaintKey =
  | 'ink' | 'ink-soft' | 'ink-muted' | 'pencil' | 'wash-ink'
  | 'sand' | 'sand-shade' | 'sand-slip' | 'card' | 'sky' | 'dune' | 'well'
  | 'rose' | 'rose-deep' | 'rose-wash'
  | 'star' | 'star-deep'
  | 'horizon' | 'horizon-deep'
  | 'baobab' | 'baobab-deep'
  | 'ember' | 'ember-deep' | 'danger'
  | 'wash-rose' | 'wash-gold' | 'wash-sky' | 'wash-leaf' | 'wash-violet'
  | 'line' | 'line-soft' | 'focus'
  | 'current'

export const PAINT_KEYS: readonly PaintKey[] = [
  'ink', 'ink-soft', 'ink-muted', 'pencil', 'wash-ink',
  'sand', 'sand-shade', 'sand-slip', 'card', 'sky', 'dune', 'well',
  'rose', 'rose-deep', 'rose-wash',
  'star', 'star-deep',
  'horizon', 'horizon-deep',
  'baobab', 'baobab-deep',
  'ember', 'ember-deep', 'danger',
  'wash-rose', 'wash-gold', 'wash-sky', 'wash-leaf', 'wash-violet',
  'line', 'line-soft', 'focus',
  'current',
]

const KNOWN = new Set<string>(PAINT_KEYS)

export const BLEND = 'var(--sd-blend)'

export function paint(key: PaintKey): string {
  if (key === 'current') return 'currentColor'
  if (!KNOWN.has(key)) throw new Error(`ink: unknown paint key "${key}"`)
  return `var(--sd-${key})`
}

export type Q = 10 | 20 | 100

export function fmtUnits(k: number, q: Q): string {
  if (k === 0) return '0'
  const neg = k < 0
  const a = neg ? -k : k
  const whole = Math.floor(a / q)
  const frac = a - whole * q
  let s = whole === 0 ? '' : String(whole)
  if (frac !== 0) {
    const digits = q === 10 ? 1 : 2
    const f = String(frac * (10 ** digits / q)).padStart(digits, '0').replace(/0+$/, '')
    s += '.' + f
  }
  return neg ? '-' + s : s
}

export function n(v: number, q: Q = 20): string {
  return Number.isFinite(v) ? fmtUnits(Math.round(v * q), q) : '0'
}

export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '"' ? '&quot;' : '&#39;'))
}
