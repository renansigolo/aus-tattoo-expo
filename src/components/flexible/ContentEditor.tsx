type ContentEditorProps = {
  content: string | null
}

export const ContentEditor = ({ content }: ContentEditorProps) => {
  if (!content) return null

  return (
    <div
      className="prose prose-invert prose-pink mb-4 max-w-none text-gray-100 prose-img:my-3"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
