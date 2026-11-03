"use client"

import * as React from "react"
import { Dialog as SheetPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { useInk } from "@/lib/ink/react"
import { sheetContentRecipe } from "@/lib/ink/recipes/sheet-ink"
import { cn } from "@/lib/utils"

function Sheet(props: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger(props: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose(props: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal(props: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

const sheetOverlayClass =
  "fixed inset-0 z-50 bg-[radial-gradient(ellipse_90%_80%_at_50%_38%,color-mix(in_srgb,var(--sd-sky-dusk)_42%,transparent),color-mix(in_srgb,var(--sd-well)_28%,rgb(var(--sd-shade)/0.45)))] " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"

function SheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return <SheetPrimitive.Overlay data-slot="sheet-overlay" className={cn(sheetOverlayClass, className)} {...props} />
}

const sheetContentVariants = cva(
  "fixed z-50 outline-none duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

function SheetContent({
  className,
  children,
  side = "right",
  seed,
  ref,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetContentVariants> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: sheetContentRecipe,
    params: { tone: "lifted" },
    kind: "sheet",
    seed,
    still: true,
  })

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        <div
          ref={hostRef}
          {...hostProps}
          className={cn(
            "relative isolate flex h-full flex-col overflow-hidden shadow-[0_16px_48px_-12px_rgb(var(--sd-shade)/0.22)]",
            side === "top" || side === "bottom" ? "rounded-b-[var(--radius-lg)] rounded-t-[var(--radius-lg)] p-6" : "h-full p-6",
            side === "left" ? "rounded-r-[var(--radius-lg)]" : "",
            side === "right" ? "rounded-l-[var(--radius-lg)]" : "",
          )}
        >
          {node}
          <div className="relative z-[1] flex flex-1 flex-col gap-4 overflow-y-auto">{children}</div>
        </div>
        <SheetPrimitive.Close className="absolute top-4 right-4 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="sr-only">Close</span>
          <span aria-hidden className="text-lg leading-none">
            ×
          </span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sheet-header" className={cn("flex flex-col gap-2 text-center sm:text-start", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title data-slot="sheet-title" className={cn("text-lg font-semibold text-foreground", className)} {...props} />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
