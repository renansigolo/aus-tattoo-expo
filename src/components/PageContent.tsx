export const PageContent = ({ content }: { content: string }) => {
  return (
    <div
      className="prose prose-invert prose-pink mt-6 max-w-none text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
