"use client"

import * as React from "react"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { skeletonRecipe } from "@/lib/ink/recipes/skeleton-ink"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  seed,
  ref,
  ...props
}: React.ComponentProps<"div"> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: skeletonRecipe,
    params: {},
    kind: "skeleton",
    seed,
    still: true,
  })

  return (
    <div
      data-slot="skeleton"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      aria-busy="true"
      data-loading=""
      className={cn("sd-skeleton relative isolate overflow-hidden rounded-md", className)}
      {...props}
    >
      {node}
    </div>
  )
}

export { Skeleton }
