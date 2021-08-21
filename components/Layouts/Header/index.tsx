import {memo} from 'react'
import Link from 'next/link'
import {useSession, signOut} from 'next-auth/client'
import styles from './Header.module.css'

const Header = () => {
  const [session, loading] = useSession()
  console.log('HEADER ', session, loading);
  return (
    <header className={styles.container}>
      <div>
        <Link href="/">
          <a>Next Auth</a>
        </Link>
      </div>
      <div>Header</div>
      <div>
        {
          !loading && session ? (
            <button onClick={() => signOut()}>Logout</button>
          ) : (
            <Link href="/auth/login">
              <a>Login</a>
            </Link>
          )
        }
      </div>
    </header>
  )
}

export default memo(Header)
