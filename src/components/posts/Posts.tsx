import { Container } from "@/components/layout/Container"
import { Post } from "@/components/posts/Post"

type PostsProps = {
  posts: any[] | any
}

function NotFound() {
  return (
    <div className="my-36 text-center">
      <h3 className="text-xl">Sorry nothing has been found 😕</h3>
    </div>
  )
}

export function Posts({ posts }: PostsProps) {
  if (!posts || posts.length === 0) {
    return <NotFound />
  }

  const postsData = posts ? posts : posts.node

  return (
    <Container>
      <div className="my-8 grid grid-cols-2 gap-3 text-center sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {postsData.map((post: any, index: number) => {
          return (
            <div key={`${post?.node?.id}-${index}` ?? ""}>
              <Post post={post} />
            </div>
          )
        })}
      </div>
    </Container>
  )
}
