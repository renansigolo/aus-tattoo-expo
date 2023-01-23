import { CardImage } from "@/components/CardImage"
import { Container } from "@/components/Container"
import { getAllRetailers } from "@/lib/queries"
import { GetStaticProps, InferGetStaticPropsType } from "next"

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Artists({ nodes }: Props) {
  return (
    <section className="text-white">
      <Container>
        <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
          Retailers Line Up
        </h1>
        <ul
          role="list"
          className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {nodes.map((node) => (
            <li key={node.title}>
              <CardImage
                key={node.slug}
                image={node.acfFeaturedImage.profileImage}
                title={node.title}
                description={node.retailer.websiteUrl}
                url={`/retailers/profile/${node.slug}`}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export const getStaticProps = (async () => {
  const data = await getAllRetailers()

  return {
    props: { ...data },
    revalidate: 10,
  }
}) satisfies GetStaticProps
