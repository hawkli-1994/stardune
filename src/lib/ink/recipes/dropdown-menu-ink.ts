import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { focusRing } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import { defineRecipe } from '@/lib/ink/recipes'
import { drawCompactSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const dropdownMenuContentRecipe = defineRecipe<Record<string, never>>({
  id: 'dropdown-menu-content',
  kind: 'dropdown-menu',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawCompactSandSlipPanel(ink, w, h))
  },
})

export interface DropdownMenuItemParams {
  disabled?: boolean
}

export const dropdownMenuItemRecipe = defineRecipe<DropdownMenuItemParams>({
  id: 'dropdown-menu-item',
  kind: 'menu-item',
  layers: ['rest', 'hover', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 4,
  draw(ink, { w, h }, { disabled }, ctx) {
    const r = clamp(Math.min(w, h) * 0.2, 2, 4)
    const body = roundRectPoly(0.5, 0.5, w - 1, h - 1, r)

    if (disabled) {
      if (ctx.lazyOnly) return
      ink.layer('disabled', () => {
        wash(ink, body, 'sand-shade', { alpha: 0.2, material: 'wash', wobble: 0.35 })
      })
      return
    }

    ctx.lazy('focus', (fink) => {
      wash(fink, body, 'rose-wash', { alpha: 0.38, material: 'wash', wobble: 0.65 })
      focusRing(fink, 0, 0, w, h, { r, pen: 'horizonPencil.fine', opts: { alpha: 0.7, simple: true } })
    })
    if (ctx.lazyOnly) return

    ink.layer('hover', () => {
      wash(ink, body, 'rose-wash', { alpha: 0.42, material: 'wash', wobble: 0.72 })
    })
  },
})
