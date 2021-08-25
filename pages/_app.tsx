import type { AppProps } from 'next/app'
import Layout from 'components/Layouts'
import {AppProvider} from 'providers/Provider'
import '../styles/globals.css'
import { useRouter } from 'next/dist/client/router'

const MyApp = ({ Component, pageProps }: AppProps) => {
  console.log('AUTHENTICATE ', pageProps);
  const {asPath} = useRouter()
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} key={asPath}/>
      </Layout>
    </AppProvider>
  )
}

export default MyApp
