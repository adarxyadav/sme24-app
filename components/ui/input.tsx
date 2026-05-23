import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-sm border border-[#e8e8e8] bg-white px-3 py-2 text-base text-[#000000] placeholder:text-[#999999] transition-colors outline-none",
        "focus-visible:border-brand-violet focus-visible:ring-2 focus-visible:ring-brand-violet/20",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:border-[#dc2626] aria-invalid:ring-2 aria-invalid:ring-[#dc2626]/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
