import axios from '@/axios'
import { useToast } from '@chakra-ui/react'
import type { AlertStatus } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { loadState } from '@/atoms/states'

export const useRequest = () => {
  const setLoading = useSetRecoilState(loadState)
  const toast = useToast()
  const showToast = (title: string, status: AlertStatus) => {
    toast({
      title: `${title}しました`,
      status,
      duration: 3000,
      isClosable: true,
    })
  }
  const replaceByUrl = (path: string, ...params: string[]) => {
    let url = path
    params.forEach((_, i) => {
      const regexp = new RegExp('%' + (i + 1), 'g')
      url = url.replace(regexp, params[i])
    })
    return url
  }

  const getRequest = async (path: string, message: string) => {
    setLoading(true)
    try {
      const response = await axios.get(path)
      if (response.data.statusCode !== 400) {
        showToast(message, 'success')
      }
      return response
    } catch {
      showToast(`${message}に失敗`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const postRequest = async <T>(path: string, message: string, params: T) => {
    setLoading(true)
    try {
      const response = await axios.post(path, params)
      if (response.data.statusCode !== 400) {
        showToast(message, 'success')
      }
      return response
    } catch {
      showToast(`${message}に失敗`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async (path: string) => {
    setLoading(true)
    axios.get(path)
    try {
      const response = await axios.get(path)
      return response.data
    } catch {
      showToast(`データの取得に失敗しました`, 'error')
    } finally {
      setLoading(false)
    }
  }

  return { postRequest, getRequest, replaceByUrl, fetchData }
}
