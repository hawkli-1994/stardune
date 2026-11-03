"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { switchRecipe, switchThumbRecipe } from "@/lib/ink/recipes/switch-ink"
import { cn } from "@/lib/utils"

function SwitchThumb({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Thumb> & { seed: string; disabled: boolean }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: switchThumbRecipe,
    params: { disabled },
    kind: "thumb",
    seed,
    still: true,
  })
  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      ref={useMergedRef<HTMLSpanElement>(hostRef, ref)}
      {...hostProps}
      className={cn(
        "pointer-events-none relative isolate block size-4 shrink-0 rounded-full transition-transform duration-(--sd-dur-pop) ease-out",
        "translate-x-0.5 data-[state=checked]:translate-x-[1.125rem]",
        className,
      )}
      {...props}
    >
      {node}
    </SwitchPrimitive.Thumb>
  )
}

function Switch({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { seed?: string | number }) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const { hostRef, hostProps, node, seed: hostSeed } = useInk({
    recipe: switchRecipe,
    params: { disabled: !!disabled, invalid },
    kind: "switch",
    seed,
    still: true,
  })

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      disabled={disabled}
      className={cn(
        "peer relative isolate inline-flex h-6 w-11 shrink-0 items-center disabled:cursor-not-allowed disabled:opacity-70",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      {node}
      <SwitchThumb seed={hostSeed} disabled={!!disabled} />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
