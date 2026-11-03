"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { useInk } from "@/lib/ink/react"
import { popoverContentRecipe } from "@/lib/ink/recipes/popover-ink"
import { cn } from "@/lib/utils"

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverAnchor(props: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 6,
  seed,
  bare = false,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & { seed?: string | number; bare?: boolean }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: popoverContentRecipe,
    params: {},
    kind: 'popover',
    seed,
    still: true,
  })
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-72 outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          bare && "w-auto border-0 bg-transparent p-0 shadow-none",
          className,
        )}
        {...props}
      >
        {bare ? (
          children
        ) : (
          <div
            ref={hostRef}
            {...hostProps}
            className="relative isolate overflow-hidden rounded-[var(--radius-md)] p-4 shadow-[0_10px_32px_-8px_rgb(var(--sd-shade)/0.2)]"
          >
            {node}
            <div className="relative z-[1] text-sm">{children}</div>
          </div>
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
