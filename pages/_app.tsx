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
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import { I18nProvider } from 'components/Translator/I18n'
import SEO from '../next-seo.config'

const MemoizedToastContaineer = memo(ToastContainer)

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const {asPath} = useRouter()
  const getLayout = Component.getLayout ?? ((page) => page)
  const { locale = 'id' } = router

  return (
    <ReduxProvider store={store}>
      <DefaultSeo {...SEO} key={router.route} />
      <I18nProvider locale={locale}>
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
      </I18nProvider>
    </ReduxProvider>
  )
}

export default MyApp
