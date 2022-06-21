import { NextResponse, NextRequest } from 'next/server'
import {TOKEN} from 'constant'

export default async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const token = req?.cookies[TOKEN]

  let urlLogin = req.nextUrl.clone()
  urlLogin.search = `?redirect_to=${req?.nextUrl?.pathname}`
  urlLogin.pathname = `/auth/login`

  if (!token) {
    return NextResponse.redirect(urlLogin)
  }

  return res
  // const API_URL = `${process.env.API_PROTOCOL}://${process.env.API_HOST}${process.env.API_PORT ? `:${process.env.API_PORT}` : ''}${process.env.API_VERSION}`

  // const resToken = await fetch(`${API_URL}/auth/me`, {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  // })

  // const dataRes = await resToken.json()

  // if (dataRes?.success) {
  //   return res
  // } else {
  //   return NextResponse.redirect(urlLogin)
  // }
}