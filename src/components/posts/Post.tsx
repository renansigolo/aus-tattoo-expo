import { CardImage } from "@/components/data-display/CardImage"

type PostProps = {
  post: any
}

export function Post({ post }: PostProps) {
  const postData = post?.node ?? post

  return (
    <div className="mb-8">
      <CardImage
        image={postData?.acfFeaturedImage?.profileImage}
        title={postData?.title}
        description={postData?.artist?.studioName}
        url={`/artists/profile/${postData?.slug}`}
      />
    </div>
  )
}
