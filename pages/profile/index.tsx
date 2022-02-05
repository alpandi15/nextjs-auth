import type { GetServerSideProps } from 'next'
import Image from 'next/image'
import {authPage} from 'components/Middleware'
import {logout} from 'services/auth'
import {ProtectLayout as Layout} from 'components/Layouts'
import { ReactElement } from 'react'
import type {Page} from 'types/page'
import styles from './Profile.module.css'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { session } = await authPage(ctx);
  return {
    props: { session }
  }
}

const sanityIoImageLoader = ({ src, width, quality }) => {
  return `https://cdn.sanity.io/${src}?w=${width}&q=${quality || 75}`
}
const placeholderImage = 
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcsnt3PQAHAAKrcPYcMAAAAABJRU5ErkJggg==';

const Home: Page = ({session}: any) => {
  if (!session) return <div></div>

  if (session) {
    return (
      <div className={styles.container}>
        <h1>Profile Page</h1>
        <div className={styles.image}>
          <Image
            // loader={sanityIoImageLoader}
            src={session?.user?.image?.url}
            alt="Picture of the author"
            width={200}
            height={200}
            layout="fill"
            quality={100}
            objectFit="cover"
            loading="lazy"
            unoptimized={false}
            placeholder="blur"
            // className="profile-image"
            // onLoadingComplete={(imageDimension) => console.log(imageDimension)}
            blurDataURL={placeholderImage}
          />
        </div>
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
