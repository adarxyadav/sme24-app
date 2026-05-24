import type { Metadata } from "next";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the SME24 team.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-20 border-b border-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="type-mono-eyebrow text-[#959494] mb-4">/ Contact</p>
          <h1 className="type-display-xxl text-[#000000] mb-6">Get in touch</h1>
          <p className="type-body-lg text-[#959494] max-w-2xl">
            Questions about packages, expert applications, or enterprise
            pricing — we respond within one business day.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="type-mono-eyebrow text-[#959494] mb-4">
              / Send a message
            </p>
            <h2 className="type-display-xl text-[#000000] mb-12">
              What can we help with?
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
