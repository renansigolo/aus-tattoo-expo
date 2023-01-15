import Container from "@/components/Container"
import Image from "next/image"
import Link from "next/link"

const nodes = [
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
  {
    slug: "lil-j-tattoos",
    title: "Lil J Tattoos",
    studioName: "The Admiral's Arms",
    featuredImage: {
      node: {
        sourceUrl:
          "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
      },
    },
    author: {
      node: {
        name: "Lil J",
        avatar: {
          url: "https://www.tattooexpo.com.au/wp-content/uploads/2022/11/Screen-Shot-2022-11-30-at-11.02.35-am-1.png",
        },
      },
    },
    excerpt: "The Admiral's Arms",
  },
]

export default function Retailers() {
  return (
    <section className="text-white">
      <Container>
        <h1 className="py-6 text-center text-3xl font-bold tracking-tight text-white sm:text-3xl">
          Meet all the Retailers
        </h1>
        <ul
          role="list"
          className="grid gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6"
        >
          {nodes.map((node) => (
            <li key={node.title}>
              <Link href={`/artists/profile/${node.slug}`}>
                <article>
                  {/* <article className={style.card}> */}
                  <header>
                    <Image
                      src={node.featuredImage.node.sourceUrl}
                      alt={node.title}
                      width={140}
                      height={140}
                    />
                  </header>
                  <footer>
                    <h3>{node.title}</h3>
                    <p>{node.studioName}</p>
                  </footer>
                </article>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
