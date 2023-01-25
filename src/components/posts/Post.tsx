import { CardImage } from "@/components/data-display/CardImage"

type PostProps = {
  post: any
}

export function Post({ post }: PostProps) {
  const postData = post?.node ?? post

  const uri = postData["artist"]
    ? `/artists/profile/${postData?.slug}`
    : `/retailers/profile/${postData?.slug}`

  return (
    <div className="mb-8">
      <CardImage
        image={postData?.acfFeaturedImage?.profileImage}
        title={postData?.title}
        description={postData?.artist?.studioName}
        uri={uri}
      />
    </div>
  )
}
