import {
  Flex,
  Stack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Item from "components/Item";
import { useEffect, useState } from "react";
import axios from "utils/axios";
import { endpoint } from "config/api";
import { IProduct } from "types";
import ItemSkeleton from "components/skeletons/ItemSkeleton";

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const results = await axios.get(
          `${endpoint}/products?limit=15&sort=desc`
        );
        setProducts(results.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Flex py={8} h="100%" gap={10}>
      <Stack w="100%">
        {isLoading ? (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ base: 10, md: 6 }}
          >
            <GridItem>
              <ItemSkeleton />
            </GridItem>
            <GridItem>
              <ItemSkeleton />
            </GridItem>
            <GridItem>
              <ItemSkeleton />
            </GridItem>
            <GridItem>
              <ItemSkeleton />
            </GridItem>
            <GridItem>
              <ItemSkeleton />
            </GridItem>
            <GridItem>
              <ItemSkeleton />
            </GridItem>
          </Grid>
        ) : (
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
            gap={{ base: 10, md: 6 }}
          >
            {products.map((product) => (
              <GridItem key={product?.id}>
                <Item product={product}></Item>
              </GridItem>
            ))}
          </Grid>
        )}
      </Stack>
    </Flex>
  );
};

export default Products;
