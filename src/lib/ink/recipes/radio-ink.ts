import { wash } from '@/lib/ink/fills'
import { ellipsePoly } from '@/lib/ink/geom'
import { box, focusRing, loop } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface RadioParams {
  disabled?: boolean
  invalid?: boolean
}

export const radioRecipe = defineRecipe<RadioParams>({
  id: 'radio-group',
  kind: 'radio',
  layers: ['rest', 'hover', 'checked', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 10,
  draw(ink, { w, h }, { disabled, invalid }, ctx) {
    const s = Math.min(w, h)
    const cx = w / 2
    const cy = h / 2
    const R = s / 2 - 0.8
    const disc = ellipsePoly(cx, cy, R, R, 24)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, disc, 'sand-shade', { alpha: 0.42, material: 'wash' })
        loop(ink, cx, cy, R, R, { pen: 'pencil.fine', clean: true, opts: { alpha: 0.38, simple: true } })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, disc, 'star', { alpha: 0.2, wobble: 0.55, material: 'wash' })
      focusRing(fink, 0, 0, w, h, { shape: 'ellipse', pen: 'horizonPencil.fine', opts: { alpha: 0.88, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      softFill(ink, disc, [{ color: 'sand-slip', alpha: 0.7, wobble: 0.45 }])
      loop(ink, cx, cy, R, R, {
        pen: invalid ? 'rose.fine' : 'pencil.fine',
        clean: true,
        opts: { alpha: 0.58, wobble: 0.34, simple: true, color: invalid ? 'danger' : 'ink-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, disc, 'rose-wash', { alpha: 0.35, material: 'wash', wobble: 0.75 })
    })

    ink.layer('checked', () => {
      const inner = clamp(R * 0.58, 2.2, 10)
      const dot = ellipsePoly(cx, cy, inner, inner, 18)
      softFill(ink, dot, [
        { color: 'rose-wash', alpha: 0.55, wobble: 0.7 },
        { color: 'baobab', alpha: 0.35, inset: 0.4 },
      ])
      loop(ink, cx, cy, inner * 0.55, inner * 0.55, {
        pen: 'rose.fine',
        clean: true,
        opts: { alpha: 0.85, simple: true },
      })
      if (invalid) {
        box(ink, 0.3, 0.3, w - 0.6, h - 0.6, {
          pen: 'rose.fine',
          corner: R,
          loose: 0.6,
          opts: { alpha: 0.5, simple: true },
        })
      }
    })
  },
})
