import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import {useSession} from 'components/Middleware'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await useSession(ctx);
  return {
    props: { session }
  }
}

const Home: NextPage = ({session}: any) => {
  console.log('ZHOME PAGHE ', session)
  return (
    <div className={styles.container}>
      <p>Public Page</p>
      <Link href="/protect">
        <a>Protect</a>
      </Link>
    </div>
  )
}

export default Home
