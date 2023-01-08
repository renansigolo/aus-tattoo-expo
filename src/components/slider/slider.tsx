import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
}

const sponsors = [
  {
    title: 'Sponsor Title 1',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
  {
    title: 'Sponsor Title 2',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
  {
    title: 'Sponsor Title 3',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
  {
    title: 'Sponsor Title 4',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
  {
    title: 'Sponsor Title 5',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
  {
    title: 'Sponsor Title 6',
    imageUrl: 'https://placeholder.pics/svg/256x256',
  },
]

export default function Slider() {
  return (
    <Carousel
      infinite
      centerMode
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={300}
      arrows={false}
      customTransition="all 1s linear"
    >
      {sponsors.map(({ title, imageUrl }, index) => (
        <img src={imageUrl} key={index} alt={title} />
      ))}
    </Carousel>
  )
}
