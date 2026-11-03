"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { labelRecipe } from "@/lib/ink/recipes/label-ink"
import { cn } from "@/lib/utils"

const labelClass = cn(
  "text-sm font-medium leading-none text-foreground select-none",
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
)

function LabelWithInk({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { hostRef, hostProps, node } = useInk({
    recipe: labelRecipe,
    params: {},
    kind: "label",
    still: true,
  })
  const mergedRef = useMergedRef<HTMLLabelElement>(hostRef, ref)

  return (
    <LabelPrimitive.Root
      data-slot="label"
      ref={mergedRef}
      {...hostProps}
      className={cn("relative isolate inline-flex min-h-[1.25rem] items-center", labelClass, className)}
      {...props}
    >
      {node}
      {children}
    </LabelPrimitive.Root>
  )
}

function Label({
  className,
  inkLine = false,
  ref,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & {
  /** Decorative rose ink underline (optional; default is typography-only). */
  inkLine?: boolean
}) {
  if (inkLine) {
    return <LabelWithInk className={className} ref={ref} {...props} />
  }

  return <LabelPrimitive.Root data-slot="label" ref={ref} className={cn(labelClass, className)} {...props} />
}

export { Label }
