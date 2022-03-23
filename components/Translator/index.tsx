import { useState, useEffect, useRef, RefObject } from 'react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import {setCookie} from 'nookies'
import Cookies from 'js-cookie'
import {LOCALE_COOKIE, LOCALE_FLAG} from 'constant'

function useOutsideAlerter(ref: RefObject<HTMLInputElement>, onHandeleEvent: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current?.contains(event.target)) {
        onHandeleEvent()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, [ref]);
}

export default function () {
  const [open, setOpen] = useState<boolean>(false)
  const wrapperRef = useRef(null)
  const router = useRouter()
  const [currentLocale, setCurrentLocale] = useState<'id'|'en'>('id')

  useOutsideAlerter(wrapperRef, () => setOpen(false))

  useEffect(() => {
    const current: any = Cookies.get(LOCALE_COOKIE)
    if (current) setCurrentLocale(current)
  }, [LOCALE_COOKIE])

  const onSwitchTranlate = async (locale: 'en'|'id') => {
    setCookie(null, LOCALE_COOKIE, locale , {
      maxAge: 24 * 60 * 60,
      path: '/',
    })
    setCurrentLocale(locale)
    router.replace(router.asPath, router.asPath, { locale })
    setOpen(false)
  }

  return (
    <div className="relative mx-4 flex flex-col" ref={wrapperRef}>
      <div className="cursor-pointer" onClick={() => setOpen(!open)}>
        <div className={cn({'flag': true, [LOCALE_FLAG[currentLocale]]: !!currentLocale})}></div>
        <i className="material-icons">arrow_drop_down</i>
      </div>
      <ul className={cn({hidden: !open}, 'absolute right-0 bottom-[-77px] min-w-[160px] max-w-[340px] dark:bg-[#1D2226] bg-white')}>
        <li className="cursor-pointer px-[10px] py-[5px]" onClick={() => onSwitchTranlate('en')}>
          <div>
            <div className="flag flag-en" />
            English
          </div>
        </li>
        <li className="cursor-pointer px-[10px] py-[5px]" onClick={() => onSwitchTranlate('id')}>
          <div>
            <div className="flag flag-id" />
            Indonesia
          </div>
        </li>
      </ul>
    </div>
  )
}