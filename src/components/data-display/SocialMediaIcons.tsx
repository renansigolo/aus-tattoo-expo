import { classNames } from "@/lib/utils/cn"
import {
  faChrome,
  faFacebook,
  faInstagram,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

type SocialMediaContent = {
  id: string
  icon: IconDefinition
  url: string
  brandColor: string
}

type SocialMediaIconsProps = {
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  websiteUrl?: string
  contactEmail?: string
}
export function SocialMediaIcons({
  instagramUrl,
  facebookUrl,
  twitterUrl,
  websiteUrl,
  contactEmail,
}: SocialMediaIconsProps) {
  const socialMediaContent: SocialMediaContent[] = [
    {
      id: "instagram",
      icon: faInstagram,
      url: instagramUrl || "",
      brandColor: "hover:text-pink-500",
    },
    {
      id: "facebook",
      icon: faFacebook,
      url: facebookUrl || "",
      brandColor: "hover:text-blue-500",
    },
    {
      id: "twitter",
      icon: faTwitter,
      url: twitterUrl || "",
      brandColor: "hover:text-sky-500",
    },
    {
      id: "website",
      icon: faChrome,
      url: websiteUrl || "",
      brandColor: "hover:text-amber-500",
    },
  ]

  return (
    <div className="mt-5 flex justify-center gap-x-4 sm:mt-0">
      {socialMediaContent.map(
        (item) =>
          item.url && (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className={classNames(
                "flex items-center justify-center text-sm font-medium",
                item.brandColor
              )}
            >
              <FontAwesomeIcon icon={item.icon} size="2xl" />
            </Link>
          )
      )}
    </div>
  )
}
