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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  const [nightMode, setNightMode] = React.useState(false)
  const [horizon, setHorizon] = React.useState("sand")

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

            <Section title="Select · trigger & panel">
              <div className="grid max-w-xs gap-3">
                <Select defaultValue="sand">
                  <SelectTrigger aria-label="Surface">
                    <SelectValue placeholder="Pick a surface" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sand">Sand slip</SelectItem>
                    <SelectItem value="dune">Dune shade</SelectItem>
                    <SelectItem value="sky">Horizon sky</SelectItem>
                  </SelectContent>
                </Select>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Disabled" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="x">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Section>

            <Section title="Switch · track & thumb">
              <div className="flex max-w-sm flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Switch id="sw1" checked={nightMode} onCheckedChange={setNightMode} />
                  <Label htmlFor="sw1">Night rose / baobab track</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="sw-off" disabled />
                  <Label htmlFor="sw-off">Disabled</Label>
                </div>
              </div>
            </Section>

            <Section title="Radio group · circles">
              <RadioGroup value={horizon} onValueChange={setHorizon} className="max-w-xs">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="sand" id="rg-sand" />
                  <Label htmlFor="rg-sand">Sand path</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="star" id="rg-star" />
                  <Label htmlFor="rg-star">Star route</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="rose" id="rg-rose" disabled />
                  <Label htmlFor="rg-rose">Rose line (disabled)</Label>
                </div>
              </RadioGroup>
            </Section>

            <Section title="Dialog · dusk overlay">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Open sand dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Evening on the dune</DialogTitle>
                    <DialogDescription>
                      Modal content uses the same sand-slip panel ink as Card, over a soft sky-dusk overlay.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2 sm:justify-start">
                    <Button size="sm">Continue</Button>
                    <DialogClose asChild>
                      <Button size="sm" variant="ghost">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </Section>

            <Section title="Popover · floating panel">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="secondary" size="sm">
                    Star notes
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <p className="font-medium text-foreground">Horizon hint</p>
                  <p className="mt-1 text-muted-foreground">A smaller sand-slip panel for contextual copy.</p>
                </PopoverContent>
              </Popover>
            </Section>

            <Section title="Tabs · rose / horizon active">
              <Tabs defaultValue="journal" className="max-w-md">
                <TabsList>
                  <TabsTrigger value="journal">Journal</TabsTrigger>
                  <TabsTrigger value="sky">Sky map</TabsTrigger>
                  <TabsTrigger value="rose" disabled>
                    Rose
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="journal" className="text-muted-foreground">
                  Active tab shows a rose wash with horizon underline ink.
                </TabsContent>
                <TabsContent value="sky" className="text-muted-foreground">
                  Switch tabs to see the checked layer animate in.
                </TabsContent>
              </Tabs>
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
          Registry: <code className="text-[11px]">@stardune/dialog</code>,{" "}
          <code className="text-[11px]">@stardune/popover</code>,{" "}
          <code className="text-[11px]">@stardune/tabs</code>
        </p>
      </main>
    </div>
  )
}
