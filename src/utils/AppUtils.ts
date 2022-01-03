const Store = {
  SevenEleven: 'セブンイレブン',
  Lowson: 'ローソン',
  FamilyMart: 'ファミリーマート',
} as const

export const storeCode = [Store.SevenEleven, Store.Lowson, Store.FamilyMart]

export const API = {
  SignIn: 'api/v1/user/signIn',
  SignUp: 'api/v1/user/signUp',
  SignOut: 'api/v1/user/signOut',
  GetPosts: 'api/v1/post/',
  GetUserPosts: 'api/v1/post/user/%1',
  GetUserPost: 'api/v1/post/%1/user/%2',
  CreatePost: 'api/v1/post',
} as const

export const Certification = {
  SignIn: 'signIn',
  SignUp: 'signUp',
} as const
