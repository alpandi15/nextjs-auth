import type { NextPage } from 'next'
import Link from 'next/link'
import {useSession} from 'next-auth/client'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [session, loading] = useSession()

  console.log('ZHOME PAGHE ', session)
  return (
    <div className={styles.container}>
      <p>Public Page</p>
      {
        !loading && session && (
          <Link href="/protect">
            <a>Home Page</a>
          </Link>
        )
      }
    </div>
  )
}

export default Home
