import { underline } from '@/lib/ink/shapes'
import { defineRecipe } from '@/lib/ink/recipes'

/** Optional decorative underline only — label text stays native for a11y. */
export const labelRecipe = defineRecipe<Record<string, never>>({
  id: 'label',
  kind: 'label',
  layers: ['rest'],
  pad: 4,
  draw(ink, { w, h }) {
    ink.layer('rest', () => {
      underline(ink, w * 0.02, h - 1.5, w * 0.96, {
        pen: 'rose.fine',
        kind: 'single',
        opts: { alpha: 0.32, wobble: 0.28 },
      })
    })
  },
})
