import { wash } from '@/lib/ink/fills'
import { pillPoly } from '@/lib/ink/geom'
import { loop } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const avatarRingRecipe = defineRecipe<Record<string, never>>({
  id: 'avatar-ring',
  kind: 'avatar',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    const d = Math.min(w, h)
    const cx = w / 2
    const cy = h / 2
    const outer = d / 2 - 0.65
    const inner = outer - 2.4
    const body = pillPoly(cx - outer, cy - outer, outer * 2, outer * 2)

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.35, wobble: 0.42 },
        { color: 'sand', alpha: 0.18, inset: 0.8 },
      ])
      wash(ink, body, 'sand-shade', { alpha: 0.12, material: 'wash', wobble: 0.35, inset: 1.2 })
      loop(ink, cx, cy, outer, outer, {
        pen: 'rose.fine',
        clean: true,
        opts: { alpha: 0.62, simple: true, wobble: 0.28 },
      })
      loop(ink, cx, cy, inner, inner, {
        pen: 'pencil.fine',
        clean: true,
        opts: { alpha: 0.4, simple: true, color: 'line-soft' },
      })
    })
  },
})
