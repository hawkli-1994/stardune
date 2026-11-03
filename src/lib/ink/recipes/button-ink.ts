import { bandFill, wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box, focusRing } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'

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

const fillFor = (variant: ButtonVariant): 'rose' | 'star' | 'sand-shade' | 'horizon' | 'danger' | null => {
  switch (variant) {
    case 'default':
      return 'rose'
    case 'secondary':
      return 'star'
    case 'destructive':
      return 'danger'
    case 'outline':
    case 'ghost':
    case 'link':
      return null
  }
}

export const buttonRecipe = defineRecipe<ButtonParams>({
  id: 'button',
  kind: 'button',
  layers: ['rest', 'hover', 'pressed', 'focus', 'disabled'],
  lazy: ['focus', 'pressed'],
  pad: 10,
  draw(ink, { w, h }, { variant, disabled, shape }, ctx) {
    const pill = shape === 'pill' && variant !== 'link'
    const r = pill ? Math.min(h, w) / 2 - 0.5 : clamp(h * 0.14, 3, 6)
    const inset = 0.6
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)
    const outlinePen = variant === 'destructive' ? 'rose.fine' : 'ink.fine'

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.55, material: 'wash' })
        box(ink, 0.5, 0.5, w - 1, h - 1, { pen: 'pencil.fine', corner: r, opts: { alpha: 0.5 } })
      })
      return
    }

    ctx.lazy('focus', (fink) => focusRing(fink, 0, 0, w, h, { r }))
    ctx.lazy('pressed', (pink) => {
      const fill = fillFor(variant)
      if (fill) wash(pink, body, fill, { alpha: 0.28, material: 'wash' })
    })
    if (ctx.lazyOnly) return

    ink.layer('rest', () => {
      const fill = fillFor(variant)
      if (fill) {
        ink.part('fill', () => bandFill(ink, body, fill, { passes: ctx.calm ? 1 : 2, alpha: fill === 'danger' ? 0.92 : 0.78 }))
      }
      if (variant !== 'link') {
        box(ink, 0.5, 0.5, w - 1, h - 1, { pen: outlinePen, corner: r, loose: 0.85 })
      }
    })

    ink.layer('hover', () => {
      if (variant === 'ghost' || variant === 'link') {
        wash(ink, body, 'rose-wash', { alpha: 0.35 })
        return
      }
      box(ink, 1, 1, w - 2, h - 2, { pen: outlinePen, corner: r, loose: 0.7, opts: { alpha: 0.75, simple: true } })
    })
  },
})
