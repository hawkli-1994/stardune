import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { focusRing, line, underline } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'

export const navigationMenuTriggerRecipe = defineRecipe<Record<string, never>>({
  id: 'navigation-menu-trigger',
  kind: 'nav-trigger',
  layers: ['rest', 'hover', 'open', 'focus'],
  lazy: ['focus'],
  pad: 6,
  draw(ink, { w, h }, _params, ctx) {
    const baseline = h - 1.2
    const strip = roundRectPoly(2, h - 5, w - 4, 4, 2)

    ctx.lazy('focus', (fink) => {
      wash(fink, strip, 'star', { alpha: 0.14, material: 'wash', wobble: 0.5 })
      focusRing(fink, 0, 0, w, h, { r: 4, pen: 'horizonPencil.fine', opts: { alpha: 0.75, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      line(ink, 2, baseline, w - 2, baseline, {
        pen: 'pencil.fine',
        opts: { alpha: 0.28, simple: true, color: 'line-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, strip, 'rose-wash', { alpha: 0.38, material: 'wash', wobble: 0.82 })
      line(ink, 4, baseline, w - 4, baseline, {
        pen: 'horizonPencil.fine',
        opts: { alpha: 0.5, simple: true },
      })
    })

    ink.layer('open', () => {
      wash(ink, strip, 'rose-wash', { alpha: 0.48, material: 'wash', wobble: 0.88 })
      wash(ink, strip, 'horizon', { alpha: 0.16, material: 'wash', inset: 0.3 })
      underline(ink, 3, baseline, w - 6, { pen: 'rose.fine', kind: 'single', opts: { alpha: 0.82 } })
    })
  },
})
