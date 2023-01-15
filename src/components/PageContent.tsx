export const PageContent = ({ content }: { content: string }) => {
  return (
    <div
      className="prose prose-2xl prose-invert prose-pink mx-auto mt-6 text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
