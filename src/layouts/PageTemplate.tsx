import { FlexibleComponents } from "@/components/flexible/FlexibleComponents"
import { HeroBanner } from "@/components/flexible/HeroBanner"
import { Container } from "@/components/layout/Container"

type PageTemplateProps = {
  flexibleContent: {
    components: any[]
  }
  heroBanner?: any
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
          <HeroBanner
            sourceUrl={
              heroBanner?.image?.sourceUrl || "/images/defaults/hero-banner.jpg"
            }
            altText={heroBanner?.image?.altText}
            title={heroBanner?.image?.title}
          />

          {!isFrontPage && (
            <h1 className="my-8 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
          )}

          <FlexibleComponents flexibleContent={flexibleContent} />
        </Container>
      </main>
    </>
  )
}
