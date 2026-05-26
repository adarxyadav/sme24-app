import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-sm type-mono-button transition-opacity hover:opacity-[0.82] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:      "bg-primary text-on-primary",
        "secondary-mint":  "bg-accent-mint text-ink",
        "secondary-white": "bg-canvas text-ink",
        "ghost-dark": "bg-surface-dark-soft text-on-dark border border-hairline-dark",
        outline:      "rounded-xs border border-hairline bg-transparent text-ink",
        destructive:  "bg-danger text-on-primary",
        ghost:        "bg-transparent text-ink",
      },
      size: {
        default: "h-11 px-6",
        lg:      "h-12 px-8",
        sm:      "h-8 px-4",
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
