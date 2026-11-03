"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { badgeRecipe } from "@/lib/ink/recipes/badge-ink"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "relative isolate inline-flex shrink-0 items-center justify-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-colors [&>svg]:size-3 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-[var(--primary-foreground,#fffcf9)]",
        secondary: "text-secondary-foreground",
        destructive: "text-[var(--destructive-foreground,#fffcf9)]",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  seed,
  ref,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean
    seed?: string | number
  }) {
  const v = variant ?? "default"
  const { hostRef, hostProps, node } = useInk({
    recipe: badgeRecipe,
    params: { variant: v },
    kind: "badge",
    seed,
    still: true,
  })
  const mergedRef = useMergedRef<HTMLElement>(hostRef, ref as React.Ref<HTMLElement> | undefined)
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={v}
      ref={mergedRef}
      {...hostProps}
      className={cn(badgeVariants({ variant: v, className }))}
      {...props}
    >
      {node}
      {props.children}
    </Comp>
  )
}

export { Badge, badgeVariants }
