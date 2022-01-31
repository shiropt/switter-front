import type { VFC } from 'react'
import { useState } from 'react'
import { useEffect, memo } from 'react'
import type { PostRequest, PostResponse } from '@/types'
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
import { API, storeCode, stores } from '@/utils/AppUtils'
import { DropZone } from '../shared/DropZone'
import { useRecoilValue } from 'recoil'
import { userState } from '@/atoms/states'
import { useRequest } from '@/hooks/useRequest'

type PostModalProps = {
  params: PostResponse
  isOpen: boolean
  onClose: VoidFunction
  fetchPosts: VoidFunction
}

export const PostModal: VFC<PostModalProps> = ({ params, ...props }) => {
  const [file, setFile] = useState<File[]>([])
  const [star, setStar] = useState(params.star)
  const userInfo = useRecoilValue(userState)
  const { postRequest, fetchData } = useRequest()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostRequest>({ defaultValues: {} })

  useEffect(() => {
    return () => {
      reset()
      setFile([])
      setStar(0)
    }
  }, [props.isOpen])

  const postSweets = async (data: Omit<PostRequest, 'image'>) => {
    const image = new FormData()
    image.append('file', file[0])
    data.star = star
    data.price = Number(data.price)
    const request: PostRequest = { ...data, image, userId: userInfo.id }
    const response = await postRequest(API.CreatePost, '投稿', request)
    if (!response) return
    reset()
    setFile([])
    setStar(0)
    props.onClose()
    props.fetchPosts()
    const posts = await fetchData(API.GetPosts)
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
            <Textarea resize="none" w="xs" placeholder="こめんと" maxLength={140} {...register('contents')} />
            <NumberInput mt="4">
              <NumberInputField maxLength={10} w="xs" placeholder="ねだん" {...register('price')} />
            </NumberInput>
            <FormControl isInvalid={!!errors.storeCode}>
              <Select
                w="xs"
                mt="4"
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
            <DropZone file={file} setFile={setFile} />
          </Box>
        </Flex>
        <Box float="right" mt="6">
          <AppButton type="submit">OK</AppButton>
        </Box>
      </form>
    </ModalBase>
  )
}
