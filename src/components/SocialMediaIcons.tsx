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

const socialMediaIcons = [
  {
    id: "instagram",
    icon: faInstagram,
    url: "#",
    brandColor: "pink-500",
  },
  { id: "facebook", icon: faFacebook, url: "#", brandColor: "blue-500" },
  { id: "twitter", icon: faTwitter, url: "#", brandColor: "sky-500" },
  {
    id: "website",
    icon: faChrome,
    url: "#",
    brandColor: "amber-500",
  },
]

type SocialMediaContent = {
  id: string
  icon: IconDefinition
  url: string
  brandColor: string
}

type SocialMediaIconsProps = {
  instagram?: string
  facebook?: string
  twitter?: string
  website?: string
}
export function SocialMediaIcons({
  instagram,
  facebook,
  twitter,
  website,
}: SocialMediaIconsProps) {
  const socialMediaContent: SocialMediaContent[] = [
    {
      id: "instagram",
      icon: faInstagram,
      url: instagram || "",
      brandColor: "pink-500",
    },
    {
      id: "facebook",
      icon: faFacebook,
      url: facebook || "",
      brandColor: "blue-500",
    },
    {
      id: "twitter",
      icon: faTwitter,
      url: twitter || "",
      brandColor: "sky-500",
    },
    {
      id: "website",
      icon: faChrome,
      url: website || "",
      brandColor: "amber-500",
    },
  ]

  return (
    <div className="mt-5 flex justify-center gap-x-4 sm:mt-0">
      {socialMediaContent.map(
        (item: any) =>
          item.url && (
            <Link
              key={item.id}
              href={item.url}
              target="_blank"
              className={classNames(
                "flex items-center justify-center text-sm font-medium",
                `hover:text-${item.brandColor}`
              )}
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </Link>
          )
      )}
    </div>
  )
}
