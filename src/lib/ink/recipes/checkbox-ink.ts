import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, check, focusRing, line } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface CheckboxParams {
  disabled?: boolean
  invalid?: boolean
}

export const checkboxRecipe = defineRecipe<CheckboxParams>({
  id: 'checkbox',
  kind: 'checkbox',
  layers: ['rest', 'hover', 'focus', 'disabled', 'invalid', 'checked', 'indeterminate'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, { disabled, invalid }, ctx) {
    const s = Math.min(w, h)
    const r = clamp(s * 0.12, 2, 4)
    const body = roundRectPoly(0.45, 0.45, w - 0.9, h - 0.9, r)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.45, wobble: 0.4, material: 'wash' })
        box(ink, 0.4, 0.4, w - 0.8, h - 0.8, {
          pen: 'pencil.fine',
          corner: r,
          loose: 0.35,
          opts: { alpha: 0.38, simple: true },
        })
      })
      return
    }

    if (invalid) {
      ink.layer('invalid', () => {
        box(ink, 0.35, 0.35, w - 0.7, h - 0.7, {
          pen: 'rose.fine',
          corner: r,
          loose: 0.85,
          opts: { alpha: 0.7, color: 'danger' },
        })
      })
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'star', { alpha: 0.24, wobble: 0.55, material: 'wash', inset: 0.1 })
      focusRing(fink, 0, 0, w, h, { r, pen: 'horizonPencil.fine', opts: { alpha: 0.88, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.75, wobble: 0.5 },
        { color: 'sand', alpha: 0.22, inset: 0.6 },
      ])
      box(ink, 0.4, 0.4, w - 0.8, h - 0.8, {
        pen: invalid ? 'rose.fine' : 'pencil.fine',
        corner: r,
        loose: 0.9,
        opts: { alpha: 0.58, wobble: 0.34, simple: true, color: invalid ? 'danger' : 'ink-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.32, wobble: 0.8, material: 'wash' })
    })

    ink.layer('checked', () => {
      softFill(ink, body, [
        { color: 'wash-leaf', alpha: 0.42, wobble: 0.75 },
        { color: 'baobab', alpha: 0.22, inset: 0.5 },
      ])
      check(ink, s * 0.14, s * 0.1, s * 0.86, {
        pen: 'baobabfelt.fine',
        opts: { alpha: 0.92, wobble: 0.42, speed: 1.05 },
      })
    })

    ink.layer('indeterminate', () => {
      wash(ink, body, 'horizon', { alpha: 0.26, wobble: 0.65, material: 'wash' })
      line(ink, w * 0.24, h * 0.5, w * 0.76, h * 0.5, {
        pen: 'horizonPencil.fine',
        opts: { alpha: 0.88, wobble: 0.35 },
      })
    })
  },
})
