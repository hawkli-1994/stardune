import { defineRecipe } from '@/lib/ink/recipes'
import { drawFieldWashFrame, type FieldFrameParams } from '@/lib/ink/recipes/field-wash-frame'

export type InputParams = FieldFrameParams

export const inputRecipe = defineRecipe<InputParams>({
  id: 'input',
  kind: 'field',
  layers: ['rest', 'hover', 'focus', 'disabled', 'invalid'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, params, ctx) {
    drawFieldWashFrame(ink, w, h, params, ctx, { radiusFactor: 0.14 })
  },
})
