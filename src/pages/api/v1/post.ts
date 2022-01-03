/* eslint-disable import/no-anonymous-default-export */
/* esl:number-disable import/no-anonymous-default-export */
/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next'

import type { PostResponse } from '@/types'

const data = [
  {
    userId: 1,
    title: 'title1',
    contents: 'contents1',
    star: 1,
    storeCode: 'storeCode1',
    price: 100,
    image: 'jpeg',
    createdAt: '2020/12/12',
    updatedAt: '2020/12/12',
  },
  {
    id: 2,
    userId: 2,
    title: 'title2',
    contents: 'contents2',
    star: 2,
    storeCode: 'storeCode2',
    price: 200,
    image: 'jpeg',
    createdAt: '2020/12/12',
    updatedAt: '2020/12/12',
  },
  {
    id: 3,
    userId: 3,
    title: 'title3',
    contents: 'contents3',
    star: 3,
    storeCode: 'storeCode3',
    price: 300,
    image: 'jpeg',
    createdAt: '2020/12/12',
    updatedAt: '2020/12/12',
  },
]

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json(data)
}
