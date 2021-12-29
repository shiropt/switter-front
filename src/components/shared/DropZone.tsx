import { Box, Image, Input, Flex, Text } from '@chakra-ui/react'
import type { VFC } from 'react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { AppButton } from './AppButton'

type DropZoneProps = {
  file: File[]
  setFile: (file: File[]) => void
}

export const DropZone: VFC<DropZoneProps> = ({ file, setFile }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles)
    },
    [file]
  )

  const { getRootProps, getInputProps, open } = useDropzone({ onDrop })
  return (
    <Box>
      <Box mt="2" w="360px" h="230px" {...getRootProps()} border="1px  #e7e0e0 solid" borderRadius="1px">
        <input {...getInputProps()} />
        {file.length ? (
          <Image fit="contain" w="360px" height="200px" src={URL.createObjectURL(file[0])} alt="アップロード画像" />
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
