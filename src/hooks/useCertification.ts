import { useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { loadState, userState } from '@/atoms/states'
import type { PostUserForm } from '@/types'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useCertification = () => {
  const [mode, setMode] = useState('')
  const toast = useToast()
  const setUser = useSetRecoilState(userState)
  const setLoading = useSetRecoilState(loadState)
  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure()

  const showSignInModal = () => {
    setMode('signIn')
    onUserModalOpen()
  }

  const showSignUpModal = () => {
    setMode('signUp')
    onUserModalOpen()
  }

  const signIn = async (value: PostUserForm) => {
    setLoading(true)
    try {
      await dummyLogin()
      setUser({ name: 'test user', isSignIn: true })
      toast({
        title: `ログインしました`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: `ログインに失敗しました`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setLoading(false)
    return value
  }

  const dummyLogin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolve')
      }, 1000)
    })
  }

  const signUp = async (value: PostUserForm) => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:3030/api/v1/user', value)
      const name = response.data.name
      setUser({ name, isSignIn: true })
      toast({
        title: `${name}さんを登録しました`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      toast({
        title: `登録エラーが発生しました`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setLoading(false)
  }
  const signOut = () => {
    setUser({ name: '', isSignIn: false })
    toast({
      title: `ログアウトしました`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }
  return { isUserModalOpen, onUserModalClose, mode, showSignInModal, showSignUpModal, signIn, signUp, signOut }
}
