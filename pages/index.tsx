import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from 'components/Layouts'
import styles from '../styles/Home.module.css'
import {useSession} from 'components/Middleware'
import { ReactElement } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await useSession(ctx);
  return {
    props: { session }
  }
}

const Home = () => {
  // console.log('ZHOME PAGHE ', session)
  return (
    <div className={styles.container}>
      <p>Public Page</p>
      <Link href="/protect">
        <a>Protect</a>
      </Link>
    </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home
