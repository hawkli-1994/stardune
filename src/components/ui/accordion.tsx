"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import {
  accordionItemRecipe,
  accordionTriggerRecipe,
  disclosureContentRecipe,
} from "@/lib/ink/recipes/disclosure-ink"
import { cn } from "@/lib/utils"

function Accordion(props: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: accordionItemRecipe,
    params: {},
    kind: "accordion-item",
    seed,
    still: true,
  })

  return (
    <AccordionPrimitive.Item
      ref={ref}
      data-slot="accordion-item"
      className={cn("relative border-b-0", className)}
      {...props}
    >
      <div
        ref={hostRef}
        {...hostProps}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-3 overflow-hidden"
        aria-hidden
      >
        {node}
      </div>
      {children}
    </AccordionPrimitive.Item>
  )
}

function AccordionHeader({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Header>) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn("flex", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  seed,
  disabled,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: accordionTriggerRecipe,
    params: { disabled: !!disabled },
    kind: "accordion-trigger",
    seed,
    still: true,
  })

  return (
    <AccordionPrimitive.Trigger
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      data-slot="accordion-trigger"
      disabled={disabled}
      className={cn(
        "relative isolate flex flex-1 items-center justify-between gap-2 rounded-[var(--radius-sm)] py-3 ps-1 pe-2 text-start text-sm font-medium",
        "text-foreground transition-all hover:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60",
        "[&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1] flex flex-1 items-center gap-2">{children}</span>
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
    </AccordionPrimitive.Trigger>
  )
}

function AccordionContent({
  className,
  children,
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: disclosureContentRecipe,
    params: {},
    kind: "disclosure-content",
    seed,
    still: true,
  })

  return (
    <AccordionPrimitive.Content
      ref={ref}
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      )}
      {...props}
    >
      <div className={cn("relative pb-4 pt-0", className)}>
        <div
          ref={hostRef}
          {...hostProps}
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-sm)]"
          aria-hidden
        >
          {node}
        </div>
        <div className="relative z-[1] px-1 leading-relaxed">{children}</div>
      </div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger }
