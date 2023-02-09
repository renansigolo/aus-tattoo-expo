import { EventsPage } from "@/components/events/EventsPage"
import { EventsPosts } from "@/components/events/EventsPosts"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"
import { WPCategories } from "@/lib/utils/types"

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
          : posts.edges.length > 0 && (
              <EventsPosts posts={posts} category={category} slug={slug} />
            )}
      </article>
    </Container>
  )
}
