import Container from "@/components/wordpress/container"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="bg-black">
      <Container>
        <div className="py-6 text-center uppercase sm:py-12">
          <h2 className="text-3xl font-bold text-primary">
            <Link
              href="https://instagram.com/austattooexpo"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow for more <span className="text-white">@AUSTATTOOEXPO</span>
            </Link>
          </h2>
        </div>
      </Container>
    </section>
  )
}
