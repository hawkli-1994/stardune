import { wash } from '@/lib/ink/fills'
import { roundRectPoly } from '@/lib/ink/geom'
import { focusRing, line, underline } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import type { Ink } from '@/lib/ink/builder'
import { defineRecipe, type RecipeContext } from '@/lib/ink/recipes'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export interface DisclosureTriggerParams {
  disabled?: boolean
}

function drawDisclosureTrigger(
  ink: Ink,
  w: number,
  h: number,
  { disabled }: DisclosureTriggerParams,
  ctx: RecipeContext,
) {
  const baseline = h - 1.35
  const strip = roundRectPoly(2, h - 5.5, w - 4, 4.5, 2)
  const body = roundRectPoly(0.6, 0.6, w - 1.2, h - 1.2, clamp(h * 0.12, 3, 6))

  if (disabled) {
    if (ctx.lazyOnly) return
    ink.layer('disabled', () => {
      wash(ink, body, 'sand-shade', { alpha: 0.35, material: 'wash', wobble: 0.4 })
      line(ink, 3, baseline, w - 3, baseline, { pen: 'pencil.fine', opts: { alpha: 0.28, simple: true } })
    })
    return
  }

  ctx.lazy('focus', (fink) => {
    wash(fink, strip, 'star', { alpha: 0.14, material: 'wash', wobble: 0.5 })
    focusRing(fink, 0, 0, w, h, { r: 4, pen: 'horizonPencil.fine', opts: { alpha: 0.75, simple: true } })
  })
  if (ctx.lazyOnly) return

  ink.layer('rest', () => {
    softFill(ink, body, [
      { color: 'sand-slip', alpha: 0.42, wobble: 0.45 },
      { color: 'sand', alpha: 0.18, inset: 0.7 },
    ])
    line(ink, 2, baseline, w - 2, baseline, {
      pen: 'pencil.fine',
      loose: 0.55,
      opts: { alpha: 0.42, simple: true, color: 'line-soft' },
    })
    line(ink, 4, baseline + 0.6, w - 4, baseline + 0.6, {
      pen: 'horizonPencil.fine',
      loose: 0.45,
      opts: { alpha: 0.22, simple: true },
    })
  })

  ink.layer('hover', () => {
    wash(ink, strip, 'rose-wash', { alpha: 0.32, material: 'wash', wobble: 0.75 })
  })

  ink.layer('open', () => {
    wash(ink, strip, 'rose-wash', { alpha: 0.48, material: 'wash', wobble: 0.85 })
    wash(ink, strip, 'horizon', { alpha: 0.16, material: 'wash', inset: 0.35 })
    underline(ink, 3, baseline, w - 6, { pen: 'rose.fine', kind: 'single', opts: { alpha: 0.82 } })
    underline(ink, 2, baseline + 0.75, w - 4, {
      pen: 'horizonPencil.fine',
      kind: 'single',
      opts: { alpha: 0.42 },
    })
  })
}

export const accordionTriggerRecipe = defineRecipe<DisclosureTriggerParams>({
  id: 'accordion-trigger',
  kind: 'accordion-trigger',
  layers: ['rest', 'hover', 'open', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, params, ctx) {
    drawDisclosureTrigger(ink, w, h, params, ctx)
  },
})

export const collapsibleTriggerRecipe = defineRecipe<DisclosureTriggerParams>({
  id: 'collapsible-trigger',
  kind: 'collapsible-trigger',
  layers: ['rest', 'hover', 'open', 'focus', 'disabled'],
  lazy: ['focus'],
  pad: 8,
  draw(ink, { w, h }, params, ctx) {
    drawDisclosureTrigger(ink, w, h, params, ctx)
  },
})

export const accordionItemRecipe = defineRecipe<Record<string, never>>({
  id: 'accordion-item',
  kind: 'accordion-item',
  layers: ['rest'],
  pad: 4,
  draw(ink, { w, h }) {
    ink.layer('rest', () => {
      const y = h - 0.8
      line(ink, 2, y, w - 2, y, {
        pen: 'pencil.fine',
        loose: 0.5,
        opts: { alpha: 0.38, simple: w > 360, color: 'line-soft' },
      })
      line(ink, 3, y + 0.55, w - 3, y + 0.55, {
        pen: 'horizonPencil.fine',
        loose: 0.42,
        opts: { alpha: 0.2, simple: w > 360 },
      })
    })
  },
})

export const disclosureContentRecipe = defineRecipe<Record<string, never>>({
  id: 'disclosure-content',
  kind: 'disclosure-content',
  layers: ['rest'],
  pad: 8,
  draw(ink, { w, h }) {
    const r = clamp(Math.min(w, h) * 0.04, 3, 8)
    const body = roundRectPoly(1, 1, w - 2, h - 2, r)
    ink.layer('rest', () => {
      softFill(ink, body, [
        { color: 'sand-slip', alpha: 0.38, wobble: 0.42 },
        { color: 'sand-shade', alpha: 0.12, inset: 0.8 },
      ])
      wash(ink, body, 'horizon', { alpha: 0.06, material: 'wash', wobble: 0.55, inset: 1.2 })
    })
  },
})
