import type { ReactNode } from "react"

/** Abstract sand / dusk sky / stars — original shapes only, no character art. */
export function SandStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--sd-ink)_12%,transparent)] shadow-[0_12px_40px_-12px_rgb(var(--sd-shade)/0.18)] ${className}`}
      style={{
        backgroundColor: "var(--sd-sand)",
        backgroundImage: [
          "radial-gradient(ellipse 120% 80% at 50% -20%, color-mix(in srgb, var(--sd-sky) 55%, transparent), transparent 55%)",
          "radial-gradient(ellipse 90% 40% at 85% 95%, color-mix(in srgb, var(--sd-dune) 45%, transparent), transparent 70%)",
          "radial-gradient(ellipse 70% 35% at 10% 88%, color-mix(in srgb, var(--sd-rose-wash) 35%, transparent), transparent 65%)",
          "linear-gradient(165deg, color-mix(in srgb, var(--sd-sand-slip) 80%, transparent) 0%, transparent 45%)",
        ].join(", "),
      }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-[var(--sd-star)] opacity-[0.35] dark:opacity-[0.22]"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="sd-stars" width="120" height="120" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="24" r="0.9" fill="currentColor" opacity="0.9" />
            <circle cx="52" cy="12" r="0.55" fill="currentColor" opacity="0.6" />
            <circle cx="88" cy="38" r="0.75" fill="currentColor" opacity="0.75" />
            <circle cx="34" cy="72" r="0.5" fill="currentColor" opacity="0.5" />
            <circle cx="98" cy="92" r="0.65" fill="currentColor" opacity="0.65" />
            <circle cx="8" cy="104" r="0.45" fill="currentColor" opacity="0.45" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sd-stars)" />
        <path
          d="M-20 100 Q 80 72 200 88 T 420 76 L 420 140 L -20 140 Z"
          fill="color-mix(in srgb, var(--sd-dune) 28%, transparent)"
          opacity="0.55"
        />
        <path
          d="M-10 108 Q 120 92 280 98 T 440 90 L 440 140 L -10 140 Z"
          fill="color-mix(in srgb, var(--sd-sand-shade) 40%, transparent)"
          opacity="0.4"
        />
      </svg>
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
