import type { NextApiRequest, NextApiResponse } from 'next'
import {connectToDatabase} from 'backend/config/db-connection'
import {responseClient, md5, MD5_SUFFIX} from 'backend/utils/util'
import {saltHashPassword, generateToken} from 'backend/utils/security'
import {UserModel} from 'backend/models/users'
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
    responseClient(res, 200, SUCCESS, 'Success', { data: JSON.parse(JSON.stringify(posts)) })
  } catch (error) {
    console.log('Error ', error)
  }
}

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {userName, password} = req.body;
    let { db } = await connectToDatabase();
    let posts = await db
      .collection('users')
      .findOne({
        username: userName,
        password: md5(password + MD5_SUFFIX)
      })
    
    console.log('FIND ONE ', posts);
    // res.status(200).json({ data: JSON.parse(JSON.stringify(posts)) })
    responseClient(res, 200, SUCCESS, 'Success', { data: posts })
  } catch (error) {
    console.log('Error ', error)
  }
}

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {username, password, email, name} = req.body;
    const userModel = new UserModel()

    // check user exist by username
    const findUser = await userModel.find('username', username)
    if (findUser) {
      return responseClient(res, 422, DATA_EXIST, 'User Exist')
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

    const userNew = await userModel.find('_id', o_Id)
    const token = await generateToken(userNew)

    const responseData = {
      token_type: 'Bearer',
      access_token: token,
      expires_in: '30d'
    }

    return responseClient(res, 200, SUCCESS, 'Success', responseData)
  } catch (error) {
    return responseClient(res, 500, INTERNAL_ERROR, 'Internal Server Error', {})
  }
}