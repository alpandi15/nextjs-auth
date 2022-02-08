import type { NextApiRequest, NextApiResponse } from 'next'
import {getAllUsers} from 'backend/services/auth'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET': {
      return getAllUsers(req, res)
    }
    case 'POST': {
      return 'postData'
    }
  }
}
