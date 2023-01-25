import { Link as ReactLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Badge,
  Input,
  IconButton,
  useNumberInput,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import axios from "utils/axios";
import { endpoint } from "config/api";
import { IProduct } from "types";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { generateUUID } from "utils";

const ProductDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: "",
  });

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 100,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  const uuId = generateUUID();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const results = await axios.get(`${endpoint}/products/${id}`);
        setProduct(results.data);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <>
    {isLoading ? (
      <Flex justifyContent="center" >Loading...</Flex>
    ) : (
      <Flex w="full" justifyContent="center" mt={10}>
        <Box w={80} h={"full"} overflow="hidden" borderWidth="1px" rounded="lg">
          <Image src={product.image} alt={`${product.title}`} roundedTop="lg" />
        </Box>

        <Flex p="6" direction="column" gap={3}>
          <Flex
            mt="1"
            direction="column"
            justifyContent="start"
            alignItems="start"
          >
            <Text
              fontSize="xl"
              fontWeight="semibold"
              w="full"
              textOverflow="ellipsis"
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              {product.title}
            </Text>
            <Text
              fontSize="xl"
              fontWeight="semibold"
              textOverflow="ellipsis"
              overflow={"hidden"}
              whiteSpace={"nowrap"}
            >
              ${product.price}
            </Text>
            <Badge
              rounded="full"
              px="2"
              fontSize="xs"
              mt={5}
              textTransform="capitalize"
            >
              {product.category}
            </Badge>
          </Flex>
          <Flex maxW={"480px"}>
            <Text fontSize="sm">{product.description}</Text>
          </Flex>
          <Flex direction="column" alignItems="start" mt={5} gap={3}>
            <Text fontSize="lg" fontWeight="semibold">
              Qty
            </Text>
            <Flex gap={3}>
              <IconButton aria-label="inc" icon={<MinusIcon />} {...dec} />
              <Input {...input} w={16} />
              <IconButton aria-label="dec" icon={<AddIcon />} {...inc} />
            </Flex>
          </Flex>
          <Flex justifyContent="center" alignContent="center" mt={10}>
            <Button
              w="100%"
              as={ReactLink}
              to={`/payments/purchase?product_id=${product.id}&order_id=${uuId}&qty=${input.value}`}
              colorScheme={"primary"}
              size={"sm"}
              color="white.100"
              isDisabled={input.value === '0' ? true : false}
            >
              Add To Cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
    )}
    </>
  );
};

export default ProductDetail;
