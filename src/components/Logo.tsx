import * as React from "react"
import { Link as ReactLink } from "react-router-dom"
import {
  Flex,
  Link,
  Text
} from "@chakra-ui/react"

export const Logo = (() => {

  return (
    <>
      <Link
        display="flex"
        _hover={{
          textDecoration: "none"
        }}
        rounded={'md'}
        as={ReactLink} 
        to='/'>
        <Flex fontSize={30} fontWeight={700} letterSpacing={0.1}>
          <Text>Cart Sample</Text>
        </Flex>
      </Link>
    </>
  )
})
