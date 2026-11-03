import { wash } from '@/lib/ink/fills'
import { pillPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export type ScrollThumbOrientation = 'vertical' | 'horizontal'

export interface ScrollThumbParams {
  orientation: ScrollThumbOrientation
}

export const scrollThumbRecipe = defineRecipe<ScrollThumbParams>({
  id: 'scroll-thumb',
  kind: 'scroll-thumb',
  layers: ['rest', 'hover'],
  pad: 4,
  draw(ink, { w, h }, { orientation }) {
    const vertical = orientation === 'vertical'
    const body = vertical
      ? pillPoly(Math.max(0, w / 2 - 1.5), 0.5, Math.min(w - 1, 3), Math.max(2, h - 1))
      : pillPoly(0.5, Math.max(0, h / 2 - 1.5), Math.max(2, w - 1), Math.min(h - 1, 3))

    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-shade', alpha: 0.38, wobble: 0.42 },
        { color: 'rose-wash', alpha: 0.22, inset: 0.45 },
      ])
      if (Math.max(w, h) > 6) {
        box(ink, 0.4, 0.4, w - 0.8, h - 0.8, {
          pen: 'pencil.fine',
          corner: vertical ? 1.5 : 1.5,
          loose: 0.4,
          opts: { alpha: 0.35, simple: true, color: 'line-soft' },
        })
      }
    })

    ink.layer('hover', () => {
      wash(ink, body, 'horizon', { alpha: 0.28, material: 'wash', wobble: 0.55 })
    })
  },
})
