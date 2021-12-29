const Store = {
  SevenEleven: 'セブンイレブン',
  Lowson: 'ローソン',
  FamilyMart: 'ファミリーマート',
} as const

export const storeCode = [Store.SevenEleven, Store.Lowson, Store.FamilyMart]

export const API = {
  GetUser: 'http://localhost:3030/api/v1/user/1',
  CreateUser: 'http://localhost:3030/api/v1/user',
  CreatePost: 'http://localhost:3030/api/v1/post',
} as const

export const Certification = {
  SignIn: 'signIn',
  SignUp: 'signUp',
} as const
