"use client"

import client from "@/apollo/client"
import { ApolloProvider } from "@apollo/client"
import { ReactNode } from "react"

type ProvidersProps = {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
