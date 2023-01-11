import "swiper/css"

import Container from "@/components/wordpress/container"
import Image from "next/image"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"

const images = [
  "/images/slider/AustralianTattooExpo-Slide01.jpg",
  "/images/slider/AustralianTattooExpo-Slide02.jpg",
  "/images/slider/AustralianTattooExpo-Slide03.jpg",
  "/images/slider/AustralianTattooExpo-Slide04.jpg",
  "/images/slider/AustralianTattooExpo-Slide05.jpg",
]

// type CarouselProps = {
//   images: string[]
// }

export default function Carousel() {
  return (
    <Container>
      <div className="py-4">
        <Swiper
          className="text-white"
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
          {images.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <div className="h-full min-h-[10vh]">
                <Image
                  src={imageUrl}
                  alt={`Slider Image ${index}`}
                  width={1170}
                  height={387}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  )
}
