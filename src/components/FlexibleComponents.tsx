import { Accordion } from "@/components/Accordion"
import { Boxes } from "@/components/Boxes"
import { CallToAction } from "@/components/CallToAction"
import { Carousel } from "@/components/Carousel"
import { FeaturedArtists } from "@/components/FeaturedArtists"
import { HeroBanner } from "@/components/HeroBanner"
import { PageContent } from "@/components/PageContent"
import { Expos } from "@/components/Shows"
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
      {component.fieldGroupName === "YoutubeVideo" && (
        <YoutubePlayer videoUrl={component.videoUrl} />
      )}
      {component.fieldGroupName === "HeroBanner" && (
        <HeroBanner {...component.image} />
      )}
      {component.fieldGroupName === "Carousel" && (
        <Carousel images={component.images} />
      )}
      {component.fieldGroupName === "ContentEditor" && (
        <PageContent content={component.content} />
      )}
      {component.fieldGroupName === "CtaBanner" && (
        <CallToAction {...component.ctaBanner} />
      )}
      {component.fieldGroupName === "Accordion" && <Accordion {...component} />}
      {component.fieldGroupName === "Expos" && <Expos {...component} />}
      {component.fieldGroupName === "Boxes" && <Boxes {...component} />}
      {component.fieldGroupName === "Featured" && (
        <FeaturedArtists {...component} />
      )}
    </>
  )
}
