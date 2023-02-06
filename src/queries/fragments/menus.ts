import { gql } from "@apollo/client"

export const MenuFragment = gql`
  fragment MenuFragment on MenuItem {
    id
    label
    url
    path
    target
  }
`
