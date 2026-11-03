import { wash } from '@/lib/ink/fills'
import { pillPoly } from '@/lib/ink/geom'
import { box, focusRing, loop } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import type { Ink } from '@/lib/ink/builder'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface SwitchParams {
  disabled?: boolean
  invalid?: boolean
}

export const switchRecipe = defineRecipe<SwitchParams>({
  id: 'switch',
  kind: 'switch',
  layers: ['rest', 'hover', 'checked', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 10,
  draw(ink, { w, h }, { disabled, invalid }, ctx) {
    const r = h / 2
    const body = pillPoly(0.5, 0.5, w - 1, h - 1)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.45, material: 'wash' })
        box(ink, 0.4, 0.4, w - 0.8, h - 0.8, {
          pen: 'pencil.fine',
          corner: r,
          loose: 0.4,
          opts: { alpha: 0.38, simple: true },
        })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'star', { alpha: 0.2, material: 'wash', wobble: 0.55 })
      focusRing(fink, 0, 0, w, h, { r, pen: 'horizonPencil.fine', opts: { alpha: 0.85, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-shade', alpha: 0.55, wobble: 0.5 },
        { color: 'sand', alpha: 0.25, inset: 0.6 },
      ])
      box(ink, 0.45, 0.45, w - 0.9, h - 0.9, {
        pen: invalid ? 'rose.fine' : 'pencil.fine',
        corner: r,
        loose: 0.85,
        opts: { alpha: 0.55, simple: true, color: invalid ? 'danger' : 'ink-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.28, material: 'wash', wobble: 0.8 })
    })

    ink.layer('checked', () => {
      softFill(ink, body, [
        { color: 'baobab', alpha: 0.38, wobble: 0.65 },
        { color: 'rose-wash', alpha: 0.32, inset: 0.5 },
      ])
      box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
        pen: 'baobabfelt.fine',
        corner: r,
        loose: 0.7,
        opts: { alpha: 0.65, simple: true },
      })
    })
  },
})

export interface SwitchThumbParams {
  disabled?: boolean
}

export const switchThumbRecipe = defineRecipe<SwitchThumbParams>({
  id: 'switch-thumb',
  kind: 'thumb',
  layers: ['rest'],
  pad: 6,
  draw(ink: Ink, { w, h }, { disabled }) {
    const d = Math.min(w, h)
    const cx = w / 2
    const cy = h / 2
    const rad = d / 2 - 0.75
    ink.layer('rest', () => {
      if (disabled) {
        loop(ink, cx, cy, rad, rad, { pen: 'pencil.fine', clean: true, opts: { alpha: 0.4, simple: true } })
        return
      }
      wash(ink, pillPoly(cx - rad, cy - rad, rad * 2, rad * 2), 'sand-slip', {
        alpha: 0.85,
        wobble: 0.45,
        material: 'wash',
      })
      loop(ink, cx, cy, rad, rad, {
        pen: 'rose.fine',
        clean: true,
        opts: { alpha: 0.72, simple: true, wobble: 0.32 },
      })
    })
  },
})
