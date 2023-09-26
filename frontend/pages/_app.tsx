import type { AppProps } from "next/app"
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as Fathom from 'fathom-client'
import { NhostClient, NhostProvider } from "@nhost/nextjs"

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

import "../styles/tailwind.css"
import "../styles/slick.css"



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();


  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load('DXGFCTUG', {
      includedDomains: ['talkitext.com'],
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);


  return (
    // @ts-ignore
    <NhostProvider nhost={nhost} initial={pageProps.nhostSession} >
      <Component {...pageProps} />
    </NhostProvider>
  )
}

export default MyApp
