import type { NextApiRequest, NextApiResponse } from 'next'
import {userInfo} from 'backend/services/auth'
import {responseClient} from 'backend/utils/util'
import {INTERNAL_ERROR} from 'backend/config/response-code'
import withProtech from 'backend/middleware/withProtech'

type Data = {
  name: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if (req.method !== 'GET') {
    return responseClient(res, 500, false, INTERNAL_ERROR, 'Internal Server Error', {})
  }
  switch (req.method) {
    case 'GET': {
      return userInfo(req, res)
    }
  }
}

export default withProtech(handler)