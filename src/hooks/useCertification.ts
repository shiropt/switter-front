import { useDisclosure, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { userState } from '@/atoms/states'
import type { PostUserForm } from '@/types'
import { API } from '@/utils/AppUtils'
import { useRequest } from '@/hooks/useRequest'

export const useCertification = () => {
  const { getRequest, postRequest } = useRequest()
  const [mode, setMode] = useState('')
  const toast = useToast()
  const setUser = useSetRecoilState(userState)
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
    const response = await getRequest(API.GetUser, 'ログイン')
    if (!response) return
    const user = response.data
    setUser({ isSignIn: true, name: user.name, id: user.id })
    return value
  }

  const signUp = async (value: PostUserForm) => {
    const response = await postRequest(API.CreateUser, '登録', value)
    if (!response) return
    const name = response.data.name
    setUser({ name, isSignIn: true })
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
