import {useEffect} from 'react'
import type { NextPage } from 'next'
import styles from 'styles/Home.module.css'
import {signIn, signOut, useSession} from 'next-auth/client'
import {useForm} from 'react-hook-form'
import Input from 'components/Form/Input'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const [session, loading] = useSession()
  const {query} = useRouter()
  console.log('Session ', session);

  const {
    control,
    formState: {errors, isSubmitting},
    handleSubmit
  } = useForm()
  const onSubmit = async (values: any) => {
    console.log(values)
    signIn('login-credential', {
      account: values?.account,
      password: values?.password,
      callbackUrl: `${window.location.origin}${query?.redirect_to}` 
    })
  }
  return (
    <div className={styles.container}>
      <div>Login</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="text"
            id="account"
            name="account"
            icon="email"
            control={control}
            placeholder="Email or Phone Number"
            error={errors?.account?.message}
          />
        </div>
        <div>
          <Input
            type="password"
            id="password"
            name="password"
            control={control}
            placeholder="Password"
            icon="lock"
            error={errors?.password?.message}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default Home
