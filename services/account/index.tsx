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