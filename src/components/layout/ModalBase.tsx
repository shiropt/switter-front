import type { ReactNode, VFC } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from '@chakra-ui/react'

type PostModalProps = {
  title: string
  height: number
  width: number
  children: ReactNode
  isOpen: boolean
  onClose: VoidFunction
}

export const ModalBase: VFC<PostModalProps> = (props) => {
  return (
    <Modal {...props} size="40px">
      <ModalOverlay />
      <ModalContent minH={props.height} w={props.width}>
        <ModalHeader color="#DD6B20">{props.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{props.children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}
