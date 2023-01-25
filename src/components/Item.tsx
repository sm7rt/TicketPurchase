import { Link as ReactLink } from "react-router-dom"
import {
  Flex,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Text,
  Button,
} from '@chakra-ui/react';
import { IProduct } from "types";

function Item({ product }: {
  product: IProduct
}) {

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">
        <Box w={'full'} h={64} overflow="hidden"> 
          <Image
            src={product.image}
            alt={`${product.title}`}
            roundedTop="lg"
          />
        </Box>

        <Flex p="6" direction="column" gap={3}>
          <Flex mt="1" direction="column" justifyContent="start" alignItems="start">
            <Text fontSize="md" fontWeight="semibold" w="full" textOverflow='ellipsis' overflow={'hidden'} whiteSpace={'nowrap'}>
              {product.title}
            </Text>
            <Badge rounded="full" px="2" fontSize="xs" mt={5} textTransform="capitalize">
              {product.category}
            </Badge>
          </Flex>
          <Flex justifyContent="center" alignContent="center">
            <Button
              w="100%"
              as={ReactLink}
              to={`/product/detail/${product.id}`}
              colorScheme={'primary'}
              size={'sm'}
              color='white.100'>
              Detail
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Item;