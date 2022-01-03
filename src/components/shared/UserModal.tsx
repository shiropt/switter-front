import type { VFC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { FormControl, Input, FormErrorMessage, Box, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useCertification } from '@/hooks/useCertification'
import type { PostUserForm } from '@/types'
import { AppButton } from './AppButton'
import { ModalBase } from '../layout/ModalBase'
import { Certification } from '@/utils/AppUtils'
import { transJaMessage } from '@/hooks/useString'

type UserModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  mode: string
}

export const UserModal: VFC<UserModalProps> = ({ mode, ...props }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostUserForm>({ reValidateMode: 'onSubmit' })
  const { signIn, signUp } = useCertification()
  const [message, setMessage] = useState('')

  const isSignInMode = mode === Certification.SignIn

  const onSubmit = async (value: PostUserForm) => {
    const message = isSignInMode ? await signIn(value) : await signUp(value)
    setMessage(message)
    if (message) {
      return
    }
    props.onClose()
    reset()
  }

  useEffect(() => {
    return () => {
      reset()
      setMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOpen])

  return (
    <ModalBase title={isSignInMode ? 'ログイン' : '新規登録'} {...props} height={isSignInMode ? 320 : 390} width={500}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name} m="2">
          <Input
            w="md"
            maxLength={50}
            placeholder="なまえ"
            {...register('name', {
              required: 'なまえは必須項目です',
            })}
          />
          <FormErrorMessage>{errors.name && <p>{errors.name.message}</p>}</FormErrorMessage>
          {!errors.name && <Text visibility="hidden">hidden</Text>}
        </FormControl>

        {!isSignInMode && (
          <FormControl isInvalid={!!errors.email} m="2">
            <Input
              w="md"
              maxLength={50}
              placeholder="めーる"
              {...register('email', {
                required: 'めーるは必須項目です',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'めーるの形式が正しくありません',
                },
              })}
            />
            <FormErrorMessage>{errors.email && <p>{errors.email.message}</p>}</FormErrorMessage>
            {!errors.email && <Text visibility="hidden">hidden</Text>}
          </FormControl>
        )}

        <FormControl isInvalid={!!errors.password} m="2">
          <Input
            w="md"
            maxLength={50}
            placeholder="ぱすわーど"
            {...register('password', {
              required: 'ぱすわーどは必須項目です',
              minLength: { value: 8, message: 'ぱすわーどは8文字以上で設定してください' },
            })}
          />
          <FormErrorMessage>{errors.password && <p>{errors.password.message}</p>}</FormErrorMessage>
          {!errors.password && <Text visibility="hidden">hidden</Text>}
        </FormControl>
        <Text ml="4" color="red">
          {transJaMessage(message)}
        </Text>
        <Box float="right" mr="2" mb="4">
          <AppButton type="submit">{!isSignInMode ? '新規登録' : 'ログイン'}</AppButton>
        </Box>
      </form>
    </ModalBase>
  )
}
