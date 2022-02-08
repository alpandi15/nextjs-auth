import type { AppProps } from 'next/app'
import { AppStoreProvider, SessionProvider } from 'providers'
import '../styles/globals.css'
import '../styles/tailwind.css'
import { useRouter } from 'next/dist/client/router'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const {asPath} = useRouter()
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider.Provider value={{
      session: {
        user: pageProps?.session?.user,
        token: pageProps?.session?.token
      }
    }}>
      <AppStoreProvider>
        <>
          {
            getLayout(
              <Component {...pageProps} key={asPath}/>
            )
          }
        </>
      </AppStoreProvider>
    </SessionProvider.Provider>
  )
}

export default MyApp
