import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Expert network",
  description:
    "Senior EHS operators matched to your specific risk profile. No junior consultants.",
};

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

const criteria = [
  {
    number: "/ 01",
    title: "Verified track record",
    body: "Every expert submits a structured application reviewed by our team. Credentials, case studies, and competency tags are verified before approval.",
  },
  {
    number: "/ 02",
    title: "Senior operators only",
    body: "No junior consultants. Every expert has direct operational accountability in their domain — not just advisory experience.",
  },
  {
    number: "/ 03",
    title: "Matched to your risk profile",
    body: "Our AI maps your company's specific risk exposure tags to each expert's competency profile. You see ranked fit, not availability.",
  },
];

export default function ExpertsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-canvas py-20 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">
            / Expert network
          </p>
          <h1 className="type-display-xxl text-[#000000] mb-6">
            Senior operators. Not presenters.
          </h1>
          <p className="type-body-lg text-[#2b2b2b] max-w-2xl">
            Every expert on SME24 has direct operational accountability in their
            domain. Matched to your risk profile before you commit.
          </p>
        </div>
      </section>

      {/* Expert cards */}
      <section className="bg-canvas py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">
            / Current network
          </p>
          <h2 className="type-display-xl text-[#000000] mb-12">
            Meet the experts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.map(({ initials, name, category, badge, bio }) => (
              <div
                key={name}
                className="bg-canvas border border-[#E8E8E8] rounded-sm p-6"
              >
                <div className="w-12 h-12 rounded-full bg-[#E8DDFF] flex items-center justify-center mb-4">
                  <span className="type-mono-label text-[#000000]">
                    {initials}
                  </span>
                </div>
                <h3 className="type-display-md text-[#000000] mb-1">{name}</h3>
                <p className="type-mono-label text-[#2b2b2b] mb-3">{category}</p>
                <p className="type-body-md text-[#2b2b2b] mb-4">{bio}</p>
                <span className="bg-[#E8E8E8] text-[#000000] type-mono-label rounded-sm px-2 py-0.5">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our standard */}
      <section className="bg-canvas py-20 border-t border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">/ Our standard</p>
          <h2 className="type-display-xl text-[#000000] mb-12">
            The expert bar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {criteria.map(({ number, title, body }) => (
              <div key={number}>
                <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">
                  {number}
                </p>
                <h3 className="type-display-md text-[#000000] mb-3">{title}</h3>
                <p className="type-body-md text-[#2b2b2b]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="bg-canvas-dark py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="type-mono-eyebrow text-[#2b2b2b] mb-4">
              / Join the network
            </p>
            <h2 className="type-display-xl text-white mb-6">
              Are you a senior EHS operator?
            </h2>
            <p className="type-body-lg text-white/60 mb-8">
              We&apos;re selectively growing the expert network. If you have
              direct operational accountability in EHS and want to deliver
              fixed-price engagements, apply.
            </p>
            <Link
              href="/contact"
              className="inline-block type-mono-button bg-[#CB3CFF] text-white px-6 py-3 rounded-sm"
            >
              Apply to join
            </Link>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>
    </>
  );
}
