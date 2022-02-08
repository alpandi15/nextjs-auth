import type { GetServerSideProps } from 'next'
// import Image from 'next/image'
import {authPage} from 'components/Middleware'
// import {logout} from 'services/auth'
import {ProtectLayout as Layout} from 'components/Layouts'
import { ReactElement } from 'react'
import type {Page} from 'types/page'
import {useForm} from 'react-hook-form'
// import Link from 'next/link'
import styles from 'styles/Account.module.css'
import AccessDenied from 'components/PageError/AccessDenied'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await authPage(ctx);
  return {
    props: { session }
  }
}

const ChangePassword: Page = ({session}: any) => {
  if (session) {
    return (
      <div className={styles.container}>
        <h1>Change Password</h1>
      </div>
    )
  }
  return <AccessDenied />
}

ChangePassword.getLayout = (page: ReactElement) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ChangePassword
