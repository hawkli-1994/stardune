import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export const badgeVariantList = ['default', 'secondary', 'outline', 'destructive'] as const
export type BadgeVariant = (typeof badgeVariantList)[number]

export interface BadgeParams {
  variant: BadgeVariant
}

export const badgeRecipe = defineRecipe<BadgeParams>({
  id: 'badge',
  kind: 'badge',
  layers: ['rest', 'hover'],
  pad: 8,
  draw(ink, { w, h }, { variant }) {
    const r = Math.min(h / 2 - 0.5, 999)
    const inset = 0.65
    const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)

    ink.layer('rest', () => {
      if (variant === 'outline') {
        wash(ink, body, 'sand-slip', { alpha: 0.55, material: 'wash', wobble: 0.42 })
        box(ink, 0.55, 0.55, w - 1.1, h - 1.1, {
          pen: 'pencil.fine',
          corner: r,
          loose: 0.7,
          opts: { alpha: 0.52, simple: true, color: 'ink-soft' },
        })
        return
      }

      const fills: { color: Parameters<typeof softFill>[2][number]['color']; alpha: number; inset?: number }[] =
        variant === 'default'
          ? [
              { color: 'rose-wash', alpha: 0.48, inset: 0 },
              { color: 'rose', alpha: 0.18, inset: 0.55 },
            ]
          : variant === 'secondary'
            ? [
                { color: 'star', alpha: 0.38, inset: 0 },
                { color: 'wash-gold', alpha: 0.22, inset: 0.5 },
              ]
            : [
                { color: 'baobab', alpha: 0.4, inset: 0 },
                { color: 'rose-wash', alpha: 0.22, inset: 0.55 },
              ]

      softFill(ink, body, fills)
      const pen =
        variant === 'default' ? 'rose.fine' : variant === 'secondary' ? 'horizonPencil.fine' : 'baobabfelt.fine'
      box(ink, 0.6, 0.6, w - 1.2, h - 1.2, {
        pen,
        corner: r,
        loose: 0.65,
        opts: { alpha: 0.55, simple: true },
      })
    })

    ink.layer('hover', () => {
      wash(ink, body, variant === 'secondary' ? 'star' : 'rose-wash', {
        alpha: 0.18,
        material: 'wash',
        wobble: 0.55,
      })
    })
  },
})
