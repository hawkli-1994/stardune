import { wash } from '@/lib/ink/fills'
import { pillPoly, roundRectPoly } from '@/lib/ink/geom'
import { box, focusRing, loop } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import type { Ink } from '@/lib/ink/builder'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface SliderTrackParams {
  disabled?: boolean
}

export const sliderTrackRecipe = defineRecipe<SliderTrackParams>({
  id: 'slider-track',
  kind: 'slider',
  layers: ['rest', 'hover', 'disabled'],
  pad: 8,
  draw(ink, { w, h }, { disabled }, ctx) {
    const r = h / 2
    const body = pillPoly(0.5, 0.5, w - 1, h - 1)

    if (disabled) {
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.42, material: 'wash', wobble: 0.45 })
        box(ink, 0.4, 0.4, w - 0.8, h - 0.8, {
          pen: 'pencil.fine',
          corner: r,
          loose: 0.35,
          opts: { alpha: 0.35, simple: true },
        })
      })
      return
    }

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-shade', alpha: 0.52, wobble: 0.48 },
        { color: 'sand', alpha: 0.28, inset: 0.55 },
      ])
      box(ink, 0.45, 0.45, w - 0.9, h - 0.9, {
        pen: 'pencil.fine',
        corner: r,
        loose: 0.75,
        opts: { alpha: 0.48, simple: true, color: 'ink-soft' },
      })
    })

    ink.layer('hover', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.22, material: 'wash', wobble: 0.65 })
    })
  },
})

export interface SliderRangeParams {
  disabled?: boolean
}

export const sliderRangeRecipe = defineRecipe<SliderRangeParams>({
  id: 'slider-range',
  kind: 'range',
  layers: ['rest'],
  pad: 6,
  draw(ink, { w, h }, { disabled }) {
    const r = Math.max(1, h / 2 - 0.25)
    const body = pillPoly(0.35, 0.35, Math.max(1, w - 0.7), h - 0.7)
    ink.layer('rest', () => {
      if (disabled) {
        wash(ink, body, 'sand-shade', { alpha: 0.35, material: 'wash', wobble: 0.4 })
        return
      }
      softFill(ink, body, [
        { color: 'baobab', alpha: 0.42, wobble: 0.62 },
        { color: 'rose-wash', alpha: 0.38, inset: 0.45 },
      ])
      if (w > 8) {
        box(ink, 0.5, 0.5, w - 1, h - 1, {
          pen: 'rose.fine',
          corner: r,
          loose: 0.55,
          opts: { alpha: 0.5, simple: true },
        })
      }
    })
  },
})

export interface SliderThumbParams {
  disabled?: boolean
}

export const sliderThumbRecipe = defineRecipe<SliderThumbParams>({
  id: 'slider-thumb',
  kind: 'thumb',
  layers: ['rest', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 10,
  draw(ink: Ink, { w, h }, { disabled }, ctx) {
    const d = Math.min(w, h)
    const cx = w / 2
    const cy = h / 2
    const rad = d / 2 - 0.85
    const body = pillPoly(cx - rad, cy - rad, rad * 2, rad * 2)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        loop(ink, cx, cy, rad, rad, { pen: 'pencil.fine', clean: true, opts: { alpha: 0.38, simple: true } })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'star', { alpha: 0.28, material: 'wash', wobble: 0.55 })
      focusRing(fink, 0, 0, w, h, { r: rad + 2, pen: 'horizonPencil.fine', opts: { alpha: 0.82, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      wash(ink, body, 'sand-slip', { alpha: 0.88, wobble: 0.42, material: 'wash' })
      loop(ink, cx, cy, rad, rad, {
        pen: 'rose.fine',
        clean: true,
        opts: { alpha: 0.7, simple: true, wobble: 0.28 },
      })
    })
  },
})
