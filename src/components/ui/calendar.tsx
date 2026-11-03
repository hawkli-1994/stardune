"use client"

import * as React from "react"
import { DayPicker, getDefaultClassNames, type DayPickerProps } from "react-day-picker"

import { buttonVariants } from "@/components/ui/button"
import { useInk } from "@/lib/ink/react"
import { calendarPanelRecipe } from "@/lib/ink/recipes/calendar-ink"
import { cn } from "@/lib/utils"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  seed,
  ...props
}: DayPickerProps & { seed?: string | number }) {
  const defaults = getDefaultClassNames()
  const { hostRef, hostProps, node } = useInk({
    recipe: calendarPanelRecipe,
    params: {},
    kind: "calendar",
    seed,
    still: true,
  })

  return (
    <div data-slot="calendar" className={cn("relative w-fit", className)}>
      <div
        ref={hostRef}
        {...hostProps}
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[var(--radius-md)]"
        aria-hidden
      >
        {node}
      </div>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("relative z-[1] p-3 [--cell-size:2rem]")}
        classNames={{
          root: cn("w-fit", defaults.root),
          months: cn("relative flex flex-col gap-4 sm:flex-row", defaults.months),
          month: cn("flex w-full flex-col gap-3", defaults.month),
          month_caption: cn("relative flex h-8 items-center justify-center px-8", defaults.month_caption),
          caption_label: cn("text-sm font-semibold text-foreground", defaults.caption_label),
          nav: cn("absolute inset-x-0 top-0 flex items-center justify-between", defaults.nav),
          button_previous: cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-8 text-muted-foreground hover:text-foreground",
            defaults.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-8 text-muted-foreground hover:text-foreground",
            defaults.button_next,
          ),
          weekdays: cn("flex", defaults.weekdays),
          weekday: cn(
            "text-muted-foreground flex-1 select-none rounded-md text-[0.7rem] font-medium uppercase tracking-wide",
            defaults.weekday,
          ),
          week: cn("mt-1 flex w-full", defaults.week),
          day: cn(
            "relative flex flex-1 items-center justify-center p-0 text-center text-sm",
            defaults.day,
          ),
          day_button: cn(
            "relative size-[var(--cell-size)] rounded-md border border-transparent p-0 font-normal transition-colors",
            "text-foreground hover:border-[color-mix(in_srgb,var(--sd-pencil)_35%,transparent)]",
            "hover:bg-[color-mix(in_srgb,var(--sd-rose-wash)_22%,transparent)]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "aria-selected:border-[color-mix(in_srgb,var(--sd-rose)_25%,transparent)]",
            "aria-selected:bg-[color-mix(in_srgb,var(--sd-rose-wash)_48%,transparent)]",
            "aria-selected:font-medium aria-selected:text-foreground",
            "data-[today=true]:ring-1 data-[today=true]:ring-[var(--sd-horizon)]",
            "data-[today=true]:ring-offset-1 data-[today=true]:ring-offset-[color-mix(in_srgb,var(--sd-sand-slip)_60%,transparent)]",
            "data-[outside=true]:text-muted-foreground/50 data-[outside=true]:aria-selected:bg-[color-mix(in_srgb,var(--sd-rose-wash)_28%,transparent)]",
            "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-40",
            defaults.day_button,
          ),
          selected: cn("font-medium", defaults.selected),
          today: cn("font-medium", defaults.today),
          outside: cn("text-muted-foreground/50", defaults.outside),
          disabled: cn("opacity-40", defaults.disabled),
          range_start: cn(
            "rounded-s-md bg-[color-mix(in_srgb,var(--sd-rose-wash)_48%,transparent)]",
            defaults.range_start,
          ),
          range_middle: cn(
            "rounded-none bg-[color-mix(in_srgb,var(--sd-rose-wash)_28%,transparent)]",
            defaults.range_middle,
          ),
          range_end: cn(
            "rounded-e-md bg-[color-mix(in_srgb,var(--sd-rose-wash)_48%,transparent)]",
            defaults.range_end,
          ),
          ...classNames,
        }}
        components={{
          Chevron: ({ orientation, className: chevronClass }) => (
            <span
              className={cn("inline-flex size-4 items-center justify-center text-base leading-none", chevronClass)}
              aria-hidden
            >
              {orientation === "left" ? "‹" : orientation === "right" ? "›" : orientation === "up" ? "▴" : "▾"}
            </span>
          ),
        }}
        {...props}
      />
    </div>
  )
}

export { Calendar }
