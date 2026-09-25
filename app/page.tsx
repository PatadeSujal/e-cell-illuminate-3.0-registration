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

      <footer className="relative border-t border-white/5 px-6 py-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-5">
          {/* WhatsApp */}
          <a
            href="https://chat.whatsapp.com/KYWcm5grUXjEyY38TkZLZH?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:border-emerald-400/50 hover:bg-emerald-500/15 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.4)]"
          >
            <svg className="h-[18px] w-[18px] fill-mist/50 transition group-hover:fill-emerald-400" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.97.585 1.761.884 2.802.884 3.181 0 5.768-2.587 5.768-5.767 0-3.18-2.587-5.77-5.774-5.771zm3.374 8.219c-.14.394-.81.768-1.127.818-.316.05-.72.072-2.18-.535-1.748-.727-2.881-2.493-2.969-2.61-.088-.117-.704-.937-.704-1.787 0-.85.445-1.268.604-1.442.158-.174.346-.217.462-.217.116 0 .232.002.333.007.106.005.249-.04.39.298.14.339.48 1.17.522 1.256.042.086.07.186.012.302-.058.116-.088.188-.174.29-.087.101-.183.226-.261.304-.088.087-.179.182-.077.357.102.174.453.747.971 1.209.667.593 1.23.776 1.405.864.175.087.278.073.382-.045.105-.117.447-.522.566-.701.12-.178.239-.148.402-.088.163.06 1.034.488 1.211.576.178.088.297.132.34.205.044.073.044.422-.096.816zM12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.063c-1.636 0-3.153-.497-4.42-1.353l-.317-.213-2.98.781.796-2.905-.207-.33A8.028 8.028 0 014 12c0-4.411 3.589-8.031 8-8.031s8 3.62 8 8.031-3.589 8.063-8 8.063z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/meswcoe_e_cell?stkn=Zmk2ZzBncDNuemls&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:border-pink-400/50 hover:bg-pink-500/15 hover:shadow-[0_0_20px_-4px_rgba(236,72,153,0.4)]"
          >
            <svg className="h-[18px] w-[18px] fill-mist/50 transition group-hover:fill-pink-400" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/meswcoe-e-cell/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] transition duration-200 hover:border-blue-400/50 hover:bg-blue-500/15 hover:shadow-[0_0_20px_-4px_rgba(59,130,246,0.4)]"
          >
            <svg className="h-[18px] w-[18px] fill-mist/50 transition group-hover:fill-blue-400" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        <p className="text-xs text-mist/40">
          Organized by <strong className="text-mist/70">E-CELL Club</strong>, MES&rsquo;s Wadia College of Engineering, Pune in association with <strong className="text-mist/70">E-Cell IIT Bombay</strong> · Illuminate 3.0
        </p>
      </footer>
    </main>
  );
}
