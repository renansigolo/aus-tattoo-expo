type PageTitleProps = {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return (
    <h1 className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-white sm:text-4xl">
      {title}
    </h1>
  )
}
