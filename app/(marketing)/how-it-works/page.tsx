import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From company name to benchmarked EHS proposal in minutes. AI research, peer benchmarking, expert matching, and delivery.",
};

const steps = [
  {
    number: "/ 01",
    title: "Identify your exposure",
    body: "Enter your company name. Our AI pipeline scans publicly available sustainability reports, regulatory filings, incident records, and certifications to build a structured EHS profile — before any expert is involved.",
    detail:
      "Powered by Claude. Research completes in minutes, not weeks. No data upload required.",
  },
  {
    number: "/ 02",
    title: "See where you stand",
    body: "Your KPIs — both lagging and leading indicators — are extracted and scored against verified industry peer benchmarks. You receive a risk profile with ranked exposure areas, not a generic framework.",
    detail:
      "Based on ISO 45001-aligned KPI taxonomy. No manual data entry. Benchmarks updated monthly.",
  },
  {
    number: "/ 03",
    title: "Meet your expert",
    body: "Our matching algorithm maps your specific risk profile tags against each expert's verified competency tags. You receive a shortlist of the three most relevant senior operators — ranked by fit, not availability.",
    detail:
      "Senior operators only. No junior consultants. Competency tags verified at application.",
  },
  {
    number: "/ 04",
    title: "Get results in 48h",
    body: "Your matched expert conducts the on-site or remote assessment. The final report — with findings, benchmarks, and a prioritised action plan — surfaces directly in your project workspace.",
    detail:
      "Fixed delivery window. Fixed price. No scope creep. Report available in your workspace.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#959494] mb-4">/ How it works</p>
          <h1 className="type-display-xxl text-[#000000] mb-6">
            From company name to benchmarked proposal
          </h1>
          <p className="type-body-lg text-[#959494] max-w-2xl">
            Four steps. AI-powered research. Senior expert delivery. No
            workshops before you decide.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {steps.map(({ number, title, body, detail }, i) => (
            <div
              key={number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start py-16 ${
                i < steps.length - 1 ? "border-b border-[#E8E8E8]" : ""
              }`}
            >
              <div>
                <p className="type-mono-eyebrow text-[#959494] mb-4">
                  {number}
                </p>
                <h2 className="type-display-xl text-[#000000] mb-6">{title}</h2>
                <p className="type-body-lg text-[#959494]">{body}</p>
              </div>
              <div className="bg-canvas-dark rounded-sm p-8">
                <p className="type-mono-eyebrow text-[#959494] mb-3">
                  / Detail
                </p>
                <p className="type-body-md text-white/80">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section
        className="py-20"
        style={{
          background:
            "linear-gradient(90deg, #9259FD 0%, #EF5CC1 50%, #FC4C02 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="type-display-xl text-white mb-8">
            Ready to see your risk profile?
          </h2>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/auth/signup"
              className="type-mono-button bg-white text-[#000000] px-6 py-3 rounded-sm"
            >
              Get your benchmark
            </Link>
            <Link
              href="/packages"
              className="type-mono-button bg-transparent border border-white text-white px-6 py-3 rounded-sm"
            >
              See packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
