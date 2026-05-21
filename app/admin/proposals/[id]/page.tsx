export const metadata = { title: 'Proposal · SME24' }

export default async function AdminProposalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Proposal</h1>
      <p className="mt-2 text-xs text-muted-foreground font-mono">{id}</p>
    </section>
  )
}
