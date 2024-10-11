export default function BlogLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className='gap-4 py-8 md:py-10'>
      <div className='container max-w-5xl'>{children}</div>
    </section>
  )
}
