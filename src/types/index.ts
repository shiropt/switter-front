export type PostRequest = {
  userId: number
  title: string
  contents?: string
  star: number
  storeCode: string
  price?: number
  image?: FormData
}
export class PostResponse {
  id = 0
  userId = 0
  title = ''
  contents = ''
  star = 0
  storeCode = ''
  price: number | undefined = undefined
  image = ''
  createdAt = ''
  updatedAt = ''
}

export type PostUserForm = {
  name?: string
  email: string
  password: string
}
