import { Button } from "@/components/ui/button"

export function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-lg flex-col justify-center gap-8 p-8">
      <header className="space-y-2 text-center">
        <p className="text-sm tracking-wide text-muted-foreground">星沙 · Stardune</p>
        <h1 className="text-2xl font-semibold text-foreground">Sand paper, ink, and starlight</h1>
        <p className="text-sm text-muted-foreground">
          Sample button wired through <code className="text-xs">InkProvider</code>,{" "}
          <code className="text-xs">useInk</code>, and a Stardune recipe.
        </p>
      </header>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Primary rose</Button>
        <Button variant="secondary">Star wash</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive" size="sm">
          Ember
        </Button>
      </div>
    </main>
  )
}
