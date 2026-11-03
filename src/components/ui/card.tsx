"use client"

import * as React from "react"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { cardRecipe } from "@/lib/ink/recipes/card-ink"
import { cn } from "@/lib/utils"

function Card({
  className,
  seed,
  tone = "default",
  children,
  ref,
  ...props
}: React.ComponentProps<"div"> & {
  seed?: string | number
  tone?: "default" | "lifted"
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: cardRecipe,
    params: { tone },
    kind: "card",
    seed,
    still: true,
  })
  const mergedRef = useMergedRef<HTMLDivElement>(hostRef, ref)

  return (
    <div
      data-slot="card"
      ref={mergedRef}
      {...hostProps}
      className={cn("relative isolate flex flex-col gap-6 py-6 text-card-foreground", className)}
      {...props}
    >
      {node}
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn("flex items-center px-6 pt-0", className)} {...props} />
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
