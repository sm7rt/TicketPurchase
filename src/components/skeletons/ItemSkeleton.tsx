import {
  Flex,
  Box,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';

function ItemSkeleton() {

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative">

        <Skeleton height='300px' width="300px" />

        <Flex p="6" direction="column" gap={3}>
          <Flex mt="1" direction="column" justifyContent="start" alignItems="start">
            <Skeleton height='15px' width="80px" />
            <Box display="flex" w="100%" mt={2} justifyContent="space-between" alignItems="baseline">
              <Skeleton height='15px' width="80px" />
              <Skeleton height='15px' width="60px" />
            </Box>
          </Flex>

          <Flex justifyContent="center" alignContent="center">
            <Skeleton height='30px' width="100%" />
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default ItemSkeleton;