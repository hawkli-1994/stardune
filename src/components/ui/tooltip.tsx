"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"

import { useInk } from "@/lib/ink/react"
import { tooltipContentRecipe } from "@/lib/ink/recipes/tooltip-ink"
import { cn } from "@/lib/utils"

function TooltipProvider({
  delayDuration = 300,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(props: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: tooltipContentRecipe,
    params: {},
    kind: "tooltip",
    seed,
    still: true,
  })

  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-w-xs origin-[var(--radix-tooltip-content-transform-origin)] outline-none",
          "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
          "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
          className,
        )}
        {...props}
      >
        <div
          ref={hostRef}
          {...hostProps}
          className="relative isolate overflow-hidden rounded-[var(--radius-sm)] px-3 py-1.5 shadow-[0_8px_24px_-6px_rgb(var(--sd-shade)/0.22)]"
        >
          {node}
          <div className="relative z-[1] text-xs leading-snug text-foreground">{children}</div>
        </div>
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
