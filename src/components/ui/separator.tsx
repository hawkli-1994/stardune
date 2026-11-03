"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { separatorRecipe, type SeparatorOrientation } from "@/lib/ink/recipes/separator-ink"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & { seed?: string | number }) {
  const o: SeparatorOrientation = orientation === "vertical" ? "vertical" : "horizontal"
  const { hostRef, hostProps, node } = useInk({
    recipe: separatorRecipe,
    params: { orientation: o },
    kind: "separator",
    seed,
    still: true,
  })

  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "relative isolate shrink-0",
        o === "horizontal" ? "h-3 w-full" : "h-full min-h-16 w-3 self-stretch",
        className,
      )}
      {...props}
    >
      {node}
    </SeparatorPrimitive.Root>
  )
}

export { Separator }
