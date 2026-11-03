import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const skeletonRecipe = defineRecipe<Record<string, never>>({
  id: 'skeleton',
  kind: 'skeleton',
  layers: ['rest', 'busy'],
  pad: 6,
  draw(ink, { w, h }) {
    const r = clamp(Math.min(w, h) * 0.12, 3, 8)
    const body = roundRectPoly(0.5, 0.5, w - 1, h - 1, r)

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-shade', alpha: 0.42, wobble: 0.4 },
        { color: 'sand', alpha: 0.2, inset: 0.7 },
      ])
      box(ink, 0.5, 0.5, w - 1, h - 1, {
        pen: 'pencil.fine',
        corner: r,
        loose: 0.45,
        opts: { alpha: 0.28, simple: true, color: 'line-soft' },
      })
    })

    ink.layer('busy', () => {
      wash(ink, body, 'sand-slip', { alpha: 0.38, material: 'wash', wobble: 0.55, inset: 0.4 })
      wash(ink, roundRectPoly(2, 2, w - 4, h - 4, Math.max(2, r - 1)), 'star', {
        alpha: 0.14,
        material: 'wash',
        wobble: 0.7,
        inset: 0.2,
      })
    })
  },
})
