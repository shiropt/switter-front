import type { VFC } from 'react'
import { FormControl, Input, FormErrorMessage } from '@chakra-ui/react'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

type Errors = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type AppInputTextProps = {
  label: string
  errors: Errors
  required: boolean
  register: UseFormRegister<FieldValues>
}

export const AppInputText: VFC<AppInputTextProps> = ({ label, register, errors, required }) => {
  return (
    <FormControl isInvalid={false}>
      <Input {...register(label, { required: `${label}は必須項目です` })} />
      <FormErrorMessage>{errors.label && <p>{errors.label.message}</p>}</FormErrorMessage>
    </FormControl>
  )
}
