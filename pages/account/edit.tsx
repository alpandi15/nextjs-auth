import type { NextPageContext } from 'next'
import styles from 'styles/AccountEdit.module.css'
import {useForm} from 'react-hook-form'
import Input from 'components/Form/Input'
import Image from 'components/Form/Image'
import { useRouter } from 'next/router'
import {apiUpdateProfile} from 'services/account'
import {ProtectLayout as Layout} from 'components/Layouts'
import {authPage} from 'components/Middleware'
import { ReactElement } from 'react'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import Button from 'components/Form/Button'
import {toast} from 'components/Alert/Toast'
import { useSessionContext } from 'providers'
import {uploadImage} from 'services/upload'

const validationSchema = yupResolver(
  yup.object({
    name: yup.string().required('*Required').min(6, 'Min 6 Characters'),
    username: yup.string().required('*Required').min(6, 'Min 6 Characters')
  })
);

export async function getServerSideProps(ctx: NextPageContext) {
  const { session } = await authPage(ctx);
  return { props: {session} }
}

type InputProps = {
  username: string|null
  name: string|null
  email: string|null
  image?: string|null
}
const ChangePassword = () => {
  const {back} = useRouter()
  const {session} = useSessionContext()

  const {
    control,
    formState: {errors, isSubmitting},
    handleSubmit
  } = useForm<InputProps>({
    resolver: validationSchema,
    defaultValues: {
      image: session?.user?.image?.url,
      // name: session?.user?.name,
      email: session?.user?.email,
      username: session?.user?.username
    }
  })

  const onSubmit = async (values: InputProps) => {
    let image: string|null|undefined
    let imageRaw: string|null|undefined
    if (typeof values?.image === 'object') {
      const { url, raw } = await uploadImage('profiles', values?.image)
      image = url
      imageRaw = raw
    } else {
      image = values?.image
      imageRaw = session?.user?.image?.raw
    }

    const res = await apiUpdateProfile({
      name: values?.name,
      username: values?.username,
      email: values?.email,
      image,
      imageRaw
    })

    if (res?.success) {
      toast.notify(res?.meta?.message, {
        title: 'Success',
        duration: 2,
        type: 'success'
      });
      return back()
    }

    toast.notify(res?.message, {
      title: 'Error',
      duration: 5,
      type: 'error'
    });
    return
  }

  return (
    <div className={styles.container}>
      <div className="mb-6">
        <div className="text-xl font-bold text-slate-800">Update Profile</div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
          <Image
            id="image"
            name="image"
            label="Image"
            control={control}
            error={errors?.image?.message}
            className={styles.inputImage}
            iconClass={styles.inputImageIcon}
          />
        </div>
        <div>
          <Input
            type="text"
            id="name"
            name="name"
            label="Name"
            control={control}
            placeholder="Name"
            autoComplete="off"
            error={errors?.name?.message}
          />
        </div>
        <div>
          <Input
            type="text"
            id="email"
            name="email"
            label="E-Mail"
            control={control}
            placeholder="E-Mail"
            autoComplete="off"
            error={errors?.email?.message}
          />
        </div>
        <div>
          <Input
            type="text"
            id="username"
            name="username"
            label="Username"
            control={control}
            placeholder="Username"
            autoComplete="off"
            error={errors?.username?.message}
          />
        </div>
        <div className="mt-4">
          <Button className="w-full" type="submit" disabled={isSubmitting} submitting={isSubmitting}>Change</Button>
        </div>
      </form>
    </div>
  )
}

ChangePassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default ChangePassword
