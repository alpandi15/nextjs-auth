import type { NextApiRequest, NextApiResponse } from 'next'
import {register} from 'backend/services/auth'
import {responseClient} from 'backend/utils/util'
import {INTERNAL_ERROR} from 'backend/config/response-code'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return responseClient(res, 500, false, INTERNAL_ERROR, 'Internal Server Error', {})
  }
  switch (req.method) {
    case 'POST': {
      return register(req, res)
    }
  }
}
