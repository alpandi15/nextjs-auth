import type { NextApiRequest, NextApiResponse } from 'next'
import {connectToDatabase} from 'backend/config/db-connection'
import {responseClient} from 'backend/utils/util'
import {saltHashPassword, generateToken, isValidPassword} from 'backend/utils/security'
import UserModel from 'backend/models/userModel'
import moment from 'moment'
import { ObjectId } from 'mongodb'
import {SUCCESS, DATA_NOTFOUND, DATA_EXIST, INTERNAL_ERROR} from 'backend/config/response-code'

export const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection('users')
      .find({})
      // .sort({ published: -1 })
      .toArray();

    // res.status(200).json({ data: JSON.parse(JSON.stringify(posts)) })
    responseClient(res, 200, true, SUCCESS, 'Success', { data: JSON.parse(JSON.stringify(posts)) })
  } catch (error) {
    console.log('Error ', error)
  }
}

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {account, password} = req.body;
    let { db } = await connectToDatabase();
    let find = await db
      .collection('users')
      .findOne({
        $or: [{username: account}, {email: account}]
      })
    
    if (!find) {
      return responseClient(res, 409, false, DATA_NOTFOUND, 'Data Not Found', find)
    }

    const passwordValid = await isValidPassword(password, find?.hash, find?.salt)
    if (!passwordValid) {
      return responseClient(res, 422, false, DATA_NOTFOUND, 'Password does not match')
    }

    const responseData = {
      token_type: 'Bearer',
      token: await generateToken(find),
      expires_in: '30d'
    }
    return responseClient(res, 200, true, SUCCESS, 'Success', responseData)
  } catch (error) {
    console.log('Error ', error)
  }
}

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {username, password, email, name} = req.body;
    const userModel = new UserModel()

    // check user exist by username
    const findUser = await userModel.find({username})
    if (findUser) {
      return responseClient(res, 422, false, DATA_EXIST, 'User Exist')
    }
    const {salt, hash} = saltHashPassword(password)
    userModel.hash = hash
    userModel.salt = salt
    userModel.type = 'admin'
    userModel.username = username
    userModel.email = email
    userModel.name = name
    userModel.createdAt = moment().format('YYYY-MM-DD HH:MM:ss').toString();

    const dataSave = await userModel.create()
    const o_Id = new ObjectId(dataSave?.insertedId)

    const userNew = await userModel.find({_id: o_Id})
    const token = await generateToken(userNew)

    const responseData = {
      token_type: 'Bearer',
      token: token,
      expires_in: '30d'
    }

    return responseClient(res, 200, true, SUCCESS, 'Success', responseData)
  } catch (error) {
    return responseClient(res, 500, false, INTERNAL_ERROR, 'Internal Server Error', {})
  }
}

interface SessionUserRequestProps extends NextApiRequest {
  user?: any
}
// withProtect session user available on req.user = {data user}
export const userInfo = async (req: SessionUserRequestProps, res: NextApiResponse) => {
  try {    
    if (!req.user) {
      return responseClient(res, 409, false, DATA_NOTFOUND, 'User Not Found', {})
    }
    return responseClient(res, 200, true, SUCCESS, 'Success', req.user)
  } catch (error) {
    return responseClient(res, 500, false, INTERNAL_ERROR, 'Internal Server Error', {})
  }
}

// withProtect session user available on req.user = {data user}
export const changePassword = async (req: SessionUserRequestProps, res: NextApiResponse) => {
  try {
    let {oldPassword, password} = req.body;

    if (!req.user) {
      return responseClient(res, 409, false, DATA_NOTFOUND, 'User Not Found', {})
    }

    const passwordValid = await isValidPassword(oldPassword, req?.user?.hash, req?.user?.salt)
    if (!passwordValid) {
      return responseClient(res, 422, false, DATA_NOTFOUND, 'Password does not match')
    }

    const {salt, hash} = saltHashPassword(password)
    const userModel = new UserModel()
    await userModel.update(req?.user?._id, {hash, salt})
    return responseClient(res, 200, true, SUCCESS, 'Success', req.user)
  } catch (error) {
    return responseClient(res, 500, false, INTERNAL_ERROR, 'Internal Server Error', {})
  }
}