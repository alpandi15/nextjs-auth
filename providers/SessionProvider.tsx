import { ObjectId } from 'mongodb'
import { createContext, useContext } from 'react'

// type ImageUrlType = {
//   url?: string|undefined,
//   raw?: string|undefined
// }

export interface UserDataContext {
  _id?: ObjectId|null
  username?: string|null
  password?: string|null
  email?: string|null
  name?: string|null
  image?: string|null
  hash?: string|null
  salt?: string|null
  type?: 'admin'|'user'
  createdAt?: string|null
  updatedAt?: string|null
}

export type SessionContextType = {
  session: {
    user?: UserDataContext|null,
    token?: string|null
  }
}

const initialData = {
  session: {
    user: null,
    token: null
  }
}
const SessionContext = createContext<SessionContextType>(initialData)

export const useSessionContext = () => useContext(SessionContext)

export default SessionContext