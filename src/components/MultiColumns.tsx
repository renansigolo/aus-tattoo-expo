import { Grid } from "@/components/Grid"
import { PageContent } from "@/components/PageContent"

type MultiColumnsProps = {
  items: [
    {
      content: string
    }
  ]
}
export function MultiColumns({ items }: MultiColumnsProps) {
  return (
    <Grid columns={items.length}>
      {items?.map(({ content }, index) => (
        <PageContent content={content} key={index} />
      ))}
    </Grid>
  )
}
