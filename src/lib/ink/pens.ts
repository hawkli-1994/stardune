import type { PaintKey } from '@/lib/ink/paint'
import type { Accent, BasePenName, PenName, PenSpec } from '@/lib/ink/types'

const BASE: PenSpec = {
  kind: 'felt',
  color: 'ink',
  grain: 'felt',
  cls: 'std',
  W: 1.55,
  alpha: 0.9,
  wob: { amp: 0.72, wl: 88, tr: 0.14 },
  step: 1.7,
  halo: 0,
  bleed: 1,
  core: 0.28,
  pool: 1,
  feather: 0,
  skip: 0,
  swell: 0.35,
  dir: 0,
  dryAmt: 0,
  dryWl: 7,
  gaps: 0,
  dens: 0.45,
  taper: 1,
  smear: 0,
  waxy: false,
  nib: 0,
  edge: 0.18,
  wet: 0.18,
  cutK: 0.2,
}

const inkFine = (color: PaintKey, o: Partial<PenSpec> = {}): PenSpec => ({
  ...BASE,
  kind: 'felt',
  grain: 'felt',
  color,
  W: 1.35,
  alpha: 0.92,
  wob: { amp: 0.55, wl: 100, tr: 0.1 },
  step: 1.5,
  halo: 0.1,
  bleed: 0.85,
  core: 0.32,
  feather: 0.35,
  skip: 0.2,
  swell: 0.22,
  ...o,
})

const felt = (color: PaintKey, o: Partial<PenSpec> = {}): PenSpec => ({
  ...BASE,
  kind: 'felt',
  grain: 'felt',
  color,
  halo: 0.12,
  bleed: 1,
  core: 0.34,
  pool: 1,
  feather: 0.45,
  skip: 0.25,
  swell: 0.38,
  dir: 0.04,
  ...o,
})

const pencil = (color: PaintKey, o: Partial<PenSpec> = {}): PenSpec => ({
  ...BASE,
  kind: 'pencil',
  grain: 'graphite',
  color,
  W: 1.4,
  alpha: 0.88,
  wob: { amp: 0.5, wl: 120, tr: 0.1 },
  step: 1.2,
  smear: 0.2,
  dens: 0.42,
  ...o,
})

const wash = (color: PaintKey, o: Partial<PenSpec> = {}): PenSpec => ({
  ...BASE,
  kind: 'marker',
  grain: 'marker',
  color,
  W: 8,
  alpha: 0.48,
  nib: -0.6,
  edge: 0.26,
  wet: 0.28,
  bleed: 0.95,
  wob: { amp: 0.85, wl: 95, tr: 0.08 },
  step: 2,
  cutK: 0.24,
  ...o,
})

const FELTS: Record<'ink' | 'horizon' | 'rosefelt' | 'baobabfelt' | 'focus', PenSpec> = {
  ink: felt('ink'),
  horizon: felt('horizon', { W: 1.65, wob: { amp: 0.78, wl: 82, tr: 0.15 } }),
  rosefelt: felt('rose', { W: 1.6, alpha: 0.88 }),
  baobabfelt: felt('baobab', { W: 1.6, alpha: 0.88 }),
  focus: felt('focus', { W: 2, alpha: 0.94, wob: { amp: 0.8, wl: 75, tr: 0.14 }, halo: 0.14 }),
}

const PENCILS: Record<'pencil' | 'rose' | 'baobab' | 'ember' | 'horizonPencil', PenSpec> = {
  pencil: pencil('pencil'),
  rose: pencil('rose', { alpha: 0.86, smear: 0.24, waxy: true }),
  baobab: pencil('baobab', { alpha: 0.86, smear: 0.22, waxy: true }),
  ember: pencil('ember', { alpha: 0.86, smear: 0.26, waxy: true }),
  horizonPencil: pencil('horizon', { W: 1.35, alpha: 0.84, smear: 0.22, waxy: true }),
}

function withClass(p: PenSpec, cls: 'fine' | 'brush'): PenSpec {
  if (p.kind === 'felt') {
    return cls === 'fine'
      ? { ...p, cls, W: p.W * 0.68, alpha: Math.min(0.96, p.alpha + 0.02), wob: { amp: p.wob.amp * 0.7, wl: p.wob.wl * 1.2, tr: p.wob.tr * 0.6 }, step: 1.5, halo: p.halo * 0.55, bleed: p.bleed * 0.6, core: p.core * 0.8, pool: p.pool * 0.7, feather: p.feather * 0.4, skip: p.skip * 0.4, swell: 0.16, dir: 0, dens: 0.28 }
      : { ...p, cls, W: p.W * 1.85, alpha: p.alpha - 0.02, wob: { amp: p.wob.amp * 1.05, wl: p.wob.wl * 1.05, tr: p.wob.tr * 0.75 }, step: 2, halo: p.halo * 0.85, bleed: p.bleed * 1.15, core: p.core * 1.05, pool: p.pool * 1.1, feather: p.feather * 1.05, skip: 0.12, swell: 0.72, dir: 0.32, dryAmt: 0.45, dryWl: 7, gaps: 0.4, dens: 0.75, taper: 1.4 }
  }
  return cls === 'fine'
    ? { ...p, cls, W: p.W * 0.68, alpha: p.alpha * 0.92, smear: p.smear * 0.8, wob: { ...p.wob, amp: p.wob.amp * 0.8 }, step: 1.05 }
    : { ...p, cls, W: p.W * 1.75, alpha: p.alpha * 0.86, smear: p.smear * 1.3, dir: 0.12, dryAmt: 0.2, step: 1.5 }
}

const ACCENTS: readonly Accent[] = ['wash-rose', 'wash-gold', 'wash-sky', 'wash-leaf', 'wash-violet', 'star', 'ember']

function build(): Record<PenName, PenSpec> {
  const out = {} as Record<PenName, PenSpec>
  const base: Record<BasePenName, PenSpec> = { ...FELTS, ...PENCILS }
  for (const k of Object.keys(base) as BasePenName[]) {
    out[k] = base[k]
    out[`${k}.fine`] = withClass(base[k], 'fine')
    out[`${k}.brush`] = withClass(base[k], 'brush')
  }
  out.wash = wash('rose-wash')
  out.star = wash('star', { W: 12, alpha: 0.42, kind: 'hl' })
  for (const c of ACCENTS) {
    out[`m_${c}`] = wash(c as PaintKey)
    out[`f_${c}`] = felt(c as PaintKey, { W: 1.5 })
  }
  out.red = out.rose
  out.green = out.baobab
  out.redfelt = out.rosefelt
  out.greenfelt = out.baobabfelt
  out.hi = out.star
  return out
}

export const PENS: Readonly<Record<PenName, PenSpec>> = build()

export function pen(p: PenName | PenSpec, over?: Partial<PenSpec>): PenSpec {
  const base = typeof p === 'string' ? PENS[p] : p
  if (!base) throw new Error(`ink: unknown pen "${String(p)}"`)
  return over ? { ...base, ...over, wob: { ...base.wob, ...over.wob } } : base
}
