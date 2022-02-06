import type { VFC } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import type { PostRequest } from '@/types'
import {
  Input,
  FormErrorMessage,
  Textarea,
  Flex,
  Box,
  Text,
  NumberInputField,
  NumberInput,
  Select,
  FormControl,
} from '@chakra-ui/react'
import ReactStars from 'react-stars'
import { AppButton } from '@/components/shared/AppButton'
import { ModalBase } from '@/components/layout/ModalBase'
import { useForm } from 'react-hook-form'
import { API, stores } from '@/utils/AppUtils'
import { DropZone } from '../shared/DropZone'
import { useRecoilValue } from 'recoil'
import { userState } from '@/atoms/states'
import { useRequest } from '@/hooks/useRequest'
import { useImageUpload } from '../../hooks/useUpload'

type PostModalProps = {
  params: PostRequest
  isOpen: boolean
  isEditMode: boolean
  onClose: VoidFunction
  fetchPosts: VoidFunction
}

export const PostModal: VFC<PostModalProps> = ({ params, ...props }) => {
  const [star, setStar] = useState(params.star)
  const userInfo = useRecoilValue(userState)
  const { postRequest, putRequest } = useRequest()
  const { file, setFile, imageData, createFileExtension, upload } = useImageUpload()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostRequest>({ defaultValues: { ...params } })

  useEffect(() => {
    setStar(params.star)
    return () => {
      reset()
      setFile([])
      setStar(0)
    }
  }, [props.isOpen])

  const postSweets = async (data: PostRequest) => {
    data.star = star
    data.price = Number(data.price)
    if (file.length) {
      data.image = createFileExtension(imageData)
    } else {
      data.image = params.image
    }
    if (!props.isEditMode) {
      const request: PostRequest = { ...data, imageData, userId: userInfo.id }
      const response = await postRequest(API.CreatePost, '投稿', request)
      if (!response) return
    } else {
      const request: PostRequest = { ...data, imageData, userId: userInfo.id, id: params.id }
      const response = await putRequest(API.UpdatePost, '更新', request)
      if (!response) return
    }

    reset()
    setFile([])
    setStar(0)
    props.onClose()
    props.fetchPosts()
  }

  return (
    <ModalBase title="スイーツ POST ! " {...props} height={460} width={750}>
      <form onSubmit={handleSubmit(postSweets)}>
        <Flex>
          <Box>
            <FormControl isInvalid={!!errors.title}>
              <Input
                maxLength={30}
                w="xs"
                mt="2"
                placeholder="たいとる"
                {...register('title', {
                  required: 'たいとるは必須項目です',
                })}
              />
              <FormErrorMessage>{errors.title && <p>{errors.title.message}</p>}</FormErrorMessage>
              {!errors.title && <Text visibility="hidden">hidden</Text>}
            </FormControl>
            <FormControl isInvalid={!!errors.storeCode}>
              <Textarea
                resize="none"
                w="xs"
                placeholder="こめんと"
                maxLength={140}
                {...register('contents', { required: 'こめんとは必須です' })}
              />
              <FormErrorMessage>{errors.contents && <p>{errors.contents.message}</p>}</FormErrorMessage>
              {!errors.contents && <Text visibility="hidden">hidden</Text>}
            </FormControl>
            <NumberInput mt="4">
              <NumberInputField maxLength={10} w="xs" placeholder="ねだん" {...register('price')} />
            </NumberInput>
            <FormControl isInvalid={!!errors.storeCode}>
              <Select
                w="xs"
                mt="7"
                {...register('storeCode', { required: 'おみせは必須項目です' })}
                placeholder="おみせ"
              >
                {stores.map((store, index) => (
                  <option value={store.code} key={index}>
                    {store.name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors.storeCode && <p>{errors.storeCode.message}</p>}</FormErrorMessage>
              {!errors.storeCode && <Text visibility="hidden">hidden</Text>}
            </FormControl>
            <Flex w="xs" mt="2">
              <Text m="2" mr="6">
                まんぞく度
              </Text>
              <ReactStars half={false} count={5} value={star} onChange={setStar} size={25} color2={'#ffd700'} />
            </Flex>
          </Box>
          <Box ml="4">
            <DropZone params={params} isEditMode={props.isEditMode} file={file} setFile={upload} />
          </Box>
        </Flex>
        <Box float="right" mt={-10}>
          <AppButton type="submit">OK</AppButton>
        </Box>
      </form>
    </ModalBase>
  )
}
