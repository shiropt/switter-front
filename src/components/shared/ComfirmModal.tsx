/* eslint-disable @typescript-eslint/no-explicit-any */
import type { VFC } from 'react'
import { ModalBase } from '../layout/ModalBase'
import { Button, Flex } from '@chakra-ui/react'

type UserModalProps = {
  isOpen: boolean
  onClose: VoidFunction
  okCallBack: any
  message: string
}

export const ConfirmModal: VFC<UserModalProps> = ({ ...props }) => {
  return (
    <ModalBase title={`${props.message}してもよろしいですか？`} {...props} height={140} width={380}>
      <Flex justifyContent="space-around">
        <Button size="lg" onClick={props.onClose}>
          いいえ
        </Button>
        <Button size="lg" onClick={props.okCallBack}>
          はい
        </Button>
      </Flex>
    </ModalBase>
  )
}
