import { defineRecipe } from '@/lib/ink/recipes'
import { drawSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const sheetContentRecipe = defineRecipe<{ tone?: 'default' | 'lifted' }>({
  id: 'sheet-content',
  kind: 'sheet',
  layers: ['rest'],
  pad: 12,
  draw(ink, { w, h }, { tone }) {
    ink.layer('rest', () => drawSandSlipPanel(ink, w, h, tone ?? 'lifted'))
  },
})
