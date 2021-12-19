export type PostResponse = {
  id: number
  userId: number
  title: string
  contents: string
  star: number
  storeCode: string
  price: number
  endOfSale: boolean
  fileExtension: string
  createdAt: string
  updatedAt: string
}

export type PostUserForm = {
  name?: string
  email: string
  password: string
}
