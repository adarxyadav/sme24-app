import Link from "next/link";

const kpiRows = [
  {
    metric: "Time to first risk visibility",
    baseline: "6–8 weeks",
    sme24: "48h",
  },
  {
    metric: "Near-miss incidents unreported",
    baseline: ">70% of occurrences",
    sme24: "Captured in initial assessment",
  },
  {
    metric: "Expert seniority",
    baseline: "Varies — often junior delivery",
    sme24: "20+ years minimum, guaranteed",
  },
  {
    metric: "Peer benchmarking",
    baseline: "None before engagement",
    sme24: "Included before day one",
  },
  {
    metric: "Entry-level assessment",
    baseline: "CHF 15,000+ typical",
    sme24: "CHF 2,000 fixed",
  },
];

const stats = [
  { value: "9", label: "Senior experts, verified", bg: "bg-[#CBF6F9]" },
  { value: "48h", label: "Visibility from first call", bg: "bg-[#E8DDFF]" },
  { value: "CHF 2,000", label: "Starting price, fixed", bg: "bg-[#FFE5D3]" },
];

const steps = [
  {
    number: "01",
    title: "Identify your exposure",
    body: "AI researches public EHS data and extracts KPIs for your company automatically.",
  },
  {
    number: "02",
    title: "See where you stand",
    body: "Your risk profile ranked against industry peers. No workshops, no waiting.",
  },
  {
    number: "03",
    title: "Meet your expert",
    body: "A ranked shortlist of senior operators matched to your specific risk profile.",
  },
  {
    number: "04",
    title: "Get results in 48h",
    body: "Your expert conducts the assessment and delivers the report to your workspace.",
  },
];

const industries = [
  { name: "Chemicals", desc: "Process safety & REACH compliance", tint: "bg-[#CBF6F9]" },
  { name: "Manufacturing", desc: "Machinery, ergonomics & operational risk", tint: "bg-[#E8DDFF]" },
  { name: "Mining", desc: "Hazardous environments & extraction safety", tint: "bg-[#FFE5D3]" },
  { name: "Pharma", desc: "Regulatory compliance & sterile processes", tint: "bg-[#CBF6F9]" },
  { name: "Energy", desc: "High-voltage & environmental protection", tint: "bg-[#E8DDFF]" },
  { name: "Industrial Operations", desc: "Multi-site risk management", tint: "bg-[#FFE5D3]" },
];

const experts = [
  {
    initials: "MB",
    name: "Marcus Bauer",
    category: "Process Safety",
    badge: "ISO 45001",
    bio: "20+ years in chemical and industrial process safety. Former HSE lead at a major Swiss chemical plant.",
  },
  {
    initials: "SK",
    name: "Sophie Keller",
    category: "Safety Leadership",
    badge: "Fatality Prevention",
    bio: "Built and deployed safety leadership programmes across European manufacturing groups.",
  },
  {
    initials: "TH",
    name: "Thomas Huber",
    category: "Operational Excellence",
    badge: "Chemical Safety",
    bio: "Operational excellence and chemical safety specialist with deep expertise in REACH compliance.",
  },
];

const packages = [
  {
    name: "EHS Snapshot",
    price: "CHF 2,000",
    bestFor: "Quick visibility",
    format: "Remote (1 day)",
    output: "Top 5 risks",
    outcome: "Visibility in 48h",
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: false,
  },
  {
    name: "EHS Reality Check",
    price: "CHF 5,000",
    bestFor: "Validate real risks",
    format: "On-site (2 days)",
    output: "Top 20 risks",
    outcome: "Audit-ready reality",
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: true,
  },
  {
    name: "EHS Transformation Plan",
    price: "CHF 10,000",
    bestFor: "Fix systematically",
    format: "On-site (5 days)",
    output: "Gap plan & timeline",
    outcome: "Clear action plan",
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: false,
  },
  {
    name: "EHS Execution Partner",
    price: "CHF 10,000 + 1,850/day",
    bestFor: "Deliver results",
    format: "On-site + ongoing",
    output: "Measured risk reduction",
    outcome: "Execution & culture shift",
    cta: "Let's talk",
    ctaHref: "/contact",
    dark: false,
  },
];

const riskRows = [
  { category: "Near-miss reporting", score: 31, benchmark: 65, status: "critical" },
  { category: "Process safety controls", score: 62, benchmark: 78, status: "below" },
  { category: "Ergonomics & fatigue", score: 55, benchmark: 60, status: "below" },
  { category: "Chemical handling", score: 74, benchmark: 71, status: "ok" },
  { category: "Emergency response", score: 48, benchmark: 70, status: "critical" },
] as const;

type RiskStatus = "critical" | "below" | "ok";

const statusConfig: Record<RiskStatus, { label: string; bg: string; text: string; bar: string }> = {
  critical: { label: "CRITICAL", bg: "#FEE2E2", text: "#DC2626", bar: "#DC2626" },
  below:    { label: "BELOW",    bg: "#FEF3C7", text: "#D97706", bar: "#F59E0B" },
  ok:       { label: "AT PAR",   bg: "#DCFCE7", text: "#16A34A", bar: "#16A34A" },
};

function CheckMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-px" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="#9259FD" strokeWidth="1.2" />
      <path d="M5.5 8.5l2 2 3.5-4" stroke="#9259FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BenchmarkPreview() {
  return (
    <div
      className="bg-white border border-[#E8E8E8] rounded-sm overflow-hidden w-full"
      style={{ boxShadow: "0 4px 32px rgba(1,1,37,0.07)" }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E8] bg-white">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="type-mono-label text-[#959494]">EHS SNAPSHOT</span>
          <span className="w-px h-3 bg-[#E8E8E8] shrink-0" />
          <span className="type-mono-label text-[#000000]">Bauwerk Group AG</span>
          <span className="type-mono-label text-[#959494]">Manufacturing · 250 employees</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
          <span className="bg-[#E8E8E8] text-[#000000] type-mono-label px-2 py-0.5 rounded-sm">
            AI COMPLETE
          </span>
        </div>
      </div>

      {/* Risk table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F5] border-b border-[#E8E8E8]">
              <th className="type-mono-label text-[#959494] px-6 py-3 text-left font-medium">Risk category</th>
              <th className="type-mono-label text-[#959494] px-6 py-3 text-left font-medium">Score vs. benchmark</th>
              <th className="type-mono-label text-[#959494] px-6 py-3 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {riskRows.map(({ category, score, benchmark, status }) => {
              const cfg = statusConfig[status];
              return (
                <tr key={category} className="border-t border-[#E8E8E8]">
                  <td className="type-body-md text-[#000000] px-6 py-4">{category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Bar track: colored fill + benchmark tick */}
                      <div className="relative w-32 h-2 bg-[#E8E8E8] rounded-full shrink-0" style={{ overflow: "visible" }}>
                        <div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ width: `${score}%`, background: cfg.bar }}
                        />
                        <div
                          className="absolute top-1/2 w-0.5 h-4 bg-[#000000]/20 rounded-full"
                          style={{ left: `${benchmark}%`, transform: "translateX(-50%) translateY(-50%)" }}
                        />
                      </div>
                      <div className="flex items-baseline gap-1 shrink-0">
                        <span className="type-mono-label text-[#000000]">{score}%</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#959494", letterSpacing: "0.05em" }}>
                          / {benchmark}%
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: cfg.bar }} />
                      <span className="type-mono-label" style={{ color: cfg.text }}>{cfg.label}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Expert match footer */}
      <div className="border-t border-[#E8E8E8] px-6 py-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#E8DDFF] flex items-center justify-center shrink-0">
            <span className="type-mono-label text-[#000000]">MB</span>
          </div>
          <span className="type-body-md-strong text-[#000000]">Marcus Bauer</span>
          <span className="type-mono-label text-[#959494]">Process Safety · ISO 45001 · 20+ yrs</span>
        </div>
        <span className="type-mono-label text-[#000000]">Expert matched →</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero — light, editorial, benchmark preview below */}
      <section className="bg-white border-b border-[#E8E8E8]">
        {/* Copy block */}
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 md:pt-40 md:pb-32">
          <h1
            className="text-[#000000] mb-6"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(36px, 6vw, 88px)",
              fontWeight: 500,
              lineHeight: 1.03,
              letterSpacing: "-0.04em",
              maxWidth: "22ch",
            }}
          >
            Senior experts. No slides.{" "}
            <br className="hidden sm:block" />Just Results.
          </h1>
          <p className="type-body-lg text-[#959494] mb-10 md:mb-12 max-w-2xl">
            Operational blind spots identified before the first workshop. Enter a company name. Get a benchmark, a shortlist, and a fixed price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth/signup"
              className="type-mono-button bg-[#9259FD] text-white px-6 py-3 rounded-sm w-full sm:w-auto text-center"
            >
              Get your benchmark
            </Link>
            <Link
              href="/how-it-works"
              className="type-mono-button border border-[#E8E8E8] bg-transparent text-[#000000] px-6 py-3 rounded-xs w-full sm:w-auto text-center"
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Product preview — benchmark report mock */}
        <div className="bg-[#F7F7F7] border-t border-[#E8E8E8]">
          <div className="max-w-7xl mx-auto px-6 pt-20">
            <BenchmarkPreview />
          </div>
        </div>
      </section>

      {/* Industry Pain — data table, flows with hero */}
      <section className="bg-white py-44">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#959494] mb-4">/ The problem</p>
          <h2 className="type-display-xl text-[#000000] mb-3">
            The old model is broken.
          </h2>
          <p className="type-body-lg text-[#959494] mb-16">
            Swiss SMEs, unassessed vs. structured assessment.
          </p>
          <div className="rounded-sm overflow-hidden" style={{ border: "1px solid #E8E8E8" }}>
            <div className="overflow-x-auto">
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b border-[#E8E8E8]">
                    <th className="type-mono-label text-[#959494] px-6 py-4 text-left bg-[#F5F5F5] w-1/3">Metric</th>
                    <th className="type-mono-label text-[#959494] px-6 py-4 text-left bg-[#F5F5F5] w-1/3">Unassessed</th>
                    <th
                      className="type-mono-label text-[#9259FD] px-6 py-4 text-left w-1/3"
                      style={{ background: "#FAF8FF", borderTop: "2px solid #9259FD" }}
                    >
                      With SME24
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {kpiRows.map(({ metric, baseline, sme24 }) => (
                    <tr key={metric} className="border-t border-[#E8E8E8]">
                      <td className="type-body-md text-[#000000] px-6 py-5">{metric}</td>
                      <td className="type-body-md text-[#959494] px-6 py-5">{baseline}</td>
                      <td className="px-6 py-5" style={{ background: "#FAF8FF" }}>
                        <div className="flex items-start gap-2">
                          <CheckMark />
                          <span className="type-body-md-strong text-[#000000]">{sme24}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="type-caption text-[#959494] mt-3">
            Near-miss figure: EU-OSHA SME workplace safety report, 2023. Cost baseline: Swiss consulting market rate.
          </p>
        </div>
      </section>

      {/* Stats Tiles — dark band mid-page, breaks the run */}
      <section className="bg-canvas-dark py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ value, label, bg }) => (
              <div key={label} className={`${bg} rounded-sm p-8`}>
                <p className="type-display-lg text-[#000000] mb-1">{value}</p>
                <p className="type-mono-label text-[#000000]/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Teaser — no eyebrow, muted step numbers */}
      <section className="bg-white py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="type-display-xl text-[#000000] mb-20">
            From company name to expert report
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map(({ number, title, body }, i) => (
              <div
                key={number}
                className={`rounded-sm p-8 flex flex-col gap-4 ${
                  i === steps.length - 1
                    ? "bg-[#E8DDFF]"
                    : "bg-white border border-[#E8E8E8]"
                }`}
              >
                <span className="type-mono-eyebrow text-[#959494]">{number}</span>
                <h3 className="type-display-md text-[#000000]">{title}</h3>
                <p className="type-body-md text-[#959494]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served — content-first, no intro block */}
      <section className="bg-white py-44">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {industries.map(({ name, desc, tint }) => (
              <div key={name} className={`${tint} rounded-sm p-8`}>
                <p className="type-mono-label text-[#000000] mb-2">{name}</p>
                <p className="type-body-md text-[#000000]/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Preview — alt surface, content-first, no intro block */}
      <section className="bg-[#F8F8F8] py-44">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {experts.map(({ initials, name, category, badge, bio }) => (
              <div
                key={name}
                className="bg-white border border-[#E8E8E8] rounded-sm p-8 flex flex-col gap-5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8DDFF] flex items-center justify-center shrink-0">
                    <span className="type-mono-label text-[#000000]">{initials}</span>
                  </div>
                  <div>
                    <h3 className="type-display-md text-[#000000]">{name}</h3>
                    <p className="type-mono-label text-[#959494]">{category}</p>
                  </div>
                </div>
                <p className="type-body-md text-[#959494] flex-1">{bio}</p>
                <span className="bg-[#E8E8E8] text-[#000000] type-mono-label rounded-sm px-2 py-0.5 self-start">
                  {badge}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/experts"
            className="inline-block type-mono-button border border-[#E8E8E8] bg-transparent text-[#000000] px-6 py-3 rounded-xs"
          >
            Explore all experts
          </Link>
        </div>
      </section>

      {/* Packages — no eyebrow */}
      <section className="bg-white py-44">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="type-display-xl text-[#000000] mb-20">
            Fixed prices. No retainer.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {packages.map(({ name, price, bestFor, format, output, outcome, cta, ctaHref, dark }) => (
              <div
                key={name}
                className={`rounded-sm p-8 flex flex-col ${
                  dark ? "bg-canvas-dark" : "bg-white border border-[#E8E8E8]"
                }`}
              >
                <p className="type-mono-label text-[#959494] mb-2">{name}</p>
                <p className={`type-display-lg mb-1 ${dark ? "text-white" : "text-[#000000]"}`}>
                  {price}
                </p>
                <p className={`type-body-md mb-6 ${dark ? "text-white/60" : "text-[#959494]"}`}>
                  {bestFor}
                </p>
                <div className={`mt-auto flex flex-col gap-2.5 pt-4 border-t ${dark ? "border-[#26263A]" : "border-[#E8E8E8]"}`}>
                  {[
                    { label: "Format", value: format },
                    { label: "Output", value: output },
                    { label: "Outcome", value: outcome },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-baseline gap-2">
                      <span className={`type-mono-label shrink-0 ${dark ? "text-white/30" : "text-[#959494]"}`}>{label}</span>
                      <span className={`type-mono-label text-right ${dark ? "text-white/60" : "text-[#000000]"}`}>{value}</span>
                    </div>
                  ))}
                  <Link
                    href={ctaHref}
                    className={`mt-2 type-mono-button px-6 py-2 rounded-sm text-center block ${
                      ctaHref === "/contact"
                        ? "bg-surface-dark-soft text-white"
                        : "bg-[#000000] text-white"
                    }`}
                  >
                    {cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="py-44"
        style={{
          background:
            "linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="type-display-xl text-white mb-8">
            Your company&apos;s EHS risk profile, in minutes
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="type-mono-button bg-white text-[#000000] px-6 py-3 rounded-sm"
            >
              Get your benchmark
            </Link>
            <Link
              href="/experts"
              className="type-mono-button bg-transparent border border-white text-white px-6 py-3 rounded-sm"
            >
              Explore experts
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
