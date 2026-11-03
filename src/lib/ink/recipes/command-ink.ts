import { defineRecipe } from '@/lib/ink/recipes'
import { drawFieldWashFrame, type FieldFrameParams } from '@/lib/ink/recipes/field-wash-frame'
import { drawCompactSandSlipPanel } from '@/lib/ink/recipes/panel-wash'

export const commandPanelRecipe = defineRecipe<Record<string, never>>({
  id: 'command-panel',
  kind: 'command',
  layers: ['rest'],
  pad: 10,
  draw(ink, { w, h }) {
    ink.layer('rest', () => drawCompactSandSlipPanel(ink, w, h))
  },
})

export type CommandInputParams = FieldFrameParams

export const commandInputRecipe = defineRecipe<CommandInputParams>({
  id: 'command-input',
  kind: 'command-input',
  layers: ['rest', 'hover', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 6,
  draw(ink, { w, h }, params, ctx) {
    drawFieldWashFrame(ink, w, h, params, ctx, { radiusFactor: 0.1 })
  },
})

export { dropdownMenuItemRecipe as commandItemRecipe } from '@/lib/ink/recipes/dropdown-menu-ink'
