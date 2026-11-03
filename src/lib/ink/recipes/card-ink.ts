import { defineRecipe } from '@/lib/ink/recipes'
import { drawSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export interface CardParams {
  tone?: 'default' | 'lifted'
}

export const cardRecipe = defineRecipe<CardParams>({
  id: 'card',
  kind: 'card',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }, { tone }) {
    ink.layer('rest', () => drawSandSlipPanel(ink, w, h, tone ?? 'default'))
  },
})
