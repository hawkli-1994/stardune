"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "radix-ui"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export type ComboboxOption = {
  value: string
  label: string
  keywords?: string[]
}

function ComboboxPopoverContent({
  className,
  align = "start",
  sideOffset = 4,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="combobox-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-[var(--radix-popover-trigger-width)] min-w-[12rem] outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  className,
  disabled,
}: {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  className?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full max-w-xs justify-between font-normal", className)}
        >
          <span className="truncate">{selected ? selected.label : placeholder}</span>
          <span className="shrink-0 opacity-60" aria-hidden>
            ▾
          </span>
        </Button>
      </PopoverPrimitive.Trigger>
      <ComboboxPopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  keywords={option.keywords ?? [option.label]}
                  onSelect={(current) => {
                    onValueChange?.(current === value ? "" : current)
                    setOpen(false)
                  }}
                >
                  {option.label}
                  {value === option.value ? (
                    <span className="ms-auto text-xs text-muted-foreground" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </ComboboxPopoverContent>
    </PopoverPrimitive.Root>
  )
}

export { Combobox, ComboboxPopoverContent }
