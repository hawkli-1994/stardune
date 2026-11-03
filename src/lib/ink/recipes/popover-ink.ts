import { defineRecipe } from '@/lib/ink/recipes'
import { drawSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const popoverContentRecipe = defineRecipe<Record<string, never>>({
  id: 'popover-content',
  kind: 'popover',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawSandSlipPanel(ink, w, h, 'default'))
  },
})
