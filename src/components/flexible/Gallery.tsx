import { Grid } from "@/components/layout/Grid"
import { Modal } from "@/components/overlays/Modal"
import { WPImage } from "@/utils/wp-types"
import { useState } from "react"

type GalleryProps = {
  gallery: {
    images: WPImage[]
    columns?: number
  }
}

export function Gallery({ gallery }: GalleryProps) {
  const [open, setOpen] = useState(false)
  const [imageRef, setImageRef] = useState("")

  return (
    <>
      <Grid columns={gallery.columns || 1}>
        {gallery.images.map((image: any, index: number) => (
          <div key={index} className="max-w-full rounded-sm">
            <img
              loading="lazy"
              src={image.sourceUrl}
              alt={image.altText || image.title}
              width={1024}
              height={1024}
              className="aspect-square w-full object-cover hover:cursor-pointer"
              onClick={() => {
                setImageRef(image.sourceUrl)
                setOpen(true)
              }}
            />
          </div>
        ))}
      </Grid>

      <Modal sourceUrl={imageRef} open={open} setOpen={setOpen} />
    </>
  )
}
