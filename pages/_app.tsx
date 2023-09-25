import type { AppProps } from "next/app"

import { NhostClient, NhostProvider } from "@nhost/nextjs"

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

import "../styles/tailwind.css"
import "../styles/slick.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // @ts-ignore
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession} >
      <Component {...pageProps} />
    </NhostProvider>
  )
}

export default MyApp
