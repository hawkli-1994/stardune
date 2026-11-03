"use client"

import * as React from "react"

import { useInk } from "@/lib/ink/react"
import { tableSurfaceRecipe } from "@/lib/ink/recipes/table-ink"
import { cn } from "@/lib/utils"

function Table({
  className,
  seed,
  ref,
  ...props
}: React.ComponentProps<"table"> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: tableSurfaceRecipe,
    params: {},
    kind: "table",
    seed,
    still: true,
  })

  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto rounded-[var(--radius-md)]">
      <div
        ref={hostRef}
        {...hostProps}
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-md)]"
        aria-hidden
      >
        {node}
      </div>
      <table
        ref={ref}
        data-slot="table"
        className={cn("relative z-[1] w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b-0", className)} {...props} />
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-[color-mix(in_srgb,var(--sd-ink)_8%,transparent)] font-medium", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-[color-mix(in_srgb,var(--sd-ink)_6%,transparent)] transition-colors",
        "hover:bg-[color-mix(in_srgb,var(--sd-rose-wash)_12%,transparent)] data-[state=selected]:bg-[color-mix(in_srgb,var(--sd-rose-wash)_18%,transparent)]",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-start align-middle text-xs font-semibold tracking-wide text-muted-foreground uppercase",
        "[&:has([role=checkbox])]:pe-0",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn("px-3 py-2.5 align-middle text-foreground [&:has([role=checkbox])]:pe-0", className)}
      {...props}
    />
  )
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("relative z-[1] mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }
