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
  userId = 0
  title = ''
  contents = ''
  star = 0
  storeCode = ''
  price?: number = undefined
  image = ''
  updatedAt = ''
}

export type PostUserForm = {
  name?: string
  email: string
  password: string
}

export type Store = {
  code: string
  name: string
  selected: boolean
}
