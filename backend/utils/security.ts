import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import {MD5_SUFFIX} from 'backend/utils/util'

const getRandomString = (length: number) => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length)

export function sha512 (password: string, salt: string) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  return hash.digest('hex')
}

export function saltHashPassword(password: string) {
  const salt = getRandomString(65)
  const hash = sha512(password, salt)

  return {
    salt, hash
  }
}

export function isValidPassword(password: string, hash: string, salt: string) {
  const pwdHash = sha512(password, salt)
  return pwdHash === hash
}

export async function generateToken(obj: any, temp: boolean = false, time: number = 10) {
  return jwt.sign(obj, MD5_SUFFIX, {
    expiresIn: temp ? time : '30d' // in seconds
  })
}
