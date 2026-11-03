"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { radioRecipe } from "@/lib/ink/recipes/radio-ink"
import { cn } from "@/lib/utils"

const RadioGroupContext = React.createContext({ invalid: false, disabled: false })

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const value = React.useMemo(() => ({ invalid, disabled: !!props.disabled }), [invalid, props.disabled])
  return (
    <RadioGroupContext.Provider value={value}>
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        className={cn("grid gap-3", className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  )
}

function RadioGroupItem({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & { seed?: string | number }) {
  const group = React.useContext(RadioGroupContext)
  const invalid =
    props["aria-invalid"] === true || props["aria-invalid"] === "true" || (group.invalid && props["aria-invalid"] === undefined)
  const off = !!disabled || group.disabled
  const { hostRef, hostProps, node } = useInk({
    recipe: radioRecipe,
    params: { disabled: off, invalid },
    kind: "radio",
    seed,
    still: true,
  })

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      disabled={disabled}
      className={cn(
        "peer relative isolate aspect-square size-4 shrink-0 disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {node}
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="pointer-events-none absolute inset-0 hidden forced-colors:block"
      />
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
