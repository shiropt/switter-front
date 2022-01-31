import type { VFC } from 'react'
import { useState } from 'react'
import { Box, ListItem, List, Image, Flex, Text } from '@chakra-ui/react'

import { stores } from '@/utils/AppUtils'

type StoreListProps = {
  selectStore: (code: string) => void
}

export const StoreList: VFC<StoreListProps> = (props) => {
  const [isSelectAll, setIsSelectAll] = useState<boolean>(true)
  const selectStore = (storeCode: string) => {
    stores.forEach((store) => {
      store.selected = store.code === storeCode ? true : false
    })
    setIsSelectAll(stores.every((store) => store.selected === false))
    props.selectStore(storeCode)
  }
  const list = stores.map((store) => {
    return (
      <List
        key={store.code}
        _hover={{ opacity: 0.7 }}
        cursor="pointer"
        opacity={store.selected ? 0.7 : 1}
        onClick={() => selectStore(store.code)}
      >
        <Flex m={5}>
          <Image mr={4} src={`/static/${store.code}.png`} w={10} alt="ストア画像" />
          <ListItem>{store.name}</ListItem>
        </Flex>
      </List>
    )
  })
  return (
    <Box mt={10} h="100%" position="fixed" color=" #DD6B20" fontWeight="bold" fontSize="large">
      <Text
        ml={75}
        onClick={() => selectStore('')}
        _hover={{ opacity: 0.7 }}
        opacity={isSelectAll ? 0.7 : 1}
        cursor="pointer"
      >
        すべて
      </Text>
      {list}
    </Box>
  )
}
