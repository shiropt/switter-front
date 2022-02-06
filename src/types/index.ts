export class PostRequest {
  id?: number = 0
  userId = 0
  title = ''
  contents?: string = ''
  star = 0
  storeCode = ''
  price?: number = undefined
  image?: string = ''
  imageData? = ''
}
export class PostResponse {
  id!: number
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
