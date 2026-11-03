import { defineRecipe } from '@/lib/ink/recipes'
import { drawCompactSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const toastSurfaceRecipe = defineRecipe<Record<string, never>>({
  id: 'toast-surface',
  kind: 'toast',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawCompactSandSlipPanel(ink, w, h))
  },
})
