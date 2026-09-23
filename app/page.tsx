import AuroraBackground from "@/components/AuroraBackground";
import RegistrationForm from "@/components/RegistrationForm";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AuroraBackground />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 pt-20 text-center sm:pt-28">
        <RevealSection>
          <span className="mb-5 inline-block rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist/70">
            E-CELL Presents
          </span>
        </RevealSection>

        <RevealSection delay={0.1}>
          <h1 className="font-display text-5xl font-extrabold leading-tight text-gradient sm:text-7xl">
            Illuminate 3.0
          </h1>
        </RevealSection>

        <RevealSection delay={0.2}>
          <p className="mt-5 max-w-xl text-balance text-base text-mist/60 sm:text-lg">
            A hands-on workshop by the E-CELL Club. Reserve your seat below —
            registration takes less than two minutes.
          </p>
        </RevealSection>

        <RevealSection delay={0.3} className="mt-9">
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-600 via-navy-500 to-navy-400 px-8 py-3.5 font-display text-sm font-semibold text-white shadow-glow transition hover:shadow-glow-lg"
          >
            Register Now
            <span aria-hidden>↓</span>
          </a>
        </RevealSection>

        <RevealSection delay={0.5} className="mt-16 animate-drift text-mist/30">
          <span className="text-2xl">⌄</span>
        </RevealSection>
      </section>

      {/* Info strip */}
      <section className="relative mx-auto grid max-w-4xl grid-cols-1 gap-4 px-6 pb-6 sm:grid-cols-3">
        {[
          { label: "Fee (MESWCOE)", value: "349" },
          { label: "Fee (Other Colleges)", value: "699" },
          { label: "Mode of Payment", value: "UPI / QR" },
        ].map((item, i) => (
          <RevealSection key={item.label} delay={i * 0.1}>
            <div className="glass-card rounded-2xl px-5 py-6 text-center">
              <p className="font-display text-2xl font-bold text-gradient">
                {item.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-mist/50">
                {item.label}
              </p>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* Registration form */}
      <section id="register" className="relative px-6 py-24 sm:py-32">
        <RevealSection className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-gradient sm:text-4xl">
            Registration Form
          </h2>
          <p className="mt-3 text-mist/50">
            Fill in your details accurately — this information will be used
            for entry verification.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <RegistrationForm />
        </RevealSection>
      </section>

      <footer className="relative border-t border-white/5 px-6 py-8 text-center text-xs text-mist/30">
        Organized by E-CELL Club, MES&rsquo;s Wadia College of Engineering,
        Pune · Illuminate 3.0
      </footer>
    </main>
  );
}
