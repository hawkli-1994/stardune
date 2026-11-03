"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import {
  collapsibleTriggerRecipe,
  disclosureContentRecipe,
} from "@/lib/ink/recipes/disclosure-ink"
import { cn } from "@/lib/utils"

function Collapsible(props: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  className,
  seed,
  disabled,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: collapsibleTriggerRecipe,
    params: { disabled: !!disabled },
    kind: "collapsible-trigger",
    seed,
    still: true,
  })

  return (
    <CollapsiblePrimitive.Trigger
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      data-slot="collapsible-trigger"
      disabled={disabled}
      className={cn(
        "relative isolate flex w-full items-center justify-between gap-2 rounded-[var(--radius-sm)] px-2 py-2.5 text-start text-sm font-medium",
        "text-foreground hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-[1] shrink-0 text-muted-foreground transition-transform duration-(--sd-dur-pop)"
        aria-hidden
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </CollapsiblePrimitive.Trigger>
  )
}

function CollapsibleContent({
  className,
  children,
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: disclosureContentRecipe,
    params: {},
    kind: "disclosure-content",
    seed,
    still: true,
  })

  return (
    <CollapsiblePrimitive.Content
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down",
      )}
      {...props}
    >
      <div className={cn("relative px-2 pb-3 pt-1", className)}>
        <div
          ref={hostRef}
          {...hostProps}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-sm)]"
          aria-hidden
        >
          {node}
        </div>
        <div className="relative z-[1] leading-relaxed">{children}</div>
      </div>
    </CollapsiblePrimitive.Content>
  )
}

export { Collapsible, CollapsibleContent, CollapsibleTrigger }
