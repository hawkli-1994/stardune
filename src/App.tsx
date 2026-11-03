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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SandStage } from "@/components/playground/SandStage"
import { toast } from "@/hooks/use-toast"
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
  const [volume, setVolume] = React.useState([62])

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <TooltipProvider>
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

            <Section title="Slider · sand track & rose range">
              <div className="max-w-sm space-y-4">
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} aria-label="Volume" />
                <p className="text-xs text-muted-foreground">Value {volume[0]} — tab thumb for star focus wash.</p>
                <Slider defaultValue={[40]} max={100} disabled aria-label="Disabled slider" />
              </div>
            </Section>

            <Section title="Progress · rose / horizon fill">
              <div className="max-w-sm space-y-3">
                <Progress value={volume[0]} aria-label="Upload progress" />
                <Progress value={100} aria-label="Complete" />
                <Progress value={18} aria-label="Starting" />
              </div>
            </Section>

            <Section title="Avatar · sand-slip ring">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=96&h=96&fit=crop" alt="Traveler" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback className="text-xs">星沙</AvatarFallback>
                </Avatar>
              </div>
            </Section>

            <Section title="Skeleton · sand shimmer">
              <div className="flex max-w-sm flex-col gap-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            </Section>

            <Section title="Alert · panel variants">
              <div className="flex max-w-md flex-col gap-3">
                <Alert variant="default">
                  <AlertTitle>Evening journal</AlertTitle>
                  <AlertDescription>Rose wash default — notes saved on the dune.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Route confirmed</AlertTitle>
                  <AlertDescription>Baobab success tint for completed steps.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTitle>Heat rising</AlertTitle>
                  <AlertDescription>Ember warning wash — check supplies before dusk.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <AlertTitle>Lost signal</AlertTitle>
                  <AlertDescription>Deep ember destructive panel for critical errors.</AlertDescription>
                </Alert>
                <Alert variant="info">
                  <AlertTitle>Horizon map</AlertTitle>
                  <AlertDescription>Sky-line info wash for neutral guidance.</AlertDescription>
                </Alert>
              </div>
            </Section>

            <Section title="Tooltip · compact panel">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    Hover for horizon note
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Soft sand-slip tooltip, like a tiny popover.</TooltipContent>
              </Tooltip>
            </Section>

            <Section title="Toast · Radix stack">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  toast({
                    title: "Saved on the dune",
                    description: "Your draft was written to desert paper.",
                  })
                }
              >
                Show toast
              </Button>
            </Section>

            <Section title="Separator · pencil / horizon rule">
              <div className="flex max-w-sm flex-col gap-4">
                <p className="text-sm text-muted-foreground">Above the line</p>
                <Separator />
                <p className="text-sm text-muted-foreground">Below the line</p>
                <div className="flex h-20 items-stretch gap-4">
                  <span className="text-xs text-muted-foreground">Left</span>
                  <Separator orientation="vertical" />
                  <span className="text-xs text-muted-foreground">Right</span>
                </div>
              </div>
            </Section>

            <Section title="Badge · sand-slip pills">
              <div className="flex flex-wrap gap-2">
                <Badge>Rose dune</Badge>
                <Badge variant="secondary">Star light</Badge>
                <Badge variant="outline">Outline sand</Badge>
                <Badge variant="destructive">Baobab ember</Badge>
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
          Registry: <code className="text-[11px]">@stardune/avatar</code>,{" "}
          <code className="text-[11px]">@stardune/skeleton</code>,{" "}
          <code className="text-[11px]">@stardune/alert</code>
        </p>
      </main>
    </div>
    <Toaster />
    </TooltipProvider>
  )
}
