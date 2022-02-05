import type { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
import {authPage} from 'components/Middleware'
import {logout} from 'services/auth'
import {ProtectLayout as Layout} from 'components/Layouts'
import { ReactElement } from 'react'
import type {Page} from 'types/page'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await authPage(ctx);
  return {
    props: { session }
  }
}

const Home: Page = ({session}: any) => {
  if (!session) return <div></div>

  if (session) {
    return (
      <div className={styles.container}>
        <h1>Profile Page</h1>
        <h3>{session?.user?.firstName}</h3>
        <button onClick={logout.bind(this)}>Sign Out</button>
        <p>You can view this page because you are signed in.</p>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <p>Access Denied</p>
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default Home
