import type { GetServerSideProps, NextPage } from 'next'
import styles from '../styles/Home.module.css'
import {signOut, useSession, getSession, GetSessionOptions} from 'next-auth/client'
import {apiGetSession} from 'services/auth'
import {withAuthSync} from 'components/Auth/security'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  console.log('Session ', session);
  if (!session) return <div></div>

  if (session) {
    return (
      <div className={styles.container}>
        <h1>Protected Page</h1>
        <h3>{session?.user?.name}</h3>
        <button onClick={() => signOut()}>Sign Out</button>
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

export default withAuthSync(Home)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  console.log('getServerSideProps ', context?.resolvedUrl);
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?redirect_to=${context?.resolvedUrl}`,
        permanent: false
      }
    }
  }
  return {
    props: { session }
  }
}