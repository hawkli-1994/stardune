import { blobFill, wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, focusRing, underline } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'
import type { PaintKey } from '@/lib/ink/paint'

export const buttonVariantList = ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const
export const buttonSizeList = ['default', 'sm', 'lg', 'icon'] as const
export type ButtonVariant = (typeof buttonVariantList)[number]
export type ButtonSize = (typeof buttonSizeList)[number]

export interface ButtonParams {
  variant: ButtonVariant
  size: ButtonSize
  disabled?: boolean
  shape?: 'default' | 'pill'
}

export const buttonRecipe = defineRecipe<ButtonParams>({
  id: 'button',
  kind: 'button',
  layers: ['rest', 'hover', 'pressed', 'focus', 'disabled'],
  lazy: ['focus', 'pressed'],
  pad: 12,
  draw(ink, { w, h }, { variant, size, disabled, shape }, ctx) {
    const pill = shape === 'pill' && variant !== 'link'
    const r = pill ? Math.min(h, w) / 2 - 0.5 : clamp(h * 0.16, 4, 8)
    const inset = 0.8
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    const small = Math.min(w, h) < 34
    const underlineY = h / 2 + (size === 'sm' ? 6 : size === 'lg' ? 9 : 7)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.42, wobble: 0.5, material: 'wash' })
        box(ink, 0.6, 0.6, w - 1.2, h - 1.2, {
          pen: 'pencil.fine',
          corner: r,
          loose: 0.4,
          opts: { alpha: 0.38, simple: true },
        })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'star', { alpha: 0.2, wobble: 0.65, material: 'wash', inset: 0.2 })
      wash(fink, body, 'wash-gold', { alpha: 0.14, wobble: 0.8, material: 'wash', inset: 1.4 })
      focusRing(fink, 0, 0, w, h, {
        r,
        pen: 'horizonPencil.fine',
        opts: { alpha: 0.88, wobble: 0.35, simple: small },
      })
    })

    ctx.lazy('pressed', (pink) => {
      if (variant === 'link') return
      const pressColor: PaintKey =
        variant === 'destructive' ? 'ember-deep' : variant === 'secondary' ? 'star-deep' : variant === 'outline' ? 'horizon' : 'rose-deep'
      wash(pink, body, pressColor, { alpha: 0.32, wobble: 0.75, material: 'wash' })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      switch (variant) {
        case 'default':
          ink.part('fill', () => {
            softFill(ink, body, [
              { color: 'rose-wash', alpha: 0.62 },
              { color: 'wash-rose', alpha: 0.38, inset: 1.1 },
              { color: 'rose', alpha: 0.22, inset: 0.2 },
            ])
          })
          box(ink, 0.7, 0.7, w - 1.4, h - 1.4, {
            pen: 'rose.fine',
            corner: r,
            loose: 1.05,
            opts: { alpha: 0.72, wobble: 0.32, simple: small },
          })
          break
        case 'secondary':
          ink.part('fill', () => {
            softFill(ink, body, [
              { color: 'wash-gold', alpha: 0.5 },
              { color: 'star', alpha: 0.28, inset: 0.8 },
            ])
            if (!small) blobFill(ink, body, 'sand-slip', { alpha: 0.35, material: 'wash', rough: 0.16 })
          })
          box(ink, 0.7, 0.7, w - 1.4, h - 1.4, {
            pen: 'pencil.fine',
            corner: r,
            loose: 0.95,
            opts: { alpha: 0.55, simple: small },
          })
          break
        case 'destructive':
          ink.part('fill', () => {
            softFill(ink, body, [
              { color: 'ember', alpha: 0.55 },
              { color: 'wash-rose', alpha: 0.3, inset: 1 },
            ])
          })
          box(ink, 0.7, 0.7, w - 1.4, h - 1.4, {
            pen: 'ember',
            corner: r,
            loose: 1,
            opts: { alpha: 0.7, simple: small },
          })
          break
        case 'outline':
          wash(ink, body, 'sand-slip', { alpha: 0.55, wobble: 0.6, material: 'wash' })
          box(ink, 0.7, 0.7, w - 1.4, h - 1.4, {
            pen: 'ink.fine',
            corner: r,
            loose: 1.1,
            opts: { alpha: 0.65, wobble: 0.38, simple: small, color: 'ink-soft' },
          })
          break
        case 'ghost':
          break
        case 'link':
          underline(ink, w * 0.12, underlineY, w * 0.76, {
            pen: 'horizonPencil.fine',
            kind: 'single',
            opts: { alpha: 0.85 },
          })
          break
      }
    })

    ink.layer('hover', () => {
      switch (variant) {
        case 'default':
          wash(ink, body, 'rose', { alpha: 0.18, wobble: 0.9, material: 'wash' })
          box(ink, 1, 1, w - 2, h - 2, {
            pen: 'rose.fine',
            corner: r,
            loose: 1.15,
            opts: { alpha: 0.5, simple: true },
          })
          break
        case 'secondary':
          wash(ink, body, 'star', { alpha: 0.22, wobble: 0.85, material: 'wash' })
          break
        case 'destructive':
          wash(ink, body, 'ember-deep', { alpha: 0.2, material: 'wash' })
          break
        case 'outline':
          wash(ink, body, 'horizon', { alpha: 0.16, wobble: 0.7, material: 'wash' })
          box(ink, 1, 1, w - 2, h - 2, {
            pen: 'horizonPencil.fine',
            corner: r,
            loose: 0.9,
            opts: { alpha: 0.45, simple: true },
          })
          break
        case 'ghost':
        case 'link':
          wash(ink, body, 'rose-wash', { alpha: 0.4, wobble: 0.75, material: 'wash' })
          if (variant === 'link') {
            underline(ink, w * 0.08, underlineY + 0.5, w * 0.84, {
              pen: 'horizon.brush',
              kind: 'single',
              opts: { alpha: 0.75 },
            })
          }
          break
      }
    })
  },
})
