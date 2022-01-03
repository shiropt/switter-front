import { atom } from 'recoil'

type UserInfo = {
  id?: string
  name: string
  isSignIn: boolean
  AccessToken?: string
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    id: undefined,
    name: '',
    isSignIn: false,
    AccessToken: '',
  },
})

export const loadState = atom<boolean>({
  key: 'isLoading',
  default: false,
})
