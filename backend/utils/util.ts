import crypto from 'crypto'
import type { NextApiResponse } from 'next'

export const MD5_SUFFIX = 'eiowafnajkdlfjsdkfj3987&jkaha8736$35#@4%!$'

export const md5 = (pwd: string) => {
  let md5 = crypto.createHash('md5')
  return md5.update(pwd).digest('hex')
}

type ResponseDataProps = {
  code?: number;
  message?: string;
  data?: any
}

export const responseClient = (
  res: NextApiResponse,
  httpCode: number = 500,
  code: number = 3,
  message: string ='Internal Server Error',
  data: any = {}
  ) => {
    let responseData: ResponseDataProps = {}
    responseData.code = code
    responseData.message = message
    responseData.data = data
    return res.status(httpCode).json(responseData)
}
