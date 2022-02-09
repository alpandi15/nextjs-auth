import {connectToDatabase} from 'backend/config/db-connection'
import { ObjectId } from 'mongodb'

export class UserModel {
  username: string|null
  password: string|null
  email: string|null
  name: string|null
  image: string|null
  hash: string|null
  salt: string|null
  type: 'admin'|'user'
  createdAt: string|null
  updatedAt: string|null

  constructor () {
    this.username = null
    this.password = null
    this.email = null
    this.name = null
    this.image = null
    this.hash = null
    this.salt = null
    this.type = 'user'
    this.createdAt = null
    this.updatedAt = null
  }

  async create() {
    try {
      let { db } = await connectToDatabase();
      const data = await db
        .collection('users')
        .insertOne({
          username: this.username,
          password: this.password,
          email: this.email,
          name: this.name,
          image: this.image,
          hash: this.hash,
          salt: this.salt,
          type: this.type,
          createdAt: this.createdAt,
          updatedAt: this.updatedAt,
        })
      return data
    } catch (error: any) {
      throw new Error(error?.message)
    }
  }

  async find(key: '_id'|'username'|'email'|'type', value: string|number|ObjectId) {
    try {
      let { db } = await connectToDatabase();
      return db.collection('users').findOne({[key]: value})      
    } catch (error: any) {
      throw new Error(error?.message)      
    }
  }
}
