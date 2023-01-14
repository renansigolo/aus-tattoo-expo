// This page requires '@tailwindcss/typography'
type PostProps = {
  title: string
  content: any
}
export default function Post({ title, content }: PostProps) {
  return (
    <>
      <div className="relative overflow-hidden bg-zinc-900 py-16">
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-prose text-lg">
            <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
              {title}
            </h1>
          </div>
          <div className="prose prose-lg prose-invert mx-auto mt-6 text-gray-100">
            {content}
          </div>
        </div>
      </div>
    </>
  )
}
