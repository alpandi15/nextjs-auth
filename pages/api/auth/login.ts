import type { NextApiRequest, NextApiResponse } from 'next'
import {login} from 'backend/services/auth'
import {responseClient} from 'backend/utils/util'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return responseClient(res, 500, 500, 'Internal Server Error', {})
  }
  switch (req.method) {
    case 'POST': {
      return login(req, res)
    }
  }
}
