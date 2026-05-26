import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SME24 — AI-Powered EHS Consulting",
  description:
    "Senior EHS experts matched to your company's risk profile. AI-benchmarked, fixed price, 48h visibility.",
  openGraph: {
    title: "SME24 — AI-Powered EHS Consulting",
    description:
      "Senior EHS experts matched to your company's risk profile. AI-benchmarked, fixed price, 48h visibility.",
  },
};

function CompanyInput() {
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
      <div className="px-6 pt-6 pb-4">
        <p className="type-body-lg text-[#000000] mb-8">
          Enter a company name to benchmark EHS risk exposure
        </p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="e.g. Bauwerk Group AG"
            readOnly
            className="flex-1 type-body-md text-[#999999] bg-transparent outline-none cursor-default"
          />
        </div>
      </div>
      <div className="border-t border-[#E8E8E8] px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="type-mono-label text-[#999999]">Industry</span>
          <span className="type-mono-label text-[#000000]">Auto-detected</span>
        </div>
        <Link
          href="/auth/signup"
          className="type-mono-button bg-[#000000] text-white px-5 py-2 rounded-sm flex items-center gap-2"
        >
          RUN
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 md:pt-28 md:pb-12 flex flex-col items-center text-center">
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
            Senior experts.{" "}
            <br className="hidden sm:block" />No slides. Just Results.
          </h1>
          <p className="type-body-lg-strong text-[#2b2b2b] mb-10 md:mb-12 max-w-2xl">
            Operational blind spots identified before the first workshop. Enter a company name. Get a benchmark, a shortlist, and a fixed price.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/auth/signup"
              className="type-mono-button inline-flex items-center border border-[#AAAAAA] bg-transparent text-[#000000] hover:bg-[#CB3CFF] hover:border-[#CB3CFF] hover:text-white transition-colors duration-200 px-5 py-3 rounded-sm w-full sm:w-auto justify-center"
            >
              Get your benchmark
            </Link>
          </div>
        </div>

        <div className="bg-white pt-4 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-canvas-dark rounded-lg w-full min-h-125 max-h-175 overflow-hidden px-12 flex flex-col items-center justify-center">
              <div className="w-full max-w-xl">
                <CompanyInput />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section className="bg-canvas py-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24">
            <h2
              className="text-[#000000] mb-3"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              How it works.
            </h2>
            <p className="type-body-lg-strong text-[#2b2b2b]/70">
              Four steps. No project setup. No kickoff slides.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14 md:gap-12">
            {[
              {
                num: "01",
                title: "Enter a company",
                body: "Type a name. Add an industry hint if you have one.",
              },
              {
                num: "02",
                title: "Get a benchmark",
                body: "EHS KPIs pulled from public sources. Compared to peers.",
              },
              {
                num: "03",
                title: "See your shortlist",
                body: "Three senior experts ranked against your risk profile.",
              },
              {
                num: "04",
                title: "Buy a package",
                body: "Fixed price. One click. Your workspace opens.",
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex flex-col gap-4">
                <span className="type-mono-eyebrow text-[#000000]/50">{num}</span>
                <h3
                  className="text-[#000000]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(16px, 1.6vw, 20px)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
                <p className="type-body-md-strong text-[#2b2b2b]">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-24">
            <Link
              href="/how-it-works"
              className="type-mono-button text-[#000000] inline-flex items-center gap-2 font-semibold border-b border-current pb-0.5 hover:text-[#CB3CFF] transition-colors duration-150"
            >
              See the full flow
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* How We're Different */}
      <section className="bg-white py-48">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-[#000000] mb-20 text-center"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            How we&apos;re different.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "AI Benchmarking",
                body: "Your risk profile in minutes. Just your company name — we do the rest.",
              },
              {
                title: "Senior Experts",
                body: "No juniors. No overhead. SMEs with 20+ years of EHS experience, matched to your sector.",
              },
              {
                title: "Fixed Packages",
                body: "CHF 2,000 to 10,000. Scope agreed before you sign. No surprises.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="border border-[#E8E8E8] rounded-sm p-10 flex flex-col gap-4">
                <h3
                  className="text-[#000000]"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(18px, 1.8vw, 24px)",
                    fontWeight: 500,
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>
                <p className="type-body-md-strong text-[#2b2b2b]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Our SMEs */}
      <section className="bg-canvas py-48">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <h2
              className="text-[#000000] mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(28px, 4vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Grey hair. No hair. Our SMEs.
            </h2>
            <p className="type-body-lg-strong text-[#2b2b2b]/70 max-w-2xl">
              Senior EHS professionals with 15–30 years of field experience. No juniors on your engagement. Ever.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                initials: "PH",
                name: "Philipp C. Hotz",
                specialty: "EHS Risk & Safety Transformation",
                years: "18+ years",
                sectors: ["FMCG", "Metals & Mining", "Chemicals"],
                quote:
                  "Built and led risk and safety transformation programs for global companies — from concept to operational rollout.",
              },
              {
                initials: "PJ",
                name: "Palle Jensen",
                specialty: "Enterprise HSE & Operational Risk",
                years: "30+ years",
                sectors: ["Energy", "Oil & Gas", "Renewables"],
                quote:
                  "Trusted advisor to CEOs and Boards, translating risk into executive decisions and measurable business outcomes.",
              },
              {
                initials: "SH",
                name: "Dr.-Ing. Sven Hafkesbrink",
                specialty: "Global EHS & Asset Management",
                years: "30 years",
                sectors: ["Chemical", "Capital Projects", "Manufacturing"],
                quote:
                  "Recognised for designing and scaling global EHS governance models aligned with corporate strategy and value creation.",
              },
            ].map(({ initials, name, specialty, years, sectors, quote }) => (
              <div key={name} className="bg-white border border-[#E8E8E8] rounded-sm overflow-hidden flex flex-col">
                <div className="p-8 flex flex-col gap-3 flex-1">
                  <div
                    className="w-14 h-14 rounded-full bg-[#E8E8E8] flex items-center justify-center mb-1"
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#AAAAAA",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                  <h3
                    className="text-[#000000]"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "clamp(18px, 1.8vw, 22px)",
                      fontWeight: 500,
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {name}
                  </h3>
                  <p className="type-mono-label text-[#888888]">
                    {specialty} · {years}
                  </p>
                  <p className="type-mono-label text-[#AAAAAA]">
                    {sectors.join(" | ")}
                  </p>
                  <p className="type-body-md text-[#2b2b2b] mt-1">
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/experts"
              className="type-mono-button text-[#000000] inline-flex items-center gap-2 border-b border-current pb-0.5 hover:text-[#CB3CFF] transition-colors duration-150"
            >
              Meet all experts
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* Packages */}
      <section className="bg-white py-48">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-[#000000] mb-20 text-center"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(28px, 4vw, 56px)",
              fontWeight: 500,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
            }}
          >
            Four packages. One for every risk level.
          </h2>

          <div className="w-full overflow-hidden">
            {/* Header */}
            <div className="hidden md:grid grid-cols-[2fr_1.5fr_1.5fr_2fr] gap-6 px-8 py-4 bg-[#EFEFEF] border-b border-[#D8D8D8]">
              {["Package", "Price", "Format", "You get"].map((h) => (
                <span key={h} className="type-mono-label text-[#888888]">{h}</span>
              ))}
            </div>

            {/* Rows */}
            {[
              { name: "Snapshot",           price: "CHF 2,000",              format: "Remote · 1 day",    get: "Top 5 risks in 48 hours"   },
              { name: "Reality Check",       price: "CHF 5,000",              format: "On-site · 2 days",  get: "Top 20 risks, audit-ready"  },
              { name: "Transformation Plan", price: "CHF 10,000",             format: "On-site · 5 days",  get: "Gap plan & action timeline" },
              { name: "Execution Partner",   price: "CHF 10,000 + 1,850/day", format: "On-site + ongoing", get: "Risks eliminated"           },
            ].map(({ name, price, format, get }, i) => (
              <div
                key={name}
                className={`grid grid-cols-1 md:grid-cols-[2fr_1.5fr_1.5fr_2fr] gap-4 md:gap-6 px-8 py-7 ${i % 2 === 1 ? "bg-[#F5F5F5]" : "bg-white"}`}
              >
                <p
                  className="text-[#000000]"
                  style={{ fontFamily: "var(--font-sans)", fontSize: "18px", fontWeight: 500, letterSpacing: "-0.01em" }}
                >
                  {name}
                </p>
                <div>
                  <span className="type-mono-label text-[#888888] block mb-1 md:hidden">Price</span>
                  <p className="type-mono-label text-[#2b2b2b] md:pt-0.5">{price}</p>
                </div>
                <div>
                  <span className="type-mono-label text-[#888888] block mb-1 md:hidden">Format</span>
                  <p className="type-mono-label text-[#2b2b2b] md:pt-0.5">{format}</p>
                </div>
                <div>
                  <span className="type-mono-label text-[#888888] block mb-1 md:hidden">You get</span>
                  <p className="type-body-md-strong">{get}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/packages"
              className="type-mono-button text-[#000000] inline-flex items-center gap-2 border-b border-current pb-0.5 hover:text-[#CB3CFF] transition-colors duration-150"
            >
              See full package details
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-40 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6">
          <h2
            className="text-[#000000]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(32px, 5vw, 72px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              maxWidth: "18ch",
            }}
          >
            Ready to see your benchmark?
          </h2>
          <p className="type-body-lg-strong text-[#2b2b2b]/70 max-w-md">
            No commitment. No credit card. Just your company name.
          </p>
          <Link
            href="/auth/signup"
            className="type-mono-button bg-[#CB3CFF] text-white px-8 py-4 rounded-sm inline-flex items-center gap-2 mt-2"
          >
            Get your proposal
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
