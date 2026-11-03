import type { PaintKey } from '@/lib/ink/paint'

export type Pt = [number, number]

export type BBox = [number, number, number, number]

export type Tier = 'hi' | 'lo'

export type Material = 'under' | 'wash' | 'hl' | 'marker' | 'pencil' | 'waxy' | 'text' | 'felt' | 'stamp' | 'top'

export type LayerName = 'rest' | 'hover' | 'pressed' | 'focus' | 'disabled' | 'invalid' | 'checked' | 'indeterminate' | 'open' | 'busy'

export type GrainKind = 'felt' | 'marker' | 'graphite' | 'waxy' | 'stamp'

export type PenKind = 'felt' | 'pencil' | 'marker' | 'hl'

export type WeightClass = 'fine' | 'std' | 'brush'

/** Watercolor accent washes used by optional marker pens */
export type Accent = 'wash-rose' | 'wash-gold' | 'wash-sky' | 'wash-leaf' | 'wash-violet' | 'star' | 'ember'

export type BasePenName =
  | 'ink'
  | 'horizon'
  | 'rosefelt'
  | 'baobabfelt'
  | 'focus'
  | 'pencil'
  | 'rose'
  | 'baobab'
  | 'ember'
  | 'horizonPencil'

/** Legacy Looseleaf pen ids kept so shared shape helpers typecheck */
export type LegacyPenName = 'red' | 'green' | 'greenfelt' | 'redfelt' | 'hi'

export type PenName =
  | BasePenName
  | `${BasePenName}.${'fine' | 'brush'}`
  | 'wash'
  | 'star'
  | LegacyPenName
  | `m_${Accent}`
  | `f_${Accent}`

export interface PenSpec {
  kind: PenKind
  color: PaintKey
  grain: GrainKind
  cls: WeightClass
  W: number
  alpha: number
  wob: { amp: number; wl: number; tr: number }
  step: number
  halo: number
  bleed: number
  core: number
  pool: number
  feather: number
  skip: number
  swell: number
  dir: number
  dryAmt: number
  dryWl: number
  gaps: number
  dens: number
  taper: number
  smear: number
  waxy: boolean
  nib: number
  edge: number
  wet: number
  cutK: number
}

export interface StrokeOpts {
  tier?: Tier
  wobble?: number
  speed?: number
  start?: 'pool' | 'soft'
  end?: 'pool' | 'flick' | 'soft'
  width?: number
  alpha?: number
  color?: PaintKey
  poly?: boolean
  round?: number
  raw?: boolean
  dry?: number
  press?: (t: number) => number
  simple?: boolean
}

export interface RibbonLayer {
  k: 'halo' | 'hair' | 'body' | 'core' | 'pool' | 'smear' | 'rim' | 'streak'
  d: string
  fill: PaintKey
  op: number
  rule?: 'evenodd'
}

export interface StrokeResult {
  kind: PenKind
  layers: RibbonLayer[]
  bbox: BBox
  len: number
  start: Pt
  end: Pt
}

export interface Line {
  pts: Pt[]
  o?: StrokeOpts
  pen?: PenName
}
