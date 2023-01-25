import { CardImage } from "@/components/CardImage"

export function Post({ post }: any) {
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
