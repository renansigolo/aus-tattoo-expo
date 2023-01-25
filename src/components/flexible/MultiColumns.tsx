import { ContentEditor } from "@/components/flexible/ContentEditor"
import { Grid } from "@/components/layout/Grid"

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
        <ContentEditor content={content} key={index} />
      ))}
    </Grid>
  )
}
