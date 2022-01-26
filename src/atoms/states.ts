import type { PostResponse } from '@/types'
import { atom } from 'recoil'

type UserInfo = {
  id: number
  name: string
  isSignIn: boolean
  AccessToken?: string
}

export const userState = atom<UserInfo>({
  key: 'userInfo',
  default: {
    id: 0,
    name: '',
    isSignIn: false,
    AccessToken: '',
  },
})

export const loadState = atom<boolean>({
  key: 'isLoading',
  default: false,
})
