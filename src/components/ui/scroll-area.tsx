"use client"

import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { scrollThumbRecipe, type ScrollThumbOrientation } from "@/lib/ink/recipes/scroll-area-ink"
import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaViewport>{children}</ScrollAreaViewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  seed,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar> & { seed?: string | number }) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-0.5 transition-colors select-none",
        orientation === "vertical" && "h-full w-2.5 border-l border-transparent",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-transparent",
        className,
      )}
      {...props}
    >
      <ScrollThumb orientation={orientation === "horizontal" ? "horizontal" : "vertical"} seed={seed} />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

function ScrollThumb({
  orientation,
  seed,
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Thumb> & {
  orientation: ScrollThumbOrientation
  seed?: string | number
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: scrollThumbRecipe,
    params: { orientation },
    kind: "scroll-thumb",
    seed,
    still: true,
  })

  return (
    <ScrollAreaPrimitive.Thumb
      data-slot="scroll-area-thumb"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      className={cn("relative isolate rounded-full bg-transparent", className)}
      {...props}
    >
      {node}
    </ScrollAreaPrimitive.Thumb>
  )
}

function ScrollAreaViewport({ className, ref, ...props }: React.ComponentProps<typeof ScrollAreaPrimitive.Viewport>) {
  return (
    <ScrollAreaPrimitive.Viewport
      data-slot="scroll-area-viewport"
      ref={ref}
      className={cn("size-full rounded-[inherit] outline-none", className)}
      {...props}
    />
  )
}

export { ScrollArea, ScrollAreaViewport, ScrollBar }
