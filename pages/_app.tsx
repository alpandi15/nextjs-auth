import type { AppProps } from 'next/app'
import Layout from 'components/Layouts'
import { AppProvider, SessionProvider } from 'providers'
import '../styles/globals.css'
import { useRouter } from 'next/dist/client/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {asPath} = useRouter()

  return (
    <SessionProvider.Provider value={{
      session: {
        user: pageProps?.session?.user,
        token: pageProps?.session?.token
      }
    }}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} key={asPath}/>
        </Layout>
      </AppProvider>
    </SessionProvider.Provider>
  )
}

export default MyApp
