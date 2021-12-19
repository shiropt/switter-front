import { atom } from 'recoil'

type UserInfo = {
  name: string
  isSignIn: boolean
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    name: '',
    isSignIn: false,
  },
})

export const loadState = atom<boolean>({
  key: 'isLoading',
  default: true,
})
