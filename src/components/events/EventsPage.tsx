import { Posts } from "@/components/posts/Posts"
import { WPCategories } from "src/utils/wp-types"

type EventsPageProps = {
  page: any
  category: WPCategories
}
export function EventsPage({ page, category }: EventsPageProps) {
  return (
    <>
      <h1 className={"mb-8 text-center text-5xl"}>{page?.title}</h1>

      {page?.eventsContent?.featured && (
        <>
          <h2 className="mb-8 text-center text-3xl capitalize">
            Featured {category}
          </h2>
          <Posts posts={page?.eventsContent?.featured} />
        </>
      )}
    </>
  )
}
