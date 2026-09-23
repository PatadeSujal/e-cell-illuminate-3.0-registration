import AuroraBackground from "@/components/AuroraBackground";
import PageLoader from "@/components/PageLoader";
import RegistrationForm from "@/components/RegistrationForm";
import RevealSection from "@/components/RevealSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <PageLoader />
      <AuroraBackground />

      {/* Hero */}
      <section className="relative flex min-h-[75vh] flex-col items-center justify-center px-6 pt-20 text-center sm:pt-28">
        <RevealSection>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-mist/80 shadow-glow backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-navy-400 animate-pulse" />
            E-Cell MESWCOE × E-Cell IIT Bombay
          </div>
        </RevealSection>

        <RevealSection delay={0.1}>
          <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-gradient sm:text-7xl">
            Illuminate 3.0
          </h1>
        </RevealSection>

        <RevealSection delay={0.2}>
          <p className="mt-5 max-w-xl text-balance text-sm leading-relaxed text-mist/75 sm:text-base">
            An exclusive entrepreneurship initiative by <strong className="text-white font-semibold">E-Cell IIT Bombay</strong> & <strong className="text-white font-semibold">E-Cell MESWCOE</strong>, delivering hands-on masterclasses on business models, startup finance, and venture building.
          </p>
        </RevealSection>

        {/* Quick event highlights pill */}
        <RevealSection delay={0.25} className="mt-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs text-mist/70 backdrop-blur-md">
            <span className="flex items-center gap-1.5">
              <span className="text-navy-400">📅</span> Wed, 07/10/2026
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-navy-400">⏰</span> 10:00 AM Onwards
            </span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="flex items-center gap-1.5">
              <span className="text-navy-400">📍</span> Room 514, MESWCOE Pune
            </span>
          </div>
        </RevealSection>

        <RevealSection delay={0.3} className="mt-8">
          <a
            href="#register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-navy-600 via-navy-500 to-navy-400 px-8 py-3.5 font-display text-sm font-semibold text-white shadow-glow transition hover:shadow-glow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Register Now
            <span aria-hidden>↓</span>
          </a>
        </RevealSection>

        <RevealSection delay={0.4} className="mt-12 animate-drift text-mist/30">
          <span className="text-2xl">⌄</span>
        </RevealSection>
      </section>

      {/* Participant Deliverables */}
      <section className="relative mx-auto max-w-5xl px-6 pb-12 pt-4">
        <RevealSection className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-navy-400 font-semibold">
            What You Receive
          </p>
          <h2 className="mt-1.5 font-display text-2xl font-bold text-gradient sm:text-3xl">
            Participant Deliverables
          </h2>
        </RevealSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {[
            {
              badge: "Official Trainer",
              title: "Expert Guidance",
              desc: "Live training conducted directly by an official IIT Bombay Trainer.",
              icon: (
                <svg className="h-6 w-6 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              ),
            },
            {
              badge: "Official Kit",
              title: "Exclusive Resources",
              desc: "An exclusive official IIT Bombay Kit provided to every participant.",
              icon: (
                <svg className="h-6 w-6 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              ),
            },
            {
              badge: "Dual Certification",
              title: "Official Recognition",
              desc: "Formal Participation Certificate from IIT Bombay + E-Certificate from E-Cell MESWCOE.",
              icon: (
                <svg className="h-6 w-6 text-navy-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              ),
            },
          ].map((item, i) => (
            <RevealSection key={item.title} delay={i * 0.1}>
              <div className="glass-card flex h-full flex-col items-center rounded-2xl p-6 text-center transition duration-300 hover:border-navy-400/40 hover:shadow-glow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-600/30 border border-white/10 shadow-inner">
                  {item.icon}
                </div>
                <span className="mb-1 rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-mist/60 font-medium">
                  {item.badge}
                </span>
                <h3 className="font-display text-lg font-bold text-white mt-1">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-mist/70">
                  {item.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="relative px-6 py-20 sm:py-28">
        <RevealSection className="mb-10 text-center">
          <span className="rounded-full bg-navy-600/30 border border-navy-400/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-navy-400">
            Seats Are Limited
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-gradient sm:text-4xl">
            Registration Form
          </h2>
          <p className="mt-3 text-sm text-mist/60 max-w-md mx-auto">
            Fill in your details accurately — this information will be used for attendance and official certificate issuance.
          </p>
        </RevealSection>

        <RevealSection delay={0.1}>
          <RegistrationForm />
        </RevealSection>
      </section>

      {/* Queries & Details Section */}
      <section className="relative mx-auto max-w-3xl px-6 pb-16">
        <RevealSection>
          <div className="glass-card rounded-2xl border border-white/10 p-6 text-center sm:p-8">
            <h3 className="font-display text-base font-semibold text-white">
              Have questions or need assistance?
            </h3>
            <p className="mt-1 text-xs text-mist/60">
              Feel free to contact the student coordinators for any event or payment queries:
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:8983785001"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs text-mist transition hover:border-navy-400 hover:bg-navy-600/20 hover:text-white"
              >
                <span className="text-navy-400">📞</span>
                <span><strong>Shantanu Kale:</strong> 8983785001</span>
              </a>
              <a
                href="tel:7219797011"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs text-mist transition hover:border-navy-400 hover:bg-navy-600/20 hover:text-white"
              >
                <span className="text-navy-400">📞</span>
                <span><strong>Saksham Shete:</strong> 7219797011</span>
              </a>
            </div>
          </div>
        </RevealSection>
      </section>

      <footer className="relative border-t border-white/5 px-6 py-8 text-center text-xs text-mist/40">
        Organized by <strong className="text-mist/70">E-CELL Club</strong>, MES&rsquo;s Wadia College of Engineering, Pune in association with <strong className="text-mist/70">E-Cell IIT Bombay</strong> · Illuminate 3.0
      </footer>
    </main>
  );
}
