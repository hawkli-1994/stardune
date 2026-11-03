import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { InkProvider } from "@/lib/ink/react"
import { App } from "@/App"
import "@/styles/stardune.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InkProvider tier="lo" density="comfortable">
      <App />
    </InkProvider>
  </StrictMode>,
)
