"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
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
            <h1 className="text-2xl font-semibold text-foreground">Button playground</h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Watercolor washes on sand paper — rose primary, star-gold focus, horizon outline. Ink layers driven by{" "}
              <code className="rounded bg-[color-mix(in_srgb,var(--sd-ink)_6%,transparent)] px-1 py-0.5 text-xs">
                button-ink
              </code>
              .
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
          <div className="flex flex-col gap-8">
            <Section title="Variants">
              <div className="flex flex-wrap gap-3">
                <Button>Primary rose</Button>
                <Button variant="secondary">Star wash</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Ember</Button>
                <Button variant="link">Horizon link</Button>
              </div>
            </Section>

            <Section title="Sizes">
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button>Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon" aria-label="Star action">
                  ✦
                </Button>
              </div>
            </Section>

            <Section title="Disabled">
              <div className="flex flex-wrap gap-3">
                <Button disabled>Primary</Button>
                <Button variant="outline" disabled>
                  Outline
                </Button>
                <Button variant="secondary" disabled>
                  Secondary
                </Button>
              </div>
            </Section>
          </div>
        </SandStage>

        <p className="text-center text-xs text-muted-foreground">
          Hover and focus buttons to see wash and star-gold focus rings. Press for pressed wash depth.
        </p>
      </main>
    </div>
  )
}
