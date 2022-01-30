import type { VFC } from 'react'
import { Flex, Spacer } from '@chakra-ui/react'
import type { PostResponse } from '@/types'
import { IconContext } from 'react-icons'
import { BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'

type CardProps = {
  post: PostResponse
}

export const ButtonIcons = () => {
  return (
    <Flex w={14} justifyContent="space-between" bg="green.100">
      <IconContext.Provider value={{ size: '24px' }}>
        <BsTrash />
        <FiEdit />
      </IconContext.Provider>
    </Flex>
  )
}
