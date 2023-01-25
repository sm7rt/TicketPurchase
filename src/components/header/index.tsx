import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Logo } from "components/Logo"

export default function Header() {

  return (
    <>
      <Box pos="fixed" w="100%" backdropFilter="blur(6px)" zIndex={9999} bg={useColorModeValue('white.50', 'gray.50')} px={4}>
        <Flex w="100%" h={16} alignItems={'center'} justifyContent={{ base: 'space-between', md: 'center' }}>
          <Flex w="100%" justifyContent={'center'}>
            <Logo />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}