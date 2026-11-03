"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { checkboxRecipe } from "@/lib/ink/recipes/checkbox-ink"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
  seed?: string | number
}) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const { hostRef, hostProps, node } = useInk({
    recipe: checkboxRecipe,
    params: { disabled: !!disabled, invalid },
    kind: "checkbox",
    seed,
    still: true,
  })
  const mergedRef = useMergedRef<HTMLButtonElement>(hostRef, ref)

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      ref={mergedRef}
      {...hostProps}
      disabled={disabled}
      className={cn(
        "peer relative isolate size-4 shrink-0 rounded-[3px] disabled:cursor-not-allowed",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {node}
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="pointer-events-none absolute inset-0 hidden forced-colors:grid forced-colors:data-[state=checked]:before:content-['✓'] forced-colors:data-[state=indeterminate]:before:content-['–']"
      />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
