import { Box, Image, Input, Flex, Text } from '@chakra-ui/react'
import type { VFC } from 'react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AppButton } from './AppButton'
import type { PostRequest } from '@/types'
import { ImageUrl } from '../../utils/AppUtils'

type DropZoneProps = {
  file: File[]
  setFile: (file: File[]) => void
  isEditMode: boolean
  params: PostRequest
}

export const DropZone: VFC<DropZoneProps> = ({ file, setFile, isEditMode, params }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles)
    },
    [file]
  )
  const date = new Date().getTime()

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop })
  return (
    <Box>
      <Box mt="2" w="360px" h="230px" {...getRootProps()} border="1px  #e7e0e0 solid" borderRadius="1px">
        <input {...getInputProps()} />
        {(isEditMode && params.image) || file.length ? (
          <Image
            fit="cover"
            w="400px"
            height="227px"
            src={
              isEditMode && !file.length
                ? `${ImageUrl.post}${params.id}.${params.image}?${date}`
                : URL.createObjectURL(file[0])
            }
            alt="アップロード画像"
          />
        ) : (
          <Text textAlign="center" mt="10" color="#9b9595 ">
            画像をドラッグ
          </Text>
        )}
      </Box>
      <Flex mt="6">
        <Input readOnly value={file.length ? file[0].name : ''} mr="2" />
        <AppButton onClick={open}>選択</AppButton>
      </Flex>
    </Box>
  )
}
