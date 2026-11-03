"use client"

import * as React from "react"

import { useInk } from "@/lib/ink/react"
import { inputRecipe } from "@/lib/ink/recipes/input-ink"
import { cn } from "@/lib/utils"

const controlClass =
  "h-full w-full min-w-0 flex-1 appearance-none border-0 bg-transparent px-3 py-1 text-sm text-foreground outline-none " +
  "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 " +
  "file:border-0 file:bg-transparent file:text-sm file:font-medium " +
  "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"

const frameClass =
  "relative isolate flex h-9 w-full min-w-0 items-center rounded-[var(--radius-md)] " +
  "caret-[var(--sd-caret)]"

function Input({
  className,
  type,
  seed,
  style,
  ref,
  ...props
}: React.ComponentProps<"input"> & { seed?: string | number }) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const { hostRef, hostProps, node } = useInk({
    recipe: inputRecipe,
    params: { disabled: !!props.disabled, invalid, readOnly: !!props.readOnly },
    kind: "field",
    seed,
    still: true,
  })

  if (type === "hidden") {
    return <input type="hidden" ref={ref} className={className} {...props} />
  }

  return (
    <span
      data-slot="input-frame"
      data-ink-focus="within"
      ref={hostRef}
      {...hostProps}
      style={style}
      className={cn(frameClass, className)}
    >
      {node}
      <input data-slot="input" type={type} ref={ref} className={controlClass} {...props} />
    </span>
  )
}

export { Input }
