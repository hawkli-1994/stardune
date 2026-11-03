import type { Ink } from '@/lib/ink/builder'
import type { Pt } from '@/lib/ink/types'
import type { PaintKey } from '@/lib/ink/paint'
import { wash } from '@/lib/ink/fills'

export function softFill(
  ink: Ink,
  body: Pt[],
  layers: Array<{ color: PaintKey; alpha: number; inset?: number; wobble?: number }>,
) {
  for (const layer of layers) {
    wash(ink, body, layer.color, {
      alpha: layer.alpha,
      inset: layer.inset ?? 0.4,
      wobble: layer.wobble ?? 0.95,
      material: 'wash',
    })
  }
}
