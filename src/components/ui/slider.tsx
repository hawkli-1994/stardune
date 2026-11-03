"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "radix-ui"

import { useInk, useInkSeed, useMergedRef } from "@/lib/ink/react"
import {
  sliderRangeRecipe,
  sliderThumbRecipe,
  sliderTrackRecipe,
} from "@/lib/ink/recipes/slider-ink"
import { cn } from "@/lib/utils"

function SliderTrack({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Track> & { seed: string; disabled: boolean }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: sliderTrackRecipe,
    params: { disabled },
    kind: "slider",
    seed: `${seed}-track`,
    still: true,
  })
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      ref={useMergedRef<HTMLSpanElement>(hostRef, ref)}
      {...hostProps}
      className={cn("relative isolate grow overflow-hidden rounded-full", className)}
      {...props}
    >
      {node}
    </SliderPrimitive.Track>
  )
}

function SliderRange({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Range> & { seed: string; disabled: boolean }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: sliderRangeRecipe,
    params: { disabled },
    kind: "range",
    seed: `${seed}-range`,
    still: true,
  })
  return (
    <SliderPrimitive.Range
      data-slot="slider-range"
      ref={useMergedRef<HTMLSpanElement>(hostRef, ref)}
      {...hostProps}
      className={cn("absolute h-full", className)}
      {...props}
    >
      {node}
    </SliderPrimitive.Range>
  )
}

function SliderThumb({
  className,
  seed,
  disabled,
  ref,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Thumb> & { seed: string; disabled: boolean }) {
  const { hostRef, hostProps, node } = useInk({
    recipe: sliderThumbRecipe,
    params: { disabled },
    kind: "thumb",
    seed: `${seed}-thumb`,
    still: true,
  })
  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      ref={useMergedRef<HTMLSpanElement>(hostRef, ref)}
      {...hostProps}
      className={cn(
        "relative isolate block size-4 shrink-0 rounded-full focus-visible:outline-none disabled:pointer-events-none disabled:opacity-70",
        className,
      )}
      {...props}
    >
      {node}
    </SliderPrimitive.Thumb>
  )
}

function Slider({
  className,
  seed,
  disabled,
  ref,
  defaultValue,
  value,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { seed?: string | number }) {
  const hostSeed = useInkSeed(seed)
  const thumbCount = value?.length ?? defaultValue?.length ?? 1

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      ref={ref}
      disabled={disabled}
      defaultValue={defaultValue}
      value={value}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderTrack
        seed={hostSeed}
        disabled={!!disabled}
        className="data-[orientation=horizontal]:h-2 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-2"
      >
        <SliderRange seed={hostSeed} disabled={!!disabled} />
      </SliderTrack>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderThumb key={i} seed={`${hostSeed}-${i}`} disabled={!!disabled} />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
