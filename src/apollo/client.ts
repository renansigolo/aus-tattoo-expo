import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache({
  resultCaching: false,
})

const link = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
})

const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
})

export default client
