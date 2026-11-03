import { wash } from '@/lib/ink/fills'
import { pillPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface ProgressTrackParams {
  disabled?: boolean
}

export const progressTrackRecipe = defineRecipe<ProgressTrackParams>({
  id: 'progress-track',
  kind: 'progress',
  layers: ['rest'],
  pad: 6,
  draw(ink, { w, h }) {
    const r = h / 2
    const body = pillPoly(0.4, 0.4, w - 0.8, h - 0.8)
    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-shade', alpha: 0.5, wobble: 0.45 },
        { color: 'sand-slip', alpha: 0.22, inset: 0.5 },
      ])
      box(ink, 0.45, 0.45, w - 0.9, h - 0.9, {
        pen: 'pencil.fine',
        corner: r,
        loose: 0.65,
        opts: { alpha: 0.42, simple: true, color: 'line-soft' },
      })
    })
  },
})

export interface ProgressFillParams {
  disabled?: boolean
}

export const progressFillRecipe = defineRecipe<ProgressFillParams>({
  id: 'progress-fill',
  kind: 'progress-fill',
  layers: ['rest'],
  pad: 6,
  draw(ink, { w, h }, { disabled }) {
    const r = Math.max(1, h / 2 - 0.2)
    const body = pillPoly(0.35, 0.35, Math.max(1, w - 0.7), h - 0.7)
    ink.layer('rest', () => {
      if (disabled) {
        wash(ink, body, 'sand-shade', { alpha: 0.32, material: 'wash', wobble: 0.4 })
        return
      }
      softFill(ink, body, [
        { color: 'rose-wash', alpha: 0.55, wobble: 0.58 },
        { color: 'horizon', alpha: 0.32, inset: 0.55 },
      ])
      if (w > 6) {
        box(ink, 0.5, 0.5, w - 1, h - 1, {
          pen: 'horizonPencil.fine',
          corner: r,
          loose: 0.5,
          opts: { alpha: 0.48, simple: true },
        })
      }
    })
  },
})
