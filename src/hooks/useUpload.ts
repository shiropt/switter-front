/* eslint-disable no-restricted-imports */
import React from 'react'
import AWS from 'aws-sdk'

const S3_BUCKET = 'bucket-name'
const REGION = 'ap-northeast-1'

AWS.config.update({
  accessKeyId: 'key123',
  secretAccessKey: 'key123',
})
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
})
interface IState {
  progress: number
}
// interface IProps {}

export const useUpload = () => {
  return {}
}
