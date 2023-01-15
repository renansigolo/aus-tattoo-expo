import "swiper/css"

import { WPImage } from "@/lib/utils/types"
import Image from "next/image"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

type CarouselProps = {
  images: WPImage[]
}

export default function Carousel({ images }: CarouselProps) {
  if (!images) return <></>
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
            <Image
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
