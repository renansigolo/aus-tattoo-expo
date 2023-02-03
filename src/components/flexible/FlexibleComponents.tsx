import { Accordion } from "@/components/flexible/Accordion"
import { Boxes } from "@/components/flexible/Boxes"
import { CallToAction } from "@/components/flexible/CallToAction"
import { Carousel } from "@/components/flexible/Carousel"
import { ContentEditor } from "@/components/flexible/ContentEditor"
import { Expos } from "@/components/flexible/Expos"
import { Featured } from "@/components/flexible/Featured"
import { Gallery } from "@/components/flexible/Gallery"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { MultiColumns } from "@/components/flexible/MultiColumns"
import { TattooDetails } from "@/components/flexible/TattooDetails"
import { YoutubePlayer } from "@/components/flexible/YoutubePlayer"

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
        <ContentEditor {...component.contentEditor} />
      )}
      {component.fieldGroupName === "Featured" && (
        <Featured {...component.featured} />
      )}
      {component.fieldGroupName === "Carousel" && (
        <Carousel {...component.carousel} />
      )}
      {component.fieldGroupName === "TattooDetails" && (
        <TattooDetails {...component.tattooDetails} />
      )}
      {component.fieldGroupName === "Expos" && <Expos {...component.expos} />}
      {component.fieldGroupName === "Boxes" && <Boxes {...component.boxes} />}
      {component.fieldGroupName === "Accordion" && (
        <Accordion {...component.accordion} />
      )}
    </>
  )
}
