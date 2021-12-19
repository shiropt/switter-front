import type { ReactNode, VFC } from 'react'
// eslint-disable-next-line no-restricted-imports
import * as React from 'react'
import { Button } from '@chakra-ui/react'

type AppButtonProps = {
  onClick?: VoidFunction
  children: ReactNode
  bg?: string
  color?: string
  size?: string
  variant?: string
  mt?: number
  mr?: number
  mb?: number
  ml?: number
  m?: number
}

export const AppButton: VFC<AppButtonProps> = ({ children, ...props }) => {
  return (
    <Button _focus={{ transform: 'scale(0.98)' }} {...props} w="120px" h="45px">
      {children}
    </Button>
  )
}

AppButton.defaultProps = {
  bg: 'white',
  size: 'md',
  color: '#DD6B20',
  variant: 'outline',
}
