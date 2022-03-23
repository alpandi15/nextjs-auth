import {memo} from 'react'
import Link from 'next/link'
import {useSessionContext} from 'providers'
import Theme from 'components/Theme'
import Translator from 'components/Translator'
import translate from 'components/Translator/I18n/translate'

const MemoTranslator = memo(Translator)

const Header = () => {
  const {session} = useSessionContext()

  return (
    <header className="w-full h-[50px] fixed flex items-center justify-between dark:bg-[#1D2226] bg-white px-[20px]">
      <div>
        <Link href="/">
          <a>Next Auth</a>
        </Link>
      </div>
      <div>{translate('layout.header')}</div>

      <div className="flex items-center">
        <MemoTranslator />
        <Theme />
        <div>
          {
            session?.user ? (
              <>
                <Link href="/account">
                  <a>{session.user.lastName}</a>
                </Link>
              </>
            ) : (
              <Link href="/auth/login">
                <a>Login</a>
              </Link>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
