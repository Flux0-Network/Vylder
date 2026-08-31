import { WaitlistForm } from "./components/WaitlistForm";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Libraries />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#080808]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">Vylder</span>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">Wie es funktioniert</a>
          <a href="#libraries" className="hover:text-white transition-colors">Libraries</a>
        </nav>
        <a
          href="#waitlist"
          className="text-sm px-4 py-2 rounded-lg bg-[#7c5cfc] hover:bg-[#6d4ef0] transition-colors font-medium"
        >
          Früher Zugang →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="pt-40 pb-32 px-6 text-center relative overflow-hidden">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #7c5cfc 0%, transparent 70%)" }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
          Coming Soon — Trag dich jetzt ein
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Der Website-Builder,
          <br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #7c5cfc 0%, #a78bfa 50%, #c4b5fd 100%)" }}>
            der Code versteht.
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
          Jede Library importierbar — visuell designen, im Code verfeinern.
          Vylder verbindet deinen visuellen Workflow mit echter Entwicklerfreiheit.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#waitlist"
            className="px-6 py-3 rounded-xl bg-[#7c5cfc] hover:bg-[#6d4ef0] transition-colors font-medium text-sm"
          >
            Frühen Zugang sichern →
          </a>
          <a
            href="#how-it-works"
            className="px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors font-medium text-sm text-white/70"
          >
            Wie es funktioniert
          </a>
        </div>
      </div>

      {/* Editor mockup */}
      <div className="relative mt-20 max-w-5xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden shadow-2xl">
          {/* Titlebar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/[0.02]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-4 h-6 rounded bg-white/5 flex items-center px-3">
              <span className="text-xs text-white/30">vylder.app — mein-projekt</span>
            </div>
          </div>

          {/* Split view */}
          <div className="grid grid-cols-2 divide-x divide-white/8 h-72">
            {/* Left: Visual canvas */}
            <div className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-30"
                style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
              <div className="relative space-y-3">
                <div className="h-10 rounded-lg bg-[#7c5cfc]/30 border border-[#7c5cfc]/40 flex items-center px-3">
                  <span className="text-xs text-[#a78bfa]">Navbar</span>
                </div>
                <div className="h-32 rounded-lg bg-white/5 border border-white/8 flex flex-col items-center justify-center gap-2">
                  <div className="h-4 w-40 rounded bg-white/10" />
                  <div className="h-3 w-56 rounded bg-white/6" />
                  <div className="h-3 w-48 rounded bg-white/6" />
                  <div className="flex gap-2 mt-2">
                    <div className="h-7 w-20 rounded-lg bg-[#7c5cfc]/40" />
                    <div className="h-7 w-20 rounded-lg bg-white/8" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-16 rounded-lg bg-white/5 border border-white/8" />
                  ))}
                </div>
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] text-white/30 font-mono">Visual</div>
            </div>

            {/* Right: Code */}
            <div className="p-6 font-mono text-xs leading-relaxed overflow-hidden">
              <div className="space-y-1 text-white/40">
                <div><span className="text-[#7c5cfc]">import</span> <span className="text-white/60">{"{ Button }"}</span> <span className="text-[#7c5cfc]">from</span> <span className="text-[#4ade80]">"@radix-ui/react-button"</span></div>
                <div><span className="text-[#7c5cfc]">import</span> <span className="text-white/60">{"{ cn }"}</span> <span className="text-[#7c5cfc]">from</span> <span className="text-[#4ade80]">"@/lib/utils"</span></div>
                <div className="mt-3"><span className="text-[#7c5cfc]">export default function</span> <span className="text-[#f59e0b]">Hero</span><span className="text-white/60">() {"{"}</span></div>
                <div className="pl-4"><span className="text-[#7c5cfc]">return</span> <span className="text-white/60">{"("}</span></div>
                <div className="pl-8 text-white/70">{"<section"}</div>
                <div className="pl-10 text-[#a78bfa]">{"className={cn("}</div>
                <div className="pl-12 text-[#4ade80]">{'"flex flex-col",'}</div>
                <div className="pl-12 text-[#4ade80]">{'"items-center"'}</div>
                <div className="pl-10 text-[#a78bfa]">{")}"}
                </div>
                <div className="pl-8 text-white/70">{">"}
                </div>
                <div className="pl-10 text-white/50">{"<Button variant=\"primary\">"}</div>
                <div className="pl-12 text-white/70">Jetzt starten →</div>
                <div className="pl-10 text-white/50">{"</Button>"}</div>
                <div className="pl-8 text-white/70">{"</section>"}</div>
                <div className="pl-4 text-white/60">{")"}</div>
                <div className="text-white/60">{"}"}</div>
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] text-white/30 font-mono">Code</div>
            </div>
          </div>
        </div>

        {/* Shadow glow below */}
        <div
          aria-hidden
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-32 opacity-30 blur-3xl pointer-events-none"
          style={{ background: "#7c5cfc" }}
        />
      </div>
    </section>
  );
}

const FEATURES = [
  {
    icon: "⬡",
    title: "Visueller Designer",
    desc: "Drag & Drop, Resize, Styling — alles ohne eine Zeile Code. Was du siehst, ist was du bekommst.",
  },
  {
    icon: "⌨",
    title: "Code-Editor",
    desc: "Verfeinere jedes Detail direkt im Code. TypeScript, JSX, volle IDE-Erfahrung im Browser.",
  },
  {
    icon: "📦",
    title: "Library-Imports",
    desc: "Radix UI, shadcn/ui, dein eigenes Package — importiere jede npm-Library und nutze sie visuell.",
  },
  {
    icon: "⚡",
    title: "Echtzeit-Sync",
    desc: "Änderungen im visuellen Editor spiegeln sich sofort im Code und umgekehrt. Immer in Sync.",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Alles was du brauchst
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Vylder gibt dir die Freiheit beider Welten — visuell und im Code.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.05] hover:border-white/12 transition-all group"
            >
              <div className="text-2xl mb-4">{f.icon}</div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 border-t border-white/8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Wie es funktioniert
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Drei Schritte von der Idee zur fertigen Website.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Library importieren",
              desc: "Füge jede npm-Library hinzu. Vylder erkennt Komponenten und macht sie im visuellen Editor verfügbar.",
            },
            {
              step: "02",
              title: "Visuell designen",
              desc: "Baue dein Layout per Drag & Drop. Style Farben, Abstände und Typografie — ohne Code.",
            },
            {
              step: "03",
              title: "Im Code verfeinern",
              desc: "Wechsle in den Code-Editor für komplexe Logik. Vylder synchronisiert Änderungen sofort zurück.",
            },
          ].map((s) => (
            <div key={s.step} className="relative pl-16">
              <div className="absolute left-0 top-0 text-4xl font-bold text-[#7c5cfc]/20 font-mono leading-none">
                {s.step}
              </div>
              <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const LIBS = ["Radix UI", "shadcn/ui", "Tailwind CSS", "Framer Motion", "Lucide React", "React Query", "Zustand", "dein Package"];

function Libraries() {
  return (
    <section id="libraries" className="py-24 px-6 border-t border-white/8 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Jede Library. Wirklich jede.
        </h2>
        <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
          Kein Vendor Lock-in. Importiere was du kennst und liebst.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {LIBS.map((lib) => (
            <span
              key={lib}
              className={`px-4 py-2 rounded-lg text-sm border font-mono ${
                lib === "dein Package"
                  ? "border-[#7c5cfc]/50 bg-[#7c5cfc]/10 text-[#a78bfa]"
                  : "border-white/8 bg-white/[0.03] text-white/60"
              }`}
            >
              {lib}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Waitlist() {
  return (
    <section id="waitlist" className="py-32 px-6 border-t border-white/8">
      <div className="max-w-lg mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7c5cfc]/30 bg-[#7c5cfc]/10 text-xs text-[#a78bfa] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7c5cfc] animate-pulse" />
          Early Access
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Sei unter den Ersten.
        </h2>
        <p className="text-white/50 mb-8">
          Trag dich in die Warteliste ein und erhalte frühen Zugang zu Vylder.
        </p>

        <WaitlistForm />

        <p className="text-xs text-white/30 mt-4">Kein Spam. Jederzeit abmeldbar.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <span className="font-semibold text-white/60">Vylder</span>
        <span>Ein Produkt von <a href="https://flux0.dev" className="hover:text-white/60 transition-colors">Flux0 Network</a></span>
        <span>© 2026 Flux0 Network</span>
      </div>
    </footer>
  );
}
