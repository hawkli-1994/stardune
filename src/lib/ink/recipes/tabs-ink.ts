import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { focusRing, line, underline } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'

export interface TabsTriggerParams {
  variant?: 'default' | 'line'
  disabled?: boolean
}

export const tabsTriggerRecipe = defineRecipe<TabsTriggerParams>({
  id: 'tabs',
  kind: 'tab',
  layers: ['rest', 'hover', 'checked', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, { variant = 'line', disabled }, ctx) {
    const baseline = h - 1.4
    const strip = roundRectPoly(2, h - 5, w - 4, 4, 2)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        line(ink, 3, baseline, w - 3, baseline, { pen: 'pencil.fine', opts: { alpha: 0.3, simple: true } })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, strip, 'star', { alpha: 0.15, material: 'wash', wobble: 0.5 })
      focusRing(fink, 0, 0, w, h, { r: 4, pen: 'horizonPencil.fine', opts: { alpha: 0.75, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      if (variant === 'default') {
        wash(ink, roundRectPoly(1, 1, w - 2, h - 2, 4), 'sand-slip', { alpha: 0.35, material: 'wash', wobble: 0.45 })
      }
      line(ink, 2, baseline, w - 2, baseline, {
        pen: 'pencil.fine',
        opts: { alpha: 0.38, simple: true, color: 'line-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, strip, 'rose-wash', { alpha: 0.35, material: 'wash', wobble: 0.85 })
      line(ink, 4, baseline, w - 4, baseline, {
        pen: 'horizonPencil.fine',
        opts: { alpha: 0.55, simple: true },
      })
    })

    ink.layer('checked', () => {
      ink.part('swipe', () => {
        wash(ink, strip, 'rose-wash', { alpha: 0.5, material: 'wash', wobble: 0.9 })
        wash(ink, strip, 'horizon', { alpha: 0.18, material: 'wash', inset: 0.3 })
        underline(ink, 3, baseline, w - 6, { pen: 'rose.fine', kind: 'single', opts: { alpha: 0.85 } })
        underline(ink, 2, baseline + 0.8, w - 4, {
          pen: 'horizon.brush',
          kind: 'single',
          opts: { alpha: 0.45 },
        })
      })
    })
  },
})
