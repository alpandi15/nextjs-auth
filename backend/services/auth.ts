import type { NextApiRequest, NextApiResponse } from 'next'
import {connectToDatabase} from 'backend/config/db-connection'
import {responseClient, md5, MD5_SUFFIX} from 'backend/utils/util'

export const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection('users')
      .find({})
      .sort({ published: -1 })
      .toArray();

    // res.status(200).json({ data: JSON.parse(JSON.stringify(posts)) })
    responseClient(res, 200, 0, 'Success', { data: JSON.parse(JSON.stringify(posts)) })
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
    responseClient(res, 200, 0, 'Success', { data: posts })
  } catch (error) {
    console.log('Error ', error)
  }
}

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let {userName, password} = req.body;
    let { db } = await connectToDatabase();
    let posts = await db
      .collection('users')
      .insertOne({
        username: userName,
        password: md5(password + MD5_SUFFIX),
        type: 'admin'
      })

    // res.status(200).json({ data: JSON.parse(JSON.stringify(posts)) })
    responseClient(res, 200, 0, 'Success', { data: posts })
  } catch (error) {
    console.log('Error ', error)
  }
}