import { roundRectPoly } from '@/lib/ink/geom'
import { box } from '@/lib/ink/shapes'
import { clamp } from '@/lib/ink/rng'
import type { Ink } from '@/lib/ink/builder'
import { softFill } from '@/lib/ink/recipes/wash-utils'

export type PanelTone = 'default' | 'lifted'

/** Sand-slip panel fill + double loose border (Card / Dialog / Popover). */
export function drawSandSlipPanel(ink: Ink, w: number, h: number, tone: PanelTone = 'default') {
  const r = clamp(Math.min(w, h) * 0.04, 5, 12)
  const inset = 0.7
  const body = roundRectPoly(inset, inset, w - 2 * inset, h - 2 * inset, r)

  ink.part('fill', () => {
    softFill(ink, body, [
      { color: 'sand-slip', alpha: tone === 'lifted' ? 0.9 : 0.78, wobble: 0.5 },
      { color: 'sand', alpha: 0.32, inset: 1.2, wobble: 0.65 },
      { color: 'wash-gold', alpha: 0.08, inset: 2.4, wobble: 1.1 },
    ])
  })
  box(ink, 0.65, 0.65, w - 1.3, h - 1.3, {
    pen: 'pencil.fine',
    corner: r,
    loose: 1.15,
    opts: { alpha: 0.52, wobble: 0.42, simple: w > 420 },
  })
  box(ink, 1.4, 1.4, w - 2.8, h - 2.8, {
    pen: 'ink.fine',
    corner: Math.max(2, r - 1),
    loose: 1.25,
    opts: { alpha: 0.22, wobble: 0.5, simple: true, color: 'line-soft' },
  })
}
