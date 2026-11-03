"use client"

import * as React from "react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

function formatSingle(date: Date) {
  return format(date, "PPP")
}

function formatRange(range: DateRange) {
  if (!range.from) return ""
  if (!range.to) return format(range.from, "LLL dd, y")
  return `${format(range.from, "LLL dd, y")} – ${format(range.to, "LLL dd, y")}`
}

function DatePicker({
  className,
  value,
  onChange,
  placeholder = "Pick a date",
  disabled,
}: {
  className?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("w-full max-w-xs justify-start text-start font-normal", !value && "text-muted-foreground", className)}
        >
          {value ? formatSingle(value) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent bare align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  className,
  value,
  onChange,
  placeholder = "Pick a range",
  disabled,
}: {
  className?: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
}) {
  const [open, setOpen] = React.useState(false)
  const label = value?.from ? formatRange(value) : placeholder

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("w-full max-w-sm justify-start text-start font-normal", !value?.from && "text-muted-foreground", className)}
        >
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent bare align="start" className="w-auto p-0">
        <Calendar
          mode="range"
          selected={value}
          onSelect={(range) => onChange?.(range ? { from: range.from, to: range.to } : undefined)}
          numberOfMonths={2}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
export type { DateRange } from "react-day-picker"
