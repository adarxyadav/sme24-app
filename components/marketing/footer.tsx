import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white">
      <div className="border-t border-black/10 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image src="/logo.svg" alt="SME24" width={28} height={28} />
              <p className="type-mono-button text-black">SME24. <span className="normal-case">Just. Different.</span></p>
            </div>
            <p className="type-body-md text-black/50">
              AI-powered EHS consulting marketplace
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-16 md:gap-32">

          {/* Company */}
          <div>
            <p className="type-mono-label text-black/40 mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "How it works", href: "/how-it-works" },
                { label: "Experts", href: "/experts" },
                { label: "Packages", href: "/packages" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="type-mono-label text-black/70 hover:text-[#CB3CFF] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get started */}
          <div>
            <p className="type-mono-label text-black/40 mb-4">Get started</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Get your benchmark", href: "/auth/signup" },
                { label: "Sign in", href: "/auth/signin" },
                { label: "Apply as expert", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="type-mono-label text-black/70 hover:text-[#CB3CFF] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Follow */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="type-mono-label text-black/40 mb-4">Legal</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy policy", href: "" },
                  { label: "Terms of service", href: "" },
                  { label: "Impressum", href: "" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="type-mono-label text-black/70 hover:text-[#CB3CFF] transition-colors">
                        {label}
                      </a>
                    ) : (
                      <span className="type-mono-label text-black/30" aria-disabled="true">
                        {label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="type-mono-label text-black/40 mb-4">Follow</p>
              {/* TODO: replace href with confirmed LinkedIn URL */}
              <a href="#" className="type-mono-label text-black/70 hover:text-[#CB3CFF] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          </div>{/* end link columns */}
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-black/10">
          <p className="type-caption text-black/40">
            © 2026 SME24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
