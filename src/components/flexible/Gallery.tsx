import { Grid } from "@/components/layout/Grid"
import { WPImage } from "@/lib/utils/types"
import Image from "next/image"

type GalleryProps = {
  gallery: {
    images: WPImage[]
    columns?: number
  }
}

export function Gallery({ gallery }: GalleryProps) {
  return (
    <Grid columns={gallery.columns || 1}>
      {gallery.images.map((image: any, index: number) => (
        <div key={index} className="max-w-full rounded-sm">
          <Image
            src={image.sourceUrl}
            alt={image.altText || image.title}
            width={1024}
            height={1024}
            className="w-full object-contain"
          />
        </div>
      ))}
    </Grid>
  )
}
