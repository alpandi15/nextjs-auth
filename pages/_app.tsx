import {memo} from 'react'
import type { AppProps } from 'next/app'
import { AppStoreProvider, SessionProvider } from 'providers'
import '../styles/globals.css'
import '../styles/tailwind.css'
import { useRouter } from 'next/dist/client/router'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import {ToastContainer} from 'components/Alert/Toast'
import { Provider as ReduxProvider } from 'react-redux'
import store from 'redux/store'
import { ThemeProvider } from 'next-themes';

const MemoizedToastContaineer = memo(ToastContainer)

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

    <ReduxProvider store={store}>
      <SessionProvider.Provider value={{
        session: {
          user: pageProps?.session?.user,
          token: pageProps?.session?.token
        }
      }}>
        <AppStoreProvider>
          <ThemeProvider attribute="class">
            {
              getLayout(
                <>
                  <Component {...pageProps} key={asPath}/>
                  <MemoizedToastContaineer />
                </>
              )
            }
          </ThemeProvider>
        </AppStoreProvider>
      </SessionProvider.Provider>
    </ReduxProvider>
  )
}

export default MyApp
