import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, focusRing } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const menubarRootRecipe = defineRecipe<Record<string, never>>({
  id: 'menubar-root',
  kind: 'menubar',
  layers: ['rest'],
  pad: 6,
  draw(ink, { w, h }) {
    const r = clamp(Math.min(w, h) * 0.14, 4, 8)
    const inset = 0.5
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    ink.part('fill', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.72, wobble: 0.45 },
        { color: 'sand-shade', alpha: 0.18, inset: 0.8, wobble: 0.5 },
      ])
    })
    box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
      pen: 'pencil.fine',
      corner: r,
      loose: 0.9,
      opts: { alpha: 0.42, wobble: 0.35, simple: w > 320 },
    })
  },
})

export const menubarTriggerRecipe = defineRecipe<Record<string, never>>({
  id: 'menubar-trigger',
  kind: 'menu-trigger',
  layers: ['rest', 'hover', 'open', 'focus'],
  lazy: ['focus'],
  pad: 4,
  draw(ink, { w, h }, _params, ctx) {
    const r = clamp(Math.min(w, h) * 0.18, 3, 5)
    const body = roundRectPoly(0.5, 0.5, w - 1, h - 1, r)

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'star', { alpha: 0.12, material: 'wash', wobble: 0.45 })
      focusRing(fink, 0, 0, w, h, { r, pen: 'horizonPencil.fine', opts: { alpha: 0.72, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('hover', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.4, material: 'wash', wobble: 0.75 })
    })

    ink.layer('open', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.52, material: 'wash', wobble: 0.8 })
      wash(ink, body, 'horizon', { alpha: 0.14, material: 'wash', inset: 0.35 })
    })
  },
})
