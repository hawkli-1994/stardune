"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"

import { useInk } from "@/lib/ink/react"
import { toastSurfaceRecipe } from "@/lib/ink/recipes/toast-ink"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitive.Provider

function ToastViewport({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Viewport>) {
  return (
    <ToastPrimitive.Viewport
      ref={ref}
      data-slot="toast-viewport"
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]",
        className,
      )}
      {...props}
    />
  )
}

function Toast({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Root>) {
  return (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast"
      className={cn(
        "group pointer-events-auto relative w-full overflow-hidden outline-none",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
        "data-[state=closed]:fade-out-80 data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        "data-[state=closed]:slide-out-to-right-full data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=cancel]:translate-x-0",
        className,
      )}
      {...props}
    />
  )
}

function ToastSurface({
  className,
  seed,
  children,
}: {
  className?: string
  seed?: string | number
  children: React.ReactNode
}) {
  const { hostRef, hostProps, node } = useInk({
    recipe: toastSurfaceRecipe,
    params: {},
    kind: "toast",
    seed,
    still: true,
  })

  return (
    <div
      ref={hostRef}
      {...hostProps}
      className={cn(
        "relative isolate overflow-hidden rounded-[var(--radius-md)] shadow-[0_12px_36px_-10px_rgb(var(--sd-shade)/0.24)]",
        className,
      )}
    >
      {node}
      <div className="relative z-[1] grid gap-1 p-4 pr-8">{children}</div>
    </div>
  )
}

function ToastTitle({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      ref={ref}
      data-slot="toast-title"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      ref={ref}
      data-slot="toast-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitive.Action>) {
  return (
    <ToastPrimitive.Action
      ref={ref}
      data-slot="toast-action"
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-border bg-transparent px-3 text-sm font-medium transition-colors",
        "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  )
}

function ToastClose({ className, ref, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      ref={ref}
      data-slot="toast-close"
      className={cn(
        "absolute top-2 right-2 rounded-md p-1 text-muted-foreground opacity-70 transition-opacity hover:text-foreground hover:opacity-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      toast-close=""
      {...props}
    >
      <span className="sr-only">Close</span>
      <span aria-hidden className="text-base leading-none">
        ×
      </span>
    </ToastPrimitive.Close>
  )
}

type ToastActionElement = React.ReactElement<typeof ToastAction>

function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, action, seed, ...props }) => (
        <Toast key={id} {...props}>
          <ToastSurface seed={seed ?? id}>
            {title ? <ToastTitle>{title}</ToastTitle> : null}
            {description ? <ToastDescription>{description}</ToastDescription> : null}
            {action}
          </ToastSurface>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  )
}

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastSurface,
  ToastTitle,
  ToastViewport,
  Toaster,
  type ToastActionElement,
}
