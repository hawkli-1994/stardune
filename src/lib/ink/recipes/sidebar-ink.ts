import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, line } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const sidebarRailRecipe = defineRecipe<Record<string, never>>({
  id: 'sidebar-rail',
  kind: 'sidebar',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    const body = roundRectPoly(0.5, 0.5, w - 1, h - 1, 6)

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.82, wobble: 0.48 },
        { color: 'sand', alpha: 0.3, inset: 1.1, wobble: 0.55 },
        { color: 'wash-gold', alpha: 0.06, inset: 2.2, wobble: 0.9 },
      ])
      line(ink, w - 1.2, 2, w - 1.2, h - 2, {
        pen: 'horizonPencil.fine',
        opts: { alpha: 0.42, simple: h > 320, color: 'line-soft' },
      })
      wash(ink, roundRectPoly(w - 4, 1, 3, h - 2, 2), 'rose-wash', {
        alpha: 0.08,
        material: 'wash',
        wobble: 0.5,
      })
      box(ink, 0.6, 0.6, w - 1.2, h - 1.2, {
        pen: 'pencil.fine',
        corner: 6,
        loose: 0.95,
        opts: { alpha: 0.45, simple: h > 400, color: 'ink-soft' },
      })
    })
  },
})
