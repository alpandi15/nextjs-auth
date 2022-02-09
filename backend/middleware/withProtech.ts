import { UNAUTHORIZED } from 'backend/config/response-code'
import UserModel from 'backend/models/userModel'
import { extractTokenProfile } from 'backend/utils/security'
import { responseClient } from 'backend/utils/util'
import { ObjectId } from 'mongodb'

export function getToken(headers: any) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    }
    return null
  }
  return null
}

const withProtect = (handler: any) => {
  return async (req: any, res: any) => {
    try {
      const token = await getToken(req.headers)
  
      if (!token) {
        return responseClient(res, 401, false, UNAUTHORIZED, 'Unauthorized', {})
      }
  
      const decoded: any = await extractTokenProfile(req)
      if (!decoded) {
        return responseClient(res, 401, false, UNAUTHORIZED, 'Token does not match', {})
      }
  
      console.log('DECOVE ', decoded)
  
      const userModel = new UserModel()
  
      const o_Id = new ObjectId(decoded?._id)
      const currentUser = await userModel.find({_id: o_Id})
  
      if (!currentUser) {
        return responseClient(res, 401, false, UNAUTHORIZED, 'The user belonging to this token no longer exist', {})
      }
  
      req.user = currentUser
  
      return handler(req, res)      
    } catch (error) {
      return responseClient(res, 401, false, UNAUTHORIZED, 'Unauthorized', {})
    }
  }
}

export default withProtect