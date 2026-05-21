import Link from 'next/link'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col sm:flex-row justify-between gap-10">
          <div className="shrink-0 max-w-55">
            <p className="font-bold text-foreground mb-3">IC HOTZ</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Senior EHS expertise, matched to your needs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Product
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/how-it-works" className="text-foreground hover:text-muted-foreground transition-colors">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/expert-network" className="text-foreground hover:text-muted-foreground transition-colors">
                    Expert network
                  </Link>
                </li>
                <li>
                  <Link href="/packages" className="text-foreground hover:text-muted-foreground transition-colors">
                    Packages
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Company
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-foreground hover:text-muted-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/become-an-expert" className="text-foreground hover:text-muted-foreground transition-colors">
                    Become an expert
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Legal
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/impressum" className="text-foreground hover:text-muted-foreground transition-colors">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-foreground hover:text-muted-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-foreground hover:text-muted-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>© {year} IC HOTZ. All rights reserved.</span>
          <span>EN</span>
        </div>
      </div>
    </footer>
  )
}
