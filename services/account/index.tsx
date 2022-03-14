import { request } from '../utils/request'

type RequestChangePasswordProps = {
  new_password?: string,
  oldPassword?: string,
  password?: string
}
export const apiChangePassword = async (data: RequestChangePasswordProps) => {
  return request({
    url: '/auth/change-password',
    auth: true,
    data,
    method: 'post'
  })
}


type RequestChangeProfileProps = {
  image?: string|null
  imageRaw?: string|null
  name?: string|null
  username?: string|null
  email?: string|null
}
export const apiUpdateProfile = async (data: RequestChangeProfileProps) => {
  return request({
    url: '/profile/update',
    auth: true,
    data,
    method: 'put'
  })
}
