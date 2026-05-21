export const metadata = { title: 'Project · SME24' }

export default async function ExpertEngagementPage({
  params,
}: {
  params: Promise<{ engagementId: string }>
}) {
  const { engagementId } = await params
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Project</h1>
      <p className="mt-2 text-xs text-muted-foreground font-mono">{engagementId}</p>
    </section>
  )
}
