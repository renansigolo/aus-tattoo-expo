import Container from "@/components/wordpress/container"
import { WPImage } from "@/lib/utils/types"

const year = new Date().getFullYear()
const footerContent = {
  disclaimer: `The Australian Tattoo Expo is a world leading Tattoo Event in theSouthern Hemisphere and home to an incredible line-up of artists,tattoo competitions judged by industry power houses, body piercingmerchandise, and thrilling sideshow entertainment.<br />Under one roof. Over a jam packed weekend.<br />Check dates and join us at the Australian Tattoo Festiva coming toyour city!`,
  copyright: `All rights reserved. The Australian Tattoo Expo ${year}`,
}

type FooterProps = {
  disclaimer?: string
  copyright?: string
  sponsors?: WPImage[] | any
}

export default function Footer({
  disclaimer = footerContent.disclaimer,
  copyright = footerContent.copyright,
  sponsors,
}: FooterProps) {
  return (
    <footer className="bg-black py-6 text-center text-white">
      <Container>
        {/* <Sponsors images={sponsors} /> */}
        <div
          className="py-6 text-sm"
          dangerouslySetInnerHTML={{ __html: disclaimer }}
        />

        <div className="text-xs text-gray-400">
          <p>{copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
