import { wash } from '@/lib/ink/fills'
import { line } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'

export type SeparatorOrientation = 'horizontal' | 'vertical'

export interface SeparatorParams {
  orientation: SeparatorOrientation
}

export const separatorRecipe = defineRecipe<SeparatorParams>({
  id: 'separator',
  kind: 'separator',
  layers: ['rest'],
  pad: 4,
  draw(ink, { w, h }, { orientation }) {
    ink.layer('rest', () => {
      if (orientation === 'vertical') {
        const x = w / 2
        wash(ink, [[x - 1.2, 2], [x + 1.2, 2], [x + 1.2, h - 2], [x - 1.2, h - 2]], 'sand-shade', {
          alpha: 0.12,
          material: 'wash',
          wobble: 0.35,
        })
        line(ink, x, 3, x, h - 3, {
          pen: 'pencil.fine',
          loose: 0.55,
          opts: { alpha: 0.45, simple: true, color: 'line-soft' },
        })
        line(ink, x + 0.65, 4, x + 0.65, h - 4, {
          pen: 'horizonPencil.fine',
          loose: 0.45,
          opts: { alpha: 0.32, simple: true },
        })
      } else {
        const y = h / 2
        wash(ink, [[2, y - 1.2], [w - 2, y - 1.2], [w - 2, y + 1.2], [2, y + 1.2]], 'sand-shade', {
          alpha: 0.12,
          material: 'wash',
          wobble: 0.35,
        })
        line(ink, 3, y, w - 3, y, {
          pen: 'pencil.fine',
          loose: 0.55,
          opts: { alpha: 0.45, simple: w > 320, color: 'line-soft' },
        })
        line(ink, 4, y + 0.65, w - 4, y + 0.65, {
          pen: 'horizonPencil.fine',
          loose: 0.45,
          opts: { alpha: 0.32, simple: w > 320 },
        })
      }
    })
  },
})
