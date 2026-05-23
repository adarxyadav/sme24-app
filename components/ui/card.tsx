import * as React from "react"

import { cn } from "@/lib/utils"

// surface="light" → white card with hairline border (default)
// surface="dark"  → dark card on canvas-dark band
// surface="sage"  → accent-sage stat tile
type CardSurface = "light" | "dark" | "sage"

const surfaceClasses: Record<CardSurface, string> = {
  light: "bg-canvas border border-hairline text-ink",
  dark:  "bg-surface-dark-soft border border-hairline-dark text-on-dark",
  sage:  "bg-accent-sage text-ink",
}

function Card({
  className,
  surface = "light",
  ...props
}: React.ComponentProps<"div"> & { surface?: CardSurface }) {
  return (
    <div
      data-slot="card"
      data-surface={surface}
      className={cn(
        "flex flex-col rounded-sm overflow-hidden",
        surfaceClasses[surface],
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 p-6 pb-0", className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("type-display-md", className)}
      {...props}
    />
  )
}

function CardEyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-eyebrow"
      className={cn("type-mono-label mb-3", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("type-body-md", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0 gap-3", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardEyebrow,
  CardDescription,
  CardContent,
  CardFooter,
}
