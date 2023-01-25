import { Container } from "@/components/layout/Container"
import { Post } from "@/components/posts/Post"

type PostsProps = {
  posts: any[] | any
}

export function Posts({ posts }: PostsProps) {
  if (!posts && !Array.isArray(posts)) {
    return null
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
