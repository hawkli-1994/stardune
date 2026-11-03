"use client"

import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"

import { useInk, useInkSeed, useMergedRef } from "@/lib/ink/react"
import {
  dropdownMenuContentRecipe,
  dropdownMenuItemRecipe,
} from "@/lib/ink/recipes/dropdown-menu-ink"
import { cn } from "@/lib/utils"

function DropdownMenu(props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal(props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuTrigger(props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuSub(props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuRadioGroup(props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_40%,transparent)] data-[state=open]:bg-[color-mix(in_srgb,var(--sd-rose-wash)_40%,transparent)]",
        inset && "ps-8",
        className,
      )}
      {...props}
    >
      {children}
      <span className="ms-auto text-xs opacity-60" aria-hidden>
        ›
      </span>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuContentPanel({
  seed,
  children,
}: {
  seed?: string | number
  children: React.ReactNode
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: dropdownMenuContentRecipe,
    params: {},
    kind: "dropdown-menu",
    seed,
    still: true,
  })
  return (
    <div
      ref={hostRef}
      {...hostProps}
      className="relative isolate overflow-hidden rounded-[var(--radius-md)] p-1 shadow-[0_10px_32px_-8px_rgb(var(--sd-shade)/0.2)]"
    >
      {node}
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & { seed?: string | number }) {
  return (
    <DropdownMenuPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-hidden outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        <DropdownMenuContentPanel seed={seed}>{children}</DropdownMenuContentPanel>
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPortal>
  )
}

function DropdownMenuSubContent({
  className,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & { seed?: string | number }) {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    >
      <DropdownMenuContentPanel seed={seed}>{children}</DropdownMenuContentPanel>
    </DropdownMenuPrimitive.SubContent>
  )
}

function DropdownMenuItem({
  className,
  inset,
  disabled,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  seed?: string | number
}) {
  const itemSeed = useInkSeed(seed)
  const { hostRef, hostProps, node } = useInk({
    recipe: dropdownMenuItemRecipe,
    params: { disabled: !!disabled },
    kind: "menu-item",
    seed: itemSeed,
    still: true,
  })

  return (
    <DropdownMenuPrimitive.Item
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      data-slot="dropdown-menu-item"
      disabled={disabled}
      className={cn(
        "relative isolate flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "focus:text-foreground",
        inset && "ps-8",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_42%,transparent)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="absolute start-2 inline-flex size-3.5 items-center justify-center">
        ✓
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_42%,transparent)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className="absolute start-2 inline-flex size-3.5 items-center justify-center">
        ●
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", inset && "ps-8", className)}
      {...props}
    />
  )
}

function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--sd-line-soft)_80%,transparent)]", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

function DropdownMenuItemIndicator(props: React.ComponentProps<typeof DropdownMenuPrimitive.ItemIndicator>) {
  return <DropdownMenuPrimitive.ItemIndicator data-slot="dropdown-menu-item-indicator" {...props} />
}

function DropdownMenuArrow(props: React.ComponentProps<typeof DropdownMenuPrimitive.Arrow>) {
  return <DropdownMenuPrimitive.Arrow data-slot="dropdown-menu-arrow" {...props} />
}

export {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
