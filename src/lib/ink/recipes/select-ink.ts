import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { drawFieldWashFrame, type FieldFrameParams } from '@/lib/ink/recipes/field-wash-frame'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export type SelectTriggerParams = FieldFrameParams

export const selectTriggerRecipe = defineRecipe<SelectTriggerParams>({
  id: 'select',
  kind: 'field',
  layers: ['rest', 'hover', 'focus', 'disabled', 'invalid', 'open'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, params, ctx) {
    drawFieldWashFrame(ink, w, h, params, ctx, { radiusFactor: 0.14 })
    if (params.disabled || ctx.lazyOnly) return
    const r = clamp(Math.min(w, h) * 0.14, 3.5, 7)
    const inset = 0.55
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    ink.layer('open', () => {
      wash(ink, body, 'horizon', { alpha: 0.18, wobble: 0.7, material: 'wash' })
      box(ink, 0.7, 0.7, w - 1.4, h - 1.4, {
        pen: 'horizonPencil.fine',
        corner: r,
        loose: 0.75,
        opts: { alpha: 0.45, simple: true },
      })
    })
  },
})

export const selectContentRecipe = defineRecipe<Record<string, never>>({
  id: 'select-content',
  kind: 'select-panel',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    const r = clamp(Math.min(w, h) * 0.035, 4, 9)
    const inset = 0.5
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.92, wobble: 0.48 },
        { color: 'wash-sky', alpha: 0.12, inset: 1.5, wobble: 0.9 },
      ])
      box(ink, 0.5, 0.5, w - 1, h - 1, {
        pen: 'pencil.fine',
        corner: r,
        loose: 1.1,
        opts: { alpha: 0.5, simple: w > 280 },
      })
    })
  },
})
