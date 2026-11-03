"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { selectContentRecipe, selectTriggerRecipe } from "@/lib/ink/recipes/select-ink"
import { cn } from "@/lib/utils"

const SelectDisabledContext = React.createContext(false)

function Select(props: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return (
    <SelectDisabledContext.Provider value={!!props.disabled}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectDisabledContext.Provider>
  )
}

function SelectGroup(props: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" className={cn("scroll-my-1", props.className)} {...props} />
}

function SelectValue(props: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
  seed?: string | number
}) {
  const invalid = props["aria-invalid"] === true || props["aria-invalid"] === "true"
  const disabled = React.useContext(SelectDisabledContext) || !!props.disabled
  const { hostRef, hostProps, node } = useInk({
    recipe: selectTriggerRecipe,
    params: { disabled, invalid },
    kind: "field",
    seed,
    still: true,
  })

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      className={cn(
        "relative isolate flex h-9 w-full min-w-[8rem] items-center justify-between gap-2 rounded-[var(--radius-md)] ps-3 pe-2 text-start text-sm whitespace-nowrap",
        "text-foreground disabled:cursor-not-allowed disabled:opacity-70 data-[placeholder]:text-muted-foreground",
        "focus-visible:outline-none data-[size=sm]:h-8",
        "*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:flex-1",
        className,
      )}
      {...props}
    >
      {node}
      {children}
      <SelectPrimitive.Icon data-slot="select-icon" className="shrink-0 opacity-60" aria-hidden>
        ▾
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  seed,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: selectContentRecipe,
    params: {},
    kind: "select-panel",
    seed,
    still: true,
  })

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden text-popover-foreground",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        {...props}
      >
        <div
          ref={hostRef}
          {...hostProps}
          className="relative isolate overflow-hidden rounded-[var(--radius-md)] p-1"
        >
          {node}
          <SelectPrimitive.Viewport className="relative z-[1]">{children}</SelectPrimitive.Viewport>
        </div>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({ className, children, ...props }: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 ps-2 pe-8 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_45%,transparent)] focus:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute end-2 inline-flex items-center justify-center" aria-hidden>
        ✓
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-[var(--sd-line-soft)]", className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
