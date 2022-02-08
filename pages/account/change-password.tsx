import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import {authPage} from 'components/Middleware'
import {logout} from 'services/auth'
import {ProtectLayout as Layout} from 'components/Layouts'
import { ReactElement } from 'react'
import type {Page} from 'types/page'
import Link from 'next/link'
import styles from './Profile.module.css'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await authPage(ctx);
  return {
    props: { session }
  }
}

const ChangePassword: Page = ({session}: any) => {
  if (!session) return <div></div>

  if (session) {
    return (
      <div className={styles.container}>
        <h1>Change Password</h1>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <p>Access Denied</p>
    </div>
  )
}

ChangePassword.getLayout = (page: ReactElement) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ChangePassword
