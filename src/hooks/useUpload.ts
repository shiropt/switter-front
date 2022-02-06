import { useState } from 'react'

export const useImageUpload = () => {
  const [file, setFile] = useState<File[]>([])
  const [imageData, setImageData] = useState('')

  const createFileExtension = (image: string) => {
    return image.toString().slice(image.indexOf('/') + 1, image.indexOf(';'))
  }

  const upload = (data: File[]) => {
    setFile(data)
    const fileReader = new FileReader()
    fileReader.readAsDataURL(data[0])
    fileReader.onload = () => {
      const base64 = fileReader.result as string
      resizeUpload(base64)
    }
  }

  const resizeUpload = (base64: string) => {
    const imgType = base64.substring(5, base64.indexOf(';'))
    const img = new Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      const width = img.width * 0.25
      const height = img.height * 0.25
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      const reSizeData = canvas.toDataURL(imgType)
      setImageData(reSizeData)
    }
    img.src = base64
  }
  return { file, setFile, imageData, createFileExtension, upload }
}
