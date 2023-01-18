import { Accordion } from "@/components/Accordion"
import { Boxes } from "@/components/Boxes"
import { CallToAction } from "@/components/CallToAction"
import { Carousel } from "@/components/Carousel"
import { Expos } from "@/components/Expos"
import { FeaturedArtists } from "@/components/FeaturedArtists"
import { Gallery } from "@/components/Gallery"
import { HeroBanner } from "@/components/HeroBanner"
import { MultiColumns } from "@/components/MultiColumns"
import { PageContent } from "@/components/PageContent"
import { YoutubePlayer } from "@/components/YoutubePlayer"

export function FlexibleComponents({ flexibleContent }: any) {
  return (
    <>
      {flexibleContent?.components?.map((component: any, index: number) => {
        return (
          <div key={index} className="my-3">
            <FlexibleComponent component={component} />
          </div>
        )
      })}
    </>
  )
}

function FlexibleComponent({ component }: any) {
  return (
    <>
      {component.fieldGroupName === "Gallery" && <Gallery {...component} />}
      {component.fieldGroupName === "MultiColumns" && (
        <MultiColumns {...component.multiColumns} />
      )}
      {component.fieldGroupName === "HeroBanner" && (
        <HeroBanner {...component.heroBanner} />
      )}
      {component.fieldGroupName === "CtaBanner" && (
        <CallToAction {...component.ctaBanner} />
      )}
      {component.fieldGroupName === "YoutubeVideo" && (
        <YoutubePlayer {...component.youtubeVideo} />
      )}
      {component.fieldGroupName === "ContentEditor" && (
        <PageContent {...component.contentEditor} />
      )}
      {component.fieldGroupName === "Featured" && (
        <FeaturedArtists {...component.featured} />
      )}
      {component.fieldGroupName === "Carousel" && (
        <Carousel {...component.carousel} />
      )}
      {component.fieldGroupName === "Expos" && <Expos {...component.expos} />}
      {component.fieldGroupName === "Boxes" && <Boxes {...component.boxes} />}
      {component.fieldGroupName === "Accordion" && (
        <Accordion {...component.accordion} />
      )}
    </>
  )
}
