import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import type { PaintKey } from '@/lib/ink/paint'
import type { PenName } from '@/lib/ink/types'
import { softFill } from '@/lib/ink/recipes/wash-utils'
import { drawSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const alertVariantList = ['default', 'success', 'warning', 'destructive', 'info'] as const
export type AlertVariant = (typeof alertVariantList)[number]

const accent: Record<AlertVariant, { fill: PaintKey; wash: PaintKey; pen: PenName }> = {
  default: { fill: 'rose-wash', wash: 'rose', pen: 'rose.fine' },
  success: { fill: 'baobab', wash: 'baobab', pen: 'baobabfelt.fine' },
  warning: { fill: 'ember', wash: 'wash-gold', pen: 'ember.fine' },
  destructive: { fill: 'ember-deep', wash: 'danger', pen: 'ember.fine' },
  info: { fill: 'horizon', wash: 'horizon', pen: 'horizonPencil.fine' },
}

export interface AlertParams {
  variant: AlertVariant
}

export const alertRecipe = defineRecipe<AlertParams>({
  id: 'alert',
  kind: 'alert',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }, { variant }) {
    const { fill, wash: washKey, pen } = accent[variant]
    const r = clamp(Math.min(w, h) * 0.05, 5, 10)
    const stripW = clamp(w * 0.04, 4, 7)
    const strip = roundRectPoly(0.8, 0.8, stripW, h - 1.6, Math.min(3, r))

    ink.layer('rest', () => {
      drawSandSlipPanel(ink, w, h, 'default')
      softFill(ink, strip, [
        { color: fill, alpha: 0.55, wobble: 0.55 },
        { color: washKey, alpha: 0.28, inset: 0.45 },
      ])
      wash(ink, roundRectPoly(stripW + 2, 1.2, w - stripW - 3, h - 2.4, r - 1), fill, {
        alpha: 0.1,
        material: 'wash',
        wobble: 0.65,
      })
      box(ink, 0.65, 0.65, w - 1.3, h - 1.3, {
        pen,
        corner: r,
        loose: 0.85,
        opts: { alpha: 0.42, simple: w > 360, color: 'line-soft' },
      })
    })
  },
})
