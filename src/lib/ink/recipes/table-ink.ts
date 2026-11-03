import { roundRectPoly } from '@/lib/ink/geom'
import { box, line } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const tableSurfaceRecipe = defineRecipe<Record<string, never>>({
  id: 'table-surface',
  kind: 'table',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    const r = clamp(Math.min(w, h) * 0.025, 4, 8)
    const inset = 0.6
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    const pitch = clamp(h / 8, 32, 44)

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.72, wobble: 0.45 },
        { color: 'sand', alpha: 0.26, inset: 1, wobble: 0.5 },
      ])
      box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
        pen: 'pencil.fine',
        corner: r,
        loose: 0.85,
        opts: { alpha: 0.48, simple: w > 420, color: 'ink-soft' },
      })
      for (let y = pitch; y < h - pitch * 0.45; y += pitch) {
        line(ink, 6, y, w - 6, y, {
          pen: 'pencil.fine',
          loose: 0.5,
          opts: { alpha: 0.28, simple: w > 360, color: 'line-soft' },
        })
        line(ink, 8, y + 0.55, w - 8, y + 0.55, {
          pen: 'horizonPencil.fine',
          loose: 0.42,
          opts: { alpha: 0.18, simple: w > 360 },
        })
      }
    })
  },
})
