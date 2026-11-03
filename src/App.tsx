"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { SandStage } from "@/components/playground/SandStage"
import { cn } from "@/lib/utils"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{title}</h2>
      {children}
    </section>
  )
}

export function App() {
  const [dark, setDark] = React.useState(false)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <div
      className="min-h-svh px-4 py-10"
      style={{
        background: dark
          ? "radial-gradient(ellipse 100% 60% at 50% 0%, color-mix(in srgb, var(--sd-well) 40%, #0a0e14), #0a0e14)"
          : "radial-gradient(ellipse 100% 55% at 50% 0%, var(--sd-sky), color-mix(in srgb, var(--sd-sky-dusk) 40%, var(--sd-sand)))",
      }}
    >
      <main className="mx-auto flex max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm tracking-wide text-muted-foreground">星沙 · Stardune</p>
            <h1 className="text-2xl font-semibold text-foreground">Component playground</h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Button, Input, and Card share the same watercolor ink recipes — sand-slip fills, rose/horizon outlines,
              star-gold focus.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDark((d) => !d)}
            className={cn(
              "shrink-0 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors",
              "bg-card/80 hover:bg-card text-foreground",
            )}
            aria-pressed={dark}
          >
            {dark ? "Night sand" : "Day sand"}
          </button>
        </header>

        <SandStage className="p-6 sm:p-8">
          <div className="flex flex-col gap-10">
            <Section title="Button · variants">
              <div className="flex flex-wrap gap-3">
                <Button>Primary rose</Button>
                <Button variant="secondary">Star wash</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Ember</Button>
              </div>
            </Section>

            <Section title="Input · field states">
              <div className="flex max-w-sm flex-col gap-3">
                <Input placeholder="Name on the sand…" />
                <Input placeholder="Focus me (Tab)" aria-label="Focus demo" />
                <Input placeholder="Invalid value" aria-invalid="true" defaultValue="???" />
                <Input placeholder="Disabled" disabled />
              </div>
            </Section>

            <Section title="Card · sand-slip panel">
              <Card tone="lifted" className="max-w-md border-0 bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle>Dune notes</CardTitle>
                  <CardDescription>A loose panel on desert paper — not a notebook pad.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-foreground/90">
                  Cards use layered sand-slip washes and a double pencil border. Pair with inputs and buttons for a
                  cohesive field set.
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm">Save draft</Button>
                  <Button size="sm" variant="outline">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Section>
          </div>
        </SandStage>

        <p className="text-center text-xs text-muted-foreground">
          Tab into inputs for star/horizon focus ink. Registry stubs:{" "}
          <code className="text-[11px]">@stardune/input</code>, <code className="text-[11px]">@stardune/card</code>.
        </p>
      </main>
    </div>
  )
}
