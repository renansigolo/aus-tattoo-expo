import "swiper/css"

import { WPImage } from "@/utils/wp-types"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const defaultImages = [
  {
    sourceUrl: "/images/defaults/carousel-1.jpg",
    altText: "Banner Image 1",
    title: "Banner Image 1",
  },
  {
    sourceUrl: "/images/defaults/carousel-2.jpg",
    altText: "Banner Image 2",
    title: "Banner Image 2",
  },
  {
    sourceUrl: "/images/defaults/carousel-3.jpg",
    altText: "Banner Image 3",
    title: "Banner Image 3",
  },
  {
    sourceUrl: "/images/defaults/carousel-4.jpg",
    altText: "Banner Image 4",
    title: "Banner Image 4",
  },
  {
    sourceUrl: "/images/defaults/carousel-5.jpg",
    altText: "Banner Image 5",
    title: "Banner Image 5",
  },
]

type CarouselProps = {
  images?: WPImage[]
  useDefault?: boolean
}

export function Carousel({ images, useDefault }: CarouselProps) {
  if (useDefault) images = defaultImages
  if (!images) return null

  return (
    <Swiper
      modules={[Autoplay]}
      centeredSlides={true}
      slidesPerView={1}
      loop={true}
      speed={1500}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="max-h-96 min-h-[10vh]">
            <img
              src={image.sourceUrl}
              alt={image.altText || `Slider Image ${index}`}
              width={1170}
              height={387}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
