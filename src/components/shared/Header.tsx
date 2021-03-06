import type { VFC } from 'react'
import { useCallback } from 'react'
import { Box, Heading, Flex, Spacer } from '@chakra-ui/react'
import { AppButton } from './AppButton'
import { MenuButton, Menu, MenuList, MenuOptionGroup, MenuItem, MenuDivider } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { HiUserCircle } from 'react-icons/hi'
import { IconContext } from 'react-icons'
import { useRecoilValue, useRecoilState } from 'recoil'
import { userState, loadState } from '@/atoms/states'
import { useCertification } from '@/hooks/useCertification'
import { useRouter } from 'next/router'

type HeaderProps = {
  isSignIn: boolean
  showSignInModal?: VoidFunction
  showSignUpModal?: VoidFunction
  showPostModal?: VoidFunction
}

export const Header: VFC<HeaderProps> = (props) => {
  const router = useRouter()
  const [userInfo, setUserInfo] = useRecoilState(userState)

  const { isSignIn, showSignInModal, showSignUpModal } = props
  const showPostModal = useCallback(() => {
    props.showPostModal!()
    return
  }, [])
  const { signOut } = useCertification()
  const moveToMyPage = () => {
    router.push(`/user/${userInfo.id}`)
  }

  return (
    <Box bg="pink" w="100%" p={3} color="white" position="fixed" zIndex={999}>
      <Flex>
        <Box w="180px" borderRadius="md" bg="white" p={2} cursor="pointer">
          <Heading size="lg" color="pink">
            <Flex>
              <IconContext.Provider value={{ size: '35px' }}>
                <FaTwitter />
              </IconContext.Provider>
              <Spacer />
              Switter
              <Spacer />
            </Flex>
          </Heading>
        </Box>
        <Spacer />
        {isSignIn ? (
          <Flex mr="4">
            <AppButton mr={4} mt={1} onClick={showPostModal}>
              POST
            </AppButton>
            <AppButton mt={1} onClick={signOut}>
              ログアウト
            </AppButton>
            {/* <Menu>
              <MenuButton>
                <IconContext.Provider value={{ size: '55px' }}>
                  <HiUserCircle />
                </IconContext.Provider>
              </MenuButton>
              <MenuList id="1" minWidth="180px" bg="gray.600">
                <MenuOptionGroup title={userInfo.name}>
                  <MenuItem onClick={moveToMyPage} _hover={{ color: 'black' }}>
                    マイページ
                  </MenuItem>
                  <MenuItem _hover={{ color: 'black' }}>設定</MenuItem>
                  <MenuItem onClick={signOut} _hover={{ color: 'black' }}>
                    ログアウト
                  </MenuItem>
                </MenuOptionGroup>
              </MenuList>
            </Menu> */}
          </Flex>
        ) : (
          <Box mr="4">
            <AppButton mr={4} mt={1} onClick={showSignInModal}>
              ログイン
            </AppButton>
            <AppButton mt={1} onClick={showSignUpModal}>
              新規登録
            </AppButton>
          </Box>
        )}
      </Flex>
    </Box>
  )
}
