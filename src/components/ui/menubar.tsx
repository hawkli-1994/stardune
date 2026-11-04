"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "radix-ui"

import { useInk, useInkSeed, useMergedRef } from "@/lib/ink/react"
import {
  dropdownMenuContentRecipe,
  dropdownMenuItemRecipe,
} from "@/lib/ink/recipes/dropdown-menu-ink"
import { menubarRootRecipe, menubarTriggerRecipe } from "@/lib/ink/recipes/menubar-ink"
import { cn } from "@/lib/utils"

function Menubar({ className, ref, children, ...props }: React.ComponentProps<typeof MenubarPrimitive.Root>) {
  const { hostRef, hostProps, node } = useInk({
    recipe: menubarRootRecipe,
    params: {},
    kind: "menubar",
    still: true,
  })

  return (
    <MenubarPrimitive.Root
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      data-slot="menubar"
      className={cn("relative isolate flex h-10 items-center gap-1 rounded-[var(--radius-md)] p-1", className)}
      {...props}
    >
      {node}
      <div className="relative z-[1] flex items-center gap-1">{children}</div>
    </MenubarPrimitive.Root>
  )
}

function MenubarMenu(props: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...props} />
}

function MenubarGroup(props: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group data-slot="menubar-group" {...props} />
}

function MenubarPortal(props: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />
}

function MenubarTrigger({
  className,
  ref,
  children,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Trigger>) {
  const { hostRef, hostProps, node } = useInk({
    recipe: menubarTriggerRecipe,
    params: {},
    kind: "menu-trigger",
    still: true,
  })

  return (
    <MenubarPrimitive.Trigger
      ref={useMergedRef<HTMLButtonElement>(hostRef, ref)}
      {...hostProps}
      data-slot="menubar-trigger"
      className={cn(
        "relative isolate flex cursor-default select-none items-center rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium outline-none",
        "text-muted-foreground focus:text-foreground data-[state=open]:text-foreground",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
    </MenubarPrimitive.Trigger>
  )
}

function MenubarContentPanel({
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

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Content> & { seed?: string | number }) {
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        ref={ref}
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        <MenubarContentPanel seed={seed}>{children}</MenubarContentPanel>
      </MenubarPrimitive.Content>
    </MenubarPortal>
  )
}

function MenubarSub(props: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      data-slot="menubar-sub-trigger"
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
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.SubContent> & { seed?: string | number }) {
  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      data-slot="menubar-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className,
      )}
      {...props}
    >
      <MenubarContentPanel seed={seed}>{children}</MenubarContentPanel>
    </MenubarPrimitive.SubContent>
  )
}

function MenubarItem({
  className,
  inset,
  disabled,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Item> & {
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
    <MenubarPrimitive.Item
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      data-slot="menubar-item"
      disabled={disabled}
      className={cn(
        "relative isolate flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "ps-8",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
    </MenubarPrimitive.Item>
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.CheckboxItem>) {
  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_42%,transparent)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      checked={checked}
      {...props}
    >
      <MenubarPrimitive.ItemIndicator className="absolute start-2 inline-flex size-3.5 items-center justify-center">
        ✓
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioGroup(props: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioItem>) {
  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none",
        "focus:bg-[color-mix(in_srgb,var(--sd-rose-wash)_42%,transparent)]",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <MenubarPrimitive.ItemIndicator className="absolute start-2 inline-flex size-3.5 items-center justify-center">
        ●
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Label> & { inset?: boolean }) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground", inset && "ps-8", className)}
      {...props}
    />
  )
}

function MenubarSeparator({ className, ...props }: React.ComponentProps<typeof MenubarPrimitive.Separator>) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--sd-line-soft)_80%,transparent)]", className)}
      {...props}
    />
  )
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
