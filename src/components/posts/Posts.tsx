import { Post } from "@/components/posts/Post"

type PostsProps = {
  posts: any[]
}

export function Posts({ posts }: PostsProps) {
  if (!posts && !Array.isArray(posts)) {
    return null
  }

  return (
    <div className="-mb-4 flex flex-wrap">
      {posts.map((post, index) => {
        return (
          <div
            key={`${post?.node?.id}-${index}` ?? ""}
            className="mb-4 w-full px-2 md:w-1/2 lg:w-1/3"
          >
            <Post post={post?.node} />
          </div>
        )
      })}
    </div>
  )
}
