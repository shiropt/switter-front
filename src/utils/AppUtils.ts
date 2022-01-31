import { Store } from '../types'

const Store = {
  SevenEleven: 'セブンイレブン',
  Lowson: 'ローソン',
  FamilyMart: 'ファミリーマート',
} as const

export const stores: Store[] = [
  { code: 'SEVEN_ELEVEN', name: 'セブンイレブン', selected: false },
  { code: 'LAWSON', name: 'ローソン', selected: false },
  { code: 'FAMILY_MART', name: 'ファミリーマート', selected: false },
  { code: 'SEICO_MART', name: 'セイコーマート', selected: false },
  { code: 'THREE_F', name: 'スリーエフ', selected: false },
  { code: 'DAILY_YAMAZAKI', name: 'デイリーヤマザキ', selected: false },
  { code: 'MINISTOP', name: 'ミニストップ', selected: false },
  { code: 'POPLAR', name: 'ポプラ', selected: false },
]

export const storeCode = [Store.SevenEleven, Store.Lowson, Store.FamilyMart]

export const API = {
  SignIn: 'api/v1/user/signIn',
  SignUp: 'api/v1/user/signUp',
  SignOut: 'api/v1/user/signOut',
  GetPosts: 'api/v1/post',
  GetUserPosts: 'api/v1/post/user/%1',
  GetUserPost: 'api/v1/post/%1/user/%2',
  CreatePost: 'api/v1/post',
  UpdatePost: 'api/v1/post',
  DeletePost: 'api/v1/post/%1',
} as const

export const Certification = {
  SignIn: 'signIn',
  SignUp: 'signUp',
} as const
