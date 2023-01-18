import { Container } from "@/components/Container"
import { FlexibleComponents } from "@/components/FlexibleComponents"
import { HeroBanner } from "@/components/HeroBanner"
import { WPImage } from "@/lib/utils/types"

type PageTemplateProps = {
  flexibleContent: {
    components: any[]
  }
  heroBanner?: WPImage
  isFrontPage?: boolean
  title?: string
}
export function PageTemplate({
  flexibleContent,
  heroBanner,
  isFrontPage,
  title,
}: PageTemplateProps) {
  return (
    <>
      <main className="min-h-[80vh] text-white">
        <Container>
          {!isFrontPage && (
            <h1 className="my-8 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          )}

          <HeroBanner
            sourceUrl={
              heroBanner?.sourceUrl || "/images/defaults/hero-banner.jpg"
            }
            altText={heroBanner?.altText}
            title={heroBanner?.title}
          />

          <FlexibleComponents flexibleContent={flexibleContent} />
        </Container>
      </main>
    </>
  )
}
