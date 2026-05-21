export const metadata = { title: 'Expert application · SME24' }

export default async function AdminExpertDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Expert application</h1>
      <p className="mt-2 text-xs text-muted-foreground font-mono">{id}</p>
    </section>
  )
}
