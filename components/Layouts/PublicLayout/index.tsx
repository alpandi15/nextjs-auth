import cn from 'classnames'
import Header from'./Header'
import Footer from './Footer'
import { FC } from 'react'
import styles from './layout.module.css'

const Layout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main className={cn(styles?.main, 'bg-[#F3F2EF] dark:bg-black dark:text-white')}>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
