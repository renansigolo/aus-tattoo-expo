import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"

const link = createHttpLink({
  uri: `${process.env.SITE_URL}/graphql`,
})

const cache = new InMemoryCache({
  resultCaching: false,
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
