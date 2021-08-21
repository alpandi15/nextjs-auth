import type { AppContext, AppProps } from 'next/app'
import {Provider as NextAuthProvider} from 'next-auth/client'
import Layout from 'components/Layouts'
import {AppProvider} from 'providers/Provider'
import '../styles/globals.css'
import { useRouter } from 'next/dist/client/router'
import {apiGetSession} from 'services/auth'
import { GetSessionOptions } from 'next-auth/client'

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log('AUTHENTICATE ', pageProps);
  const {asPath} = useRouter()
  return (
    <NextAuthProvider
      session={pageProps?.session}
      options={{
        clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
        keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
      }}
    >
      <AppProvider>
        <Layout>
          <Component {...pageProps} key={asPath}/>
        </Layout>
      </AppProvider>
    </NextAuthProvider>
  )
}

export default MyApp

// MyApp.getInitialProps = async ({Component, ctx}: AppContext) => {
//   console.log('MyApp ', Component);
//   let pageProps: any = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }

//   const res = await apiGetSession(ctx)
//   console.log('SESSIONS ', res);
//   return {
//     pageProps,
//   }
// }
