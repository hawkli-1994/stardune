"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { progressFillRecipe, progressTrackRecipe } from "@/lib/ink/recipes/progress-ink"
import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { seed?: string | number }) {
  const disabled = props["aria-disabled"] === true || props["aria-disabled"] === "true"
  const { hostRef, hostProps, node, seed: hostSeed } = useInk({
    recipe: progressTrackRecipe,
    params: { disabled },
    kind: "progress",
    seed,
    still: true,
  })

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      value={value}
      className={cn("relative isolate h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      {node}
      <ProgressIndicator value={value} seed={hostSeed} disabled={disabled} />
    </ProgressPrimitive.Root>
  )
}

function ProgressIndicator({
  value,
  seed,
  disabled,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Indicator> & {
  value?: number | null
  seed: string
  disabled?: boolean
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: progressFillRecipe,
    params: { disabled: !!disabled },
    kind: "progress-fill",
    seed: `${seed}-fill`,
    still: true,
  })

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      className={cn("h-full w-full flex-1 transition-transform duration-(--sd-dur-pop) ease-out", className)}
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      {...props}
    >
      {node}
    </ProgressPrimitive.Indicator>
  )
}

export { Progress }
