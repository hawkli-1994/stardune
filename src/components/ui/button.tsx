"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { buttonRecipe } from "@/lib/ink/recipes/button-ink"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative isolate inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-[translate] duration-(--sd-dur-press) ease-out active:translate-y-(--sd-press-sink) disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "text-primary-foreground",
        destructive: "text-[var(--destructive-foreground,#fffcf9)]",
        outline: "text-foreground",
        secondary: "text-secondary-foreground",
        ghost: "text-foreground",
        link: "text-[var(--sd-link)] underline-offset-4 hover:text-[var(--sd-link-hover)] hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  seed,
  children,
  ref,
  onClick,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    seed?: string | number
  }) {
  const v = variant ?? "default"
  const s = size ?? "default"
  const pill = !!className && className.split(/\s+/).includes("rounded-full")
  const forced = "data-focus-visible" in props || "data-pressed" in props
  const { hostRef, hostProps, node } = useInk({
    recipe: buttonRecipe,
    params: { variant: v, size: s, disabled: !!disabled, shape: pill ? "pill" : "default" },
    kind: "button",
    seed,
    layers: forced ? "all" : undefined,
  })
  const mergedRef = useMergedRef<HTMLElement>(hostRef, ref as React.Ref<HTMLElement> | undefined)
  const shared = {
    "data-variant": v,
    "data-size": s,
    "data-shape": pill ? "pill" : undefined,
    "data-ink-sink": "self",
    className: cn(buttonVariants({ variant: v, size: s, className })),
    ref: mergedRef,
    ...hostProps,
    ...props,
  }

  if (asChild) {
    const inert = disabled
      ? {
          "aria-disabled": true as const,
          "data-disabled": "",
          tabIndex: -1,
          onClick: (e: React.MouseEvent<HTMLElement>) => e.preventDefault(),
        }
      : { onClick: onClick as React.MouseEventHandler<HTMLElement> | undefined }
    return (
      <Slot.Root data-slot="button" {...shared} {...inert}>
        <Slot.Slottable>{children}</Slot.Slottable>
        {node}
      </Slot.Root>
    )
  }

  return (
    <button data-slot="button" {...shared} disabled={disabled} onClick={onClick}>
      {node}
      {children}
    </button>
  )
}

export { Button, buttonVariants }
