import { defineRecipe } from '@/lib/ink/recipes'
import { drawFieldWashFrame, type FieldFrameParams } from '@/lib/ink/recipes/field-wash-frame'

export type TextareaParams = FieldFrameParams

export const textareaRecipe = defineRecipe<TextareaParams>({
  id: 'textarea',
  kind: 'field',
  layers: ['rest', 'hover', 'focus', 'disabled', 'invalid'],
  lazy: ['focus'],
  pad: 10,
  draw(ink, { w, h }, params, ctx) {
    drawFieldWashFrame(ink, w, h, params, ctx, { radiusFactor: 0.09 })
  },
})
