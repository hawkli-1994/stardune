import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, focusRing } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import type { Ink } from '@/lib/ink/builder'
import type { RecipeContext } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface FieldFrameParams {
  disabled?: boolean
  invalid?: boolean
  readOnly?: boolean
}

export interface FieldFrameOptions {
  /** Smaller = rounder corners on tall boxes (textarea). Default 0.14 */
  radiusFactor?: number
}

export function drawFieldWashFrame(
  ink: Ink,
  w: number,
  h: number,
  { disabled, invalid, readOnly }: FieldFrameParams,
  ctx: RecipeContext,
  opt: FieldFrameOptions = {},
) {
  const rf = opt.radiusFactor ?? 0.14
  const r = clamp(Math.min(w, h) * rf, 3.5, 10)
  const inset = 0.55
  const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)

  if (disabled) {
    if (ctx.lazyOnly) return
    ink.layer('disabled', () => {
      wash(ink, body, 'sand-shade', { alpha: 0.48, wobble: 0.45, material: 'wash' })
      box(ink, 0.5, 0.5, w - 1, h - 1, {
        pen: 'pencil.fine',
        corner: r,
        loose: 0.35,
        opts: { alpha: 0.35, simple: true },
      })
    })
    return
  }

  if (invalid) {
    ink.layer('invalid', () => {
      softFill(ink, body, [
        { color: 'wash-rose', alpha: 0.35, wobble: 0.8 },
        { color: 'ember', alpha: 0.18, inset: 0.6 },
      ])
      box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
        pen: 'rose.fine',
        corner: r,
        loose: 1,
        opts: { alpha: 0.75, wobble: 0.4, simple: true, color: 'danger' },
      })
    })
  }

  ctx.lazy('focus', (fink) => {
    wash(fink, body, 'star', { alpha: 0.22, wobble: 0.6, material: 'wash', inset: 0.15 })
    wash(fink, body, 'horizon', { alpha: 0.12, wobble: 0.75, material: 'wash', inset: 1.2 })
    focusRing(fink, 0, 0, w, h, {
      r,
      pen: 'horizonPencil.fine',
      opts: { alpha: 0.9, wobble: 0.32, simple: w < 120 },
    })
  })
  if (ctx.lazyOnly) return

  ink.layer('rest', () => {
    softFill(ink, body, [
      { color: 'sand-slip', alpha: 0.72, wobble: 0.55 },
      { color: 'sand', alpha: 0.28, inset: 0.8 },
    ])
    box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
      pen: readOnly ? 'pencil.fine' : 'rose.fine',
      corner: r,
      loose: readOnly ? 0.5 : 0.95,
      opts: {
        alpha: readOnly ? 0.42 : 0.58,
        wobble: 0.36,
        simple: w < 120,
        color: readOnly ? 'pencil' : 'ink-soft',
      },
    })
  })

  ink.layer('hover', () => {
    if (readOnly) return
    wash(ink, body, 'rose-wash', { alpha: 0.28, wobble: 0.85, material: 'wash' })
    box(ink, 0.8, 0.8, w - 1.6, h - 1.6, {
      pen: 'ink.fine',
      corner: r,
      loose: 0.85,
      opts: { alpha: 0.4, simple: true, color: 'horizon' },
    })
  })
}
