type PageContentProps = {
  content: string | null
}

export const PageContent = ({ content }: PageContentProps) => {
  if (!content) return null

  return (
    <div
      className="prose prose-invert prose-pink mt-6 max-w-none text-gray-100"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
