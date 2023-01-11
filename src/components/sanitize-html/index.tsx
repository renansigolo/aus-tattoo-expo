type SanitizeHtmlProps = {
  htmlString: string
  element?: "div" | "span" | "article" | "h1" | "p"
}
export const SanitizeHtml = ({ htmlString, element }: SanitizeHtmlProps) => {
  switch (element) {
    case "div":
      return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    case "span":
      return <span dangerouslySetInnerHTML={{ __html: htmlString }} />
    case "article":
      return <article dangerouslySetInnerHTML={{ __html: htmlString }} />
    case "h1":
      return <h1 dangerouslySetInnerHTML={{ __html: htmlString }} />
    case "p":
      return <p dangerouslySetInnerHTML={{ __html: htmlString }} />

    default:
      return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  }
}
