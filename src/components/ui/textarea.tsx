"use client"

import * as React from "react"

import { useInk } from "@/lib/ink/react"
import { textareaRecipe } from "@/lib/ink/recipes/textarea-ink"
import { cn } from "@/lib/utils"

const controlClass =
  "min-h-[4.5rem] w-full min-w-0 flex-1 resize-y appearance-none border-0 bg-transparent px-3 py-2 text-sm leading-relaxed text-foreground outline-none " +
  "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 field-sizing-content"

const frameClass =
  "relative isolate flex min-h-16 w-full min-w-0 items-stretch rounded-[var(--radius-md)] caret-[var(--sd-caret)]"

function Textarea({
  className,
  seed,
  style,
  ref,
  ...props
}: React.ComponentProps<"textarea"> & { seed?: string | number }) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const { hostRef, hostProps, node } = useInk({
    recipe: textareaRecipe,
    params: { disabled: !!props.disabled, invalid, readOnly: !!props.readOnly },
    kind: "field",
    seed,
    still: true,
  })

  return (
    <span
      data-slot="textarea-frame"
      data-ink-focus="within"
      ref={hostRef}
      {...hostProps}
      style={style}
      className={cn(frameClass, className)}
    >
      {node}
      <textarea data-slot="textarea" ref={ref} className={controlClass} {...props} />
    </span>
  )
}

export { Textarea }
