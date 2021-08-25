import type { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
import {withAuthSync} from 'components/Auth/security'
import {authPage} from 'components/Middleware'
import {logout} from 'services/auth'
import { useAppContext } from 'providers/AppProvider'
import {SESSION_USER} from 'reducers/types'
import { useEffect } from 'react'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await authPage(ctx);
  return {
    props: { session }
  }
}

const Home = ({session}: any) => {
  const {dispatch} = useAppContext()
  useEffect(() => {
    dispatch({
      type: SESSION_USER,
      payload: {
        user: 'INI S',
      },
    });
  }, [dispatch])
  if (!session) return <div></div>

  if (session) {
    return (
      <div className={styles.container}>
        <h1>Protected Page</h1>
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

export default withAuthSync(Home)
