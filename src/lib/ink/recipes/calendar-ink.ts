import { defineRecipe } from '@/lib/ink/recipes'
import { drawCompactSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const calendarPanelRecipe = defineRecipe<Record<string, never>>({
  id: 'calendar-panel',
  kind: 'calendar',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawCompactSandSlipPanel(ink, w, h))
  },
})
