import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Packages",
  description:
    "Four fixed-price EHS consulting packages. No retainer, no surprise invoices.",
};

const packages = [
  {
    name: "Snapshot",
    price: "CHF 2,000",
    priceNote: "fixed price",
    bestFor: "Quick visibility",
    format: "Remote (1 day)",
    output: "Top 5 risks",
    features: [
      "AI company research",
      "Industry peer benchmarking",
      "Top 5 risk exposure areas",
      "Expert shortlist (top 3)",
      "Remote delivery",
    ],
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: false,
    stripe: true,
  },
  {
    name: "Reality Check",
    price: "CHF 5,000",
    priceNote: "fixed price",
    bestFor: "Validate real risks",
    format: "On-site (2 days)",
    output: "Top 20 risks",
    features: [
      "AI company research",
      "Industry peer benchmarking",
      "Top 20 risk exposure areas",
      "Expert shortlist (top 3)",
      "2-day on-site assessment",
      "Prioritised action plan",
    ],
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: true,
    stripe: true,
  },
  {
    name: "Transformation Plan",
    price: "CHF 10,000",
    priceNote: "fixed price",
    bestFor: "Fix systematically",
    format: "On-site (5 days)",
    output: "Gap plan & timeline",
    features: [
      "AI company research",
      "Full KPI benchmark report",
      "Gap analysis vs ISO 45001",
      "5-day on-site engagement",
      "Transformation roadmap",
      "Implementation timeline",
    ],
    cta: "Get started",
    ctaHref: "/auth/signup",
    dark: false,
    stripe: true,
  },
  {
    name: "Execution Partner",
    price: "CHF 10,000",
    priceNote: "+ CHF 1,850 / day ongoing",
    bestFor: "Deliver results",
    format: "On-site + ongoing",
    output: "Measured risk reduction",
    features: [
      "Everything in Transformation Plan",
      "Ongoing expert engagement",
      "Monthly progress check-ins",
      "Measured risk reduction metrics",
      "Custom delivery scope",
    ],
    cta: "Let's talk",
    ctaHref: "/contact",
    dark: false,
    stripe: false,
  },
];

const comparison = [
  {
    feature: "AI company research",
    snapshot: true,
    reality: true,
    transformation: true,
    execution: true,
  },
  {
    feature: "Peer benchmarking",
    snapshot: true,
    reality: true,
    transformation: true,
    execution: true,
  },
  {
    feature: "Expert shortlist",
    snapshot: true,
    reality: true,
    transformation: true,
    execution: true,
  },
  {
    feature: "On-site delivery",
    snapshot: false,
    reality: true,
    transformation: true,
    execution: true,
  },
  {
    feature: "Gap analysis",
    snapshot: false,
    reality: false,
    transformation: true,
    execution: true,
  },
  {
    feature: "Transformation roadmap",
    snapshot: false,
    reality: false,
    transformation: true,
    execution: true,
  },
  {
    feature: "Ongoing engagement",
    snapshot: false,
    reality: false,
    transformation: false,
    execution: true,
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas py-20 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">/ Packages</p>
          <h1 className="type-display-xxl text-[#000000] mb-6">
            Fixed prices. No retainer.
          </h1>
          <p className="type-body-lg text-[#2b2b2b] max-w-2xl">
            Four packages. Three via Stripe checkout. One via contact form for
            ongoing engagements. No surprise invoices.
          </p>
        </div>
      </section>

      {/* Package cards */}
      <section className="bg-canvas py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map(
              ({
                name,
                price,
                priceNote,
                bestFor,
                format,
                output,
                features,
                cta,
                ctaHref,
                dark,
              }) => (
                <div
                  key={name}
                  className={`rounded-sm p-6 flex flex-col ${
                    dark
                      ? "bg-canvas-dark"
                      : "bg-canvas border border-[#E8E8E8]"
                  }`}
                >
                  <p className="type-mono-label text-[#2b2b2b] mb-3">{name}</p>
                  <p
                    className={`type-display-lg mb-1 ${
                      dark ? "text-white" : "text-[#000000]"
                    }`}
                  >
                    {price}
                  </p>
                  <p
                    className={`type-caption mb-4 ${
                      dark ? "text-white/40" : "text-[#2b2b2b]"
                    }`}
                  >
                    {priceNote}
                  </p>
                  <p
                    className={`type-body-md mb-6 ${
                      dark ? "text-white/60" : "text-[#2b2b2b]"
                    }`}
                  >
                    {bestFor}
                  </p>
                  <ul className="flex flex-col gap-2 mb-6 flex-1">
                    {features.map((f) => (
                      <li
                        key={f}
                        className={`type-mono-label flex items-center gap-2 ${
                          dark ? "text-white/60" : "text-[#2b2b2b]"
                        }`}
                      >
                        <span
                          className={`w-1 h-1 rounded-full shrink-0 ${
                            dark ? "bg-[#CB3CFF]" : "bg-[#959494]"
                          }`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`flex flex-col gap-1.5 pt-4 border-t ${
                      dark ? "border-[#26263A]" : "border-[#E8E8E8]"
                    }`}
                  >
                    <p
                      className={`type-mono-label ${
                        dark ? "text-white/40" : "text-[#2b2b2b]"
                      }`}
                    >
                      {format}
                    </p>
                    <p
                      className={`type-mono-label ${
                        dark ? "text-white/40" : "text-[#2b2b2b]"
                      }`}
                    >
                      {output}
                    </p>
                    <Link
                      href={ctaHref}
                      className={`mt-3 type-mono-button px-6 py-2 rounded-sm text-center block ${
                        ctaHref === "/contact"
                          ? "bg-surface-dark-soft text-white"
                          : "bg-[#CB3CFF] text-white"
                      }`}
                    >
                      {cta}
                    </Link>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-canvas py-20 border-t border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">/ Compare</p>
          <h2 className="type-display-xl text-[#000000] mb-12">
            What&apos;s included
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#E8E8E8]">
                  <th className="type-mono-label text-[#2b2b2b] px-4 py-3 text-left">
                    Feature
                  </th>
                  <th className="type-mono-label text-[#2b2b2b] px-4 py-3 text-center">
                    Snapshot
                  </th>
                  <th className="type-mono-label text-[#2b2b2b] px-4 py-3 text-center">
                    Reality Check
                  </th>
                  <th className="type-mono-label text-[#2b2b2b] px-4 py-3 text-center">
                    Transformation
                  </th>
                  <th className="type-mono-label text-[#2b2b2b] px-4 py-3 text-center">
                    Execution
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(({ feature, snapshot, reality, transformation, execution }) => {
                  const cols = [
                    { id: "snapshot", val: snapshot },
                    { id: "reality", val: reality },
                    { id: "transformation", val: transformation },
                    { id: "execution", val: execution },
                  ];
                  return (
                    <tr key={feature} className="border-b border-[#E8E8E8]">
                      <td className="type-body-md text-[#000000] px-4 py-3.5">
                        {feature}
                      </td>
                      {cols.map(({ id, val }) => (
                        <td
                          key={id}
                          className="type-mono-label px-4 py-3.5 text-center"
                        >
                          {val ? (
                            <span className="text-[#CB3CFF]">✓</span>
                          ) : (
                            <span className="text-[#E8E8E8]">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(90deg, #CB3CFF 0%, #EF5CC1 50%, #FC4C02 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="type-display-xl text-white mb-8">
            Not sure which package fits?
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/contact"
              className="type-mono-button bg-white text-[#000000] px-6 py-3 rounded-sm"
            >
              Talk to us
            </Link>
            <Link
              href="/auth/signup"
              className="type-mono-button bg-transparent border border-white text-white px-6 py-3 rounded-sm"
            >
              Start with snapshot
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
