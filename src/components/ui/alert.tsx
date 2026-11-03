"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { alertRecipe } from "@/lib/ink/recipes/alert-ink"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative isolate w-full overflow-hidden rounded-[var(--radius-md)] px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "text-foreground",
        success: "text-foreground",
        warning: "text-foreground",
        destructive: "text-foreground",
        info: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Alert({
  className,
  variant,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants> & {
    seed?: string | number
  }) {
  const v = variant ?? "default"
  const { hostRef, hostProps, node } = useInk({
    recipe: alertRecipe,
    params: { variant: v },
    kind: "alert",
    seed,
    still: true,
  })

  return (
    <div
      data-slot="alert"
      role="alert"
      ref={useMergedRef<HTMLDivElement>(hostRef, ref)}
      {...hostProps}
      data-variant={v}
      className={cn(alertVariants({ variant: v, className }))}
      {...props}
    >
      {node}
      <div className="relative z-[1] grid gap-1">{children}</div>
    </div>
  )
}

function AlertTitle({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      ref={ref}
      className={cn("font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

function AlertDescription({ className, ref, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      ref={ref}
      className={cn("text-muted-foreground [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
}

export { Alert, AlertDescription, AlertTitle, alertVariants }
