import type { VFC } from 'react'
import { useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useCertification } from '@/hooks/useCertification'
import type { PostUserForm } from '@/types'

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

  const isSignInMode = mode === 'signIn'

  const onSubmit = (value: PostUserForm) => {
    isSignInMode ? signIn(value) : signUp(value)
    props.onClose()
    reset()
  }

  useEffect(() => {
    return () => {
      reset()
    }
  }, [props.isOpen])

  return (
    <Modal {...props} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isSignInMode ? 'ログイン' : '新規登録'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isSignInMode && (
              <FormControl isInvalid={!!errors.name} m="2">
                <Input
                  w="md"
                  placeholder="なまえ"
                  {...register('name', {
                    required: 'なまえは必須項目です',
                  })}
                />
                <FormErrorMessage>{errors.name && <p>{errors.name.message}</p>}</FormErrorMessage>
                {!errors.name && <Text visibility="hidden">hidden</Text>}
              </FormControl>
            )}

            <FormControl isInvalid={!!errors.email} m="2">
              <Input
                w="md"
                placeholder="めーる"
                {...register('email', {
                  required: 'めーるは必須項目です',
                })}
              />
              <FormErrorMessage>{errors.email && <p>{errors.email.message}</p>}</FormErrorMessage>
              {!errors.email && <Text visibility="hidden">hidden</Text>}
            </FormControl>
            <FormControl isInvalid={!!errors.password} m="2">
              <Input
                w="md"
                placeholder="ぱすわーど"
                {...register('password', {
                  required: 'ぱすわーどは必須項目です',
                })}
              />
              <FormErrorMessage>{errors.password && <p>{errors.password.message}</p>}</FormErrorMessage>
              {!errors.password && <Text visibility="hidden">hidden</Text>}
            </FormControl>
            <Button
              mr="2"
              mb="4"
              float="right"
              _focus={{ transform: 'scale(0.98)' }}
              bg={'white'}
              size={'md'}
              color={'#DD6B20'}
              variant={'outline'}
              type="submit"
            >
              {!isSignInMode ? '新規登録' : 'ログイン'}
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
