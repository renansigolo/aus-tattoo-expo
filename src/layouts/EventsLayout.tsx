import { EventsPage } from "@/components/events/EventsPage"
import { EventsPosts } from "@/components/events/EventsPosts"
import { FlexibleComponents } from "@/components/flexible/FlexibleComponents"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"
import { WPCategories } from "@/utils/wp-types"

type EventsLayoutProps = {
  page: any
  posts: any
  category: WPCategories
  slug?: string
}

export function EventsLayout({
  page,
  posts,
  category,
  slug,
}: EventsLayoutProps) {
  return (
    <Container>
      <HeroBanner useDefaultValues />

      <article className="py-8 text-white">
        {page && <EventsPage page={page} category={category} />}

        {category === "artists"
          ? posts.artists.edges.length > 0 && (
              <EventsPosts
                posts={posts.artists}
                category={category}
                slug={slug}
              />
            )
          : posts.retailers.edges.length > 0 && (
              <EventsPosts
                posts={posts.retailers}
                category={category}
                slug={slug}
              />
            )}

        <FlexibleComponents flexibleContent={page?.flexibleContent} />
      </article>
    </Container>
  )
}
