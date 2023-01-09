import { CMS_NAME, CMS_URL } from "@/lib/utils/constants"

export default function Intro() {
  return (
    <section className="mt-16 mb-16 flex flex-col items-center md:mb-12 md:flex-row md:justify-between">
      <h1 className="text-6xl font-bold leading-tight tracking-tighter md:pr-8 md:text-8xl">
        Blog.
      </h1>
      <h4 className="mt-5 text-center text-lg md:pl-8 md:text-left">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="hover:text-success underline transition-colors duration-200"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="hover:text-success underline transition-colors duration-200"
        >
          {CMS_NAME}
        </a>
        .
      </h4>
    </section>
  )
}
