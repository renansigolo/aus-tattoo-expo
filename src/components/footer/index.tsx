import { SanitizeHtml } from "@/components/sanitize-html"
import Container from "@/components/wordpress/container"
import style from "./footer.module.scss"

const year = new Date().getFullYear()
const footerContent = {
  disclaimer: `The Australian Tattoo Expo is a world leading Tattoo Event in theSouthern Hemisphere and home to an incredible line-up of artists,tattoo competitions judged by industry power houses, body piercingmerchandise, and thrilling sideshow entertainment.<br />Under one roof. Over a jam packed weekend.<br />Check dates and join us at the Australian Tattoo Festiva coming toyour city!`,
  copyright: `All rights reserved. The Australian Tattoo Expo ${year}`,
}

type FooterProps = {
  disclaimer?: string
  copyright?: string
  sponsors?: any[]
}

export default function Footer({
  disclaimer = footerContent.disclaimer,
  copyright = footerContent.copyright,
}: FooterProps) {
  return (
    <footer className={style.footer}>
      <Container>
        {/* <Sponsors images={homePageContent?.page?.sponsors?.images} /> */}
        <div className={style.disclaimer}>
          <SanitizeHtml htmlString={disclaimer} element="p" />
        </div>

        <div className={style.copyright}>
          <p>{copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
