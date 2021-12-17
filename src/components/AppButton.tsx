import type { ReactNode, VFC } from 'react'
// eslint-disable-next-line no-restricted-imports
import * as React from 'react'

type AppButtonProps = {
  onClick: VoidFunction
  children?: ReactNode
}
const style = {
  borderRadius: '3px',
  backgroundColor: '#ffffff',
  padding: '8px 16px',
  minWidth: '100px',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#442700',
  border: '1px solid gray',
  cursor: 'pointer',
}

export const AppButton: VFC<AppButtonProps> = ({ children, onClick }) => {
  return (
    <button style={style} onClick={onClick}>
      {children}
    </button>
  )
}
