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
  instagramUrl?: string
  facebookUrl?: string
  twitterUrl?: string
  websiteUrl?: string
}
export function SocialMediaIcons({
  instagramUrl,
  facebookUrl,
  twitterUrl,
  websiteUrl,
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
    // {
    //   id: "email",
    //   icon: faChrome,
    //   url: email || "",
    //   brandColor: "hover:text-amber-500",
    // },
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
                item.brandColor
              )}
            >
              <FontAwesomeIcon icon={item.icon} size="lg" />
            </Link>
          )
      )}
    </div>
  )
}
