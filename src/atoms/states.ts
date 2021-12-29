import { atom } from 'recoil'

type UserInfo = {
  id?: number
  name: string
  isSignIn: boolean
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    id: undefined,
    name: '',
    isSignIn: false,
  },
})

export const loadState = atom<boolean>({
  key: 'isLoading',
  default: false,
})
