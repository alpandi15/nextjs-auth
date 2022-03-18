import { NextResponse, NextFetchEvent, NextRequest } from 'next/server'
import {authPage} from 'components/Middleware'
import {TOKEN} from 'constant'
// import {} from 

export default async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const res = NextResponse.next()
  const token = req?.cookies[TOKEN]
  let urlLogin = req.nextUrl.clone()
  urlLogin.searchParams.append('redirect_to', req?.nextUrl?.pathname)
  urlLogin.pathname = `/auth/login`

  console.log('Lewati Middleware Dulu Bro ')

  if (!token) {
    return NextResponse.redirect(urlLogin)
  }

  const resToken = await fetch('http://dev.aliesports.id:3000/auth/me', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  const dataRes = await resToken.json()
  if (dataRes?.success) {
    return res
  } else {
    return NextResponse.redirect(urlLogin)
  }
  // const { session } = await authPage(req?.cookies);
  console.log('TOKEN ', await resToken.json());
  // return { props: {session} }
}