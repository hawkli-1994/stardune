import { defineRecipe } from '@/lib/ink/recipes'
import { drawCompactSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const tooltipContentRecipe = defineRecipe<Record<string, never>>({
  id: 'tooltip-content',
  kind: 'tooltip',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawCompactSandSlipPanel(ink, w, h))
  },
})
