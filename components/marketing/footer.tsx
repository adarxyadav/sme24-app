import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-canvas-dark">
      <div className="border-t border-[#26263A] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12">
          {/* Brand */}
          <div>
            <p className="type-mono-label text-white mb-3">SME24</p>
            <p className="type-body-md text-white/60">
              AI-powered EHS consulting marketplace
            </p>
          </div>

          {/* Link columns */}
          <div className="flex flex-col sm:flex-row gap-32">

          {/* Company */}
          <div>
            <p className="type-mono-label text-white/40 mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "How it works", href: "/how-it-works" },
                { label: "Experts", href: "/experts" },
                { label: "Packages", href: "/packages" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="type-mono-label text-white/80 hover:text-[#9259FD] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get started */}
          <div>
            <p className="type-mono-label text-white/40 mb-4">Get started</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Get your benchmark", href: "/auth/signup" },
                { label: "Sign in", href: "/auth/signin" },
                { label: "Apply as expert", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="type-mono-label text-white/80 hover:text-[#9259FD] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Follow */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="type-mono-label text-white/40 mb-4">Legal</p>
              <ul className="flex flex-col gap-3">
                {[
                  { label: "Privacy policy", href: "#" },
                  { label: "Terms of service", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a href={href} className="type-mono-label text-white/80 hover:text-[#9259FD] transition-colors">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="type-mono-label text-white/40 mb-4">Follow</p>
              {/* TODO: replace href with confirmed LinkedIn URL */}
              <a href="#" className="type-mono-label text-white/80 hover:text-[#9259FD] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          </div>{/* end link columns */}
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-[#26263A]">
          <p className="type-caption text-white/40">
            © 2026 SME24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
