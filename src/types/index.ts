export type PostRequest = {
  userName: string
  title: string
  contents?: string
  star: number
  storeCode: string
  price?: number
  image?: FormData
}
export class PostResponse {
  userName = ''
  title = ''
  contents = ''
  star = 0
  storeCode = ''
  price: number | undefined = undefined
  image = ''
}

export type PostUserForm = {
  name?: string
  email: string
  password: string
}
