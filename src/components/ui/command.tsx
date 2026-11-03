"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useInk, useInkSeed, useMergedRef } from "@/lib/ink/react"
import {
  commandInputRecipe,
  commandItemRecipe,
  commandPanelRecipe,
} from "@/lib/ink/recipes/command-ink"
import { cn } from "@/lib/utils"

function Command({
  className,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: commandPanelRecipe,
    params: {},
    kind: "command",
    seed,
    still: true,
  })

  return (
    <CommandPrimitive
      ref={ref}
      data-slot="command"
      className={cn("relative flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-md)]", className)}
      {...props}
    >
      <div
        ref={hostRef}
        {...hostProps}
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
        aria-hidden
      >
        {node}
      </div>
      <div className="relative z-[1] flex h-full flex-col overflow-hidden">{children}</div>
    </CommandPrimitive>
  )
}

function CommandDialog({
  title = "Command palette",
  description = "Search for a command to run…",
  children,
  className,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <Dialog {...props}>
      <DialogContent bare className={cn("max-w-lg overflow-hidden p-0", className)}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command className="shadow-[0_16px_48px_-12px_rgb(var(--sd-shade)/0.22)]">{children}</Command>
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input> & { seed?: string | number }) {
  const disabled = !!props.disabled
  const { hostRef, hostProps, node } = useInk({
    recipe: commandInputRecipe,
    params: { disabled },
    kind: "command-input",
    seed,
    still: true,
  })

  return (
    <div
      data-slot="command-input-wrapper"
      data-ink-focus="within"
      className="flex items-center border-b border-[color-mix(in_srgb,var(--sd-ink)_8%,transparent)] px-3"
      cmdk-input-wrapper=""
    >
      <span className="relative z-[1] me-2 text-muted-foreground" aria-hidden>
        ⌕
      </span>
      <span
        ref={hostRef}
        {...hostProps}
        className="relative isolate my-2 flex h-8 min-w-0 flex-1 items-center rounded-[var(--radius-sm)]"
      >
        {node}
        <CommandPrimitive.Input
          ref={ref}
          data-slot="command-input"
          className={cn(
            "relative z-[1] h-full w-full bg-transparent px-2 text-sm outline-none",
            "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
          {...props}
        />
      </span>
    </div>
  )
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn("max-h-72 overflow-x-hidden overflow-y-auto p-1", className)}
      {...props}
    />
  )
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm text-muted-foreground"
      {...props}
    />
  )
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CommandSeparator({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 my-1 h-px bg-[color-mix(in_srgb,var(--sd-line-soft)_80%,transparent)]", className)}
      {...props}
    />
  )
}

function CommandItem({
  className,
  disabled,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item> & { seed?: string | number }) {
  const itemSeed = useInkSeed(seed)
  const { hostRef, hostProps, node } = useInk({
    recipe: commandItemRecipe,
    params: { disabled: !!disabled },
    kind: "menu-item",
    seed: itemSeed,
    still: true,
  })

  return (
    <CommandPrimitive.Item
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      data-slot="command-item"
      disabled={disabled}
      className={cn(
        "relative isolate flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none",
        "text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        className,
      )}
      {...props}
    >
      {node}
      <span className="relative z-[1]">{children}</span>
    </CommandPrimitive.Item>
  )
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn("ms-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}
