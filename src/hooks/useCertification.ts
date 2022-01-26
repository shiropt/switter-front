import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '@/atoms/states'
import type { PostUserForm } from '@/types'
import { API, Certification } from '@/utils/AppUtils'
import { useRequest } from '@/hooks/useRequest'

export const useCertification = () => {
  const { postRequest } = useRequest()
  const [mode, setMode] = useState('')
  const [userInfo, setUser] = useRecoilState(userState)
  const { isOpen: isUserModalOpen, onOpen: onUserModalOpen, onClose: onUserModalClose } = useDisclosure()

  const showSignInModal = () => {
    setMode(Certification.SignIn)
    onUserModalOpen()
  }

  const showSignUpModal = () => {
    setMode(Certification.SignUp)
    onUserModalOpen()
  }

  const signIn = async (value: PostUserForm) => {
    const response = await postRequest(API.SignIn, 'ログイン', value)
    if (!response) return
    if (response.data.statusCode === 400) {
      return response.data.message
    }
    const { user, AccessToken } = response.data
    setUser({
      isSignIn: true,
      name: user.Username,
      id: user.UserAttributes[0].value,
      AccessToken,
    })
  }

  const signUp = async (value: PostUserForm) => {
    const response = await postRequest(API.SignUp, '登録', value)
    if (!response) return
    if (response.data.statusCode === 400) {
      return response.data.message
    }
    const { user, AccessToken } = response.data
    setUser({
      isSignIn: true,
      name: user.Username,
      id: user.UserAttributes[0].Value,
      AccessToken,
    })
  }

  const signOut = async () => {
    const name = userInfo.name
    const response = await postRequest(API.SignOut, 'ログアウト', { name })
    if (!response) return
    setUser({ name: '', isSignIn: false, AccessToken: '', id: 0 })
  }
  return { isUserModalOpen, onUserModalClose, mode, showSignInModal, showSignUpModal, signIn, signUp, signOut }
}
