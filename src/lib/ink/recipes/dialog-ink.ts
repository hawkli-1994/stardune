import { defineRecipe } from '@/lib/ink/recipes'
import { drawSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const dialogContentRecipe = defineRecipe<{ tone?: 'default' | 'lifted' }>({
  id: 'dialog-content',
  kind: 'dialog',
  layers: ['rest'],
  pad: 12,
  draw(ink, { w, h }, { tone }) {
    ink.layer('rest', () => drawSandSlipPanel(ink, w, h, tone ?? 'lifted'))
  },
})
