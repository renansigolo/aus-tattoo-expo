import { SanitizeHtml } from 'src/lib/helpers'
import style from './Footer.module.scss'

const year = new Date().getFullYear()
const footerContent = {
  sponsors: [
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
    {
      title: 'Sponsor Title',
      imageUrl: 'https://placeholder.pics/svg/256x256',
    },
  ],
  disclaimer: `The Australian Tattoo Expo is a world leading Tattoo Event in theSouthern Hemisphere and home to an incredible line-up of artists,tattoo competitions judged by industry power houses, body piercingmerchandise, and thrilling sideshow entertainment.<br />Under one roof. Over a jam packed weekend.<br />Check dates and join us at the Australian Tattoo Festiva coming toyour city!`,
  copyright: `All rights reserved. The Australian Tattoo Expo ${year}`,
}

export default function Footer() {
  const { sponsors, disclaimer, copyright } = footerContent

  return (
    <footer className={style.footer}>
      <section>
        <div className={style.sponsors}>
          {sponsors.map(({ title, imageUrl }) => (
            <img
              key={title}
              src={imageUrl}
              alt={title}
              width={256}
              height={256}
            />
          ))}
        </div>

        <div className={style.disclaimer}>
          <SanitizeHtml htmlString={disclaimer} element="p" />
        </div>

        <div className={style.copyright}>
          <p>{copyright}</p>
        </div>
      </section>
    </footer>
  )
}
