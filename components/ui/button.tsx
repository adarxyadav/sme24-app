import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm type-mono-button transition-colors disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Light surface — near-black pill (default everywhere)
        primary: "bg-primary text-on-primary hover:bg-[#2a2a2a]",
        // Hero dark band — sage accent secondary
        sage: "bg-accent-sage text-ink hover:bg-[#86efac]",
        // Dark band ghost
        "ghost-dark": "bg-surface-dark-soft text-on-dark border border-hairline-dark hover:bg-hairline-dark",
        // Secondary/outline
        outline: "border border-hairline bg-transparent text-ink hover:bg-[#f5f5f5]",
        // Destructive
        destructive: "bg-danger text-on-primary hover:bg-[#b91c1c]",
        // Ghost (for nav links etc)
        ghost: "bg-transparent text-ink hover:bg-[#f5f5f5]",
      },
      size: {
        default: "px-6 py-2",
        lg:      "px-8 py-3",
        sm:      "px-4 py-1.5",
        // Floating action orb — add rounded-full at usage site
        icon:    "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
