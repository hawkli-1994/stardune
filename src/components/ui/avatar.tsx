"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { useInk, useMergedRef } from "@/lib/ink/react"
import { avatarRingRecipe } from "@/lib/ink/recipes/avatar-ink"
import { cn } from "@/lib/utils"

function Avatar({
  className,
  seed,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & { seed?: string | number }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: avatarRingRecipe,
    params: {},
    kind: "avatar",
    seed,
    still: true,
  })

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      ref={useMergedRef<HTMLSpanElement>(hostRef, ref)}
      {...hostProps}
      className={cn("relative isolate flex size-10 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {node}
      {children}
    </AvatarPrimitive.Root>
  )
}

function AvatarImage({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      ref={ref}
      className={cn("relative z-[1] aspect-square size-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ref, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      ref={ref}
      className={cn(
        "relative z-[1] flex size-full items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--sd-sand-slip)_55%,transparent)] text-sm font-medium text-foreground",
        className,
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarFallback, AvatarImage }
