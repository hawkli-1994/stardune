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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
  const [indeterminate, setIndeterminate] = React.useState<boolean | "indeterminate">("indeterminate")

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
            <h1 className="text-2xl font-semibold text-foreground">Form playground</h1>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Button, Input, Textarea, Label, Checkbox, and Card — shared sand-slip washes and star/horizon focus.
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

            <Section title="Input · states">
              <div className="flex max-w-sm flex-col gap-3">
                <Input placeholder="Name on the sand…" aria-label="Default input" />
                <Input placeholder="Tab to focus" aria-label="Focus demo" />
                <Input placeholder="Invalid" aria-invalid="true" defaultValue="???" />
                <Input placeholder="Disabled" disabled />
              </div>
            </Section>

            <Section title="Textarea · states">
              <div className="flex max-w-md flex-col gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ta-default">Desert journal</Label>
                  <Textarea id="ta-default" placeholder="Write under the stars…" rows={3} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ta-invalid">Needs detail</Label>
                  <Textarea id="ta-invalid" aria-invalid="true" defaultValue="Too short." rows={2} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ta-off">Archived</Label>
                  <Textarea id="ta-off" disabled defaultValue="Read-only dunes." rows={2} />
                </div>
              </div>
            </Section>

            <Section title="Checkbox · states">
              <div className="flex max-w-sm flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Checkbox id="cb1" defaultChecked />
                  <Label htmlFor="cb1">Checked (baobab wash)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="cb-indet"
                    checked={indeterminate}
                    onCheckedChange={(v) => setIndeterminate(v === "indeterminate" ? "indeterminate" : !!v)}
                  />
                  <Label htmlFor="cb-indet">Indeterminate (horizon bar)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="cb-off" disabled />
                  <Label htmlFor="cb-off">Disabled</Label>
                </div>
              </div>
            </Section>

            <Section title="Label · typography">
              <div className="flex flex-col gap-2">
                <Label>Plain field label</Label>
                <Label inkLine>Decorative ink underline (optional)</Label>
              </div>
            </Section>

            <Section title="Card · sand-slip panel">
              <Card tone="lifted" className="max-w-md border-0 bg-transparent shadow-none">
                <CardHeader>
                  <CardTitle>Dune notes</CardTitle>
                  <CardDescription>A loose panel on desert paper.</CardDescription>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-foreground/90">
                  Form controls share the same watercolor frame language as this card.
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
          Registry: <code className="text-[11px]">@stardune/textarea</code>,{" "}
          <code className="text-[11px]">@stardune/label</code>,{" "}
          <code className="text-[11px]">@stardune/checkbox</code>
        </p>
      </main>
    </div>
  )
}
