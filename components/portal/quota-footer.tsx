export function QuotaFooter({
  used,
  limit,
  verb,
}: {
  used: number
  limit: number
  verb: 'used' | 'available'
}) {
  const filled = verb === 'available' ? limit - used : used
  return (
    <footer className="border-t border-border mt-auto">
      <div className="mx-auto w-full max-w-5xl px-6 py-5 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {verb === 'available'
            ? `${limit} of ${limit} runs available today. Resets at midnight CET.`
            : `${used} of ${limit} runs used today. Resets at midnight CET.`}
        </p>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: limit }).map((_, i) => (
            <span
              key={i}
              className={`inline-block h-1.5 w-6 rounded-full ${i < filled ? 'bg-foreground' : 'bg-border'}`}
            />
          ))}
        </div>
      </div>
    </footer>
  )
}
