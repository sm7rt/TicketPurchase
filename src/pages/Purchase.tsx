import {
  Flex,
  Text,
  Grid,
  GridItem,
  Image,
  Heading,
  VStack,
  StackDivider,
  useRadioGroup,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Checkbox,
  Link,
  Skeleton,
} from "@chakra-ui/react";
import CreditCard from "components/CreditCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "utils/axios";
import { endpoint } from "config/api";
import { IProduct } from "types";
import { displayAmount, getCardIcon } from "utils";
// import { useOrderInfoManager } from "state/orders/hooks";
import AddCard from "components/AddCard";
import { useCardInfoManager } from "state/cards/hooks";

const Purchase = () => {
  const search = useLocation().search
  const productId = new URLSearchParams(search).get('product_id')
  const orderId = new URLSearchParams(search).get('order_id')
  const qty = new URLSearchParams(search).get('qty')
  const serviceFee = 10 
  const orderFee = 10
  // const { setOrderAction } = useOrderInfoManager()
  const { cards } = useCardInfoManager()
  const [isLoading, setIsLoading] = useState(false)
  const [cardId, setCardId] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [isTerms, setIsTerms] = useState(false)
  const [product, setProduct] = useState<IProduct>({
    id: 0,
    title: "",
  })

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: cards[0].id.toString(),
    onChange: (e) => { setCardId(e) },
  })
  const group = getRootProps()

  const handeOrder = () => {
    const payload = {
      cardId: cardId,
      orderId: orderId,
      productId: productId,
      totalPrice: totalPrice,
      qty: qty, 
    }
    
    //Action to save orders
    alert(`Order is processing... ${JSON.stringify(payload)}`)
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        const results = await axios.get(`${endpoint}/products/${productId}`);
        setProduct(results.data);
        if(results.data){
          const calc = results.data.price * Number(qty) + serviceFee + orderFee
          setTotalPrice(calc)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId, qty]);

  return (
    <Grid
      h={'calc(100vh - 128px)'}
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(2, 1fr)'
      py={10}
      gap={5}
    >
      <GridItem colSpan={1}>
        <Flex w="full" borderWidth={1} rounded="sm" flexDir={'column'} alignItems="flex-start" p={6} gap={3} mb={5}>
          <Heading as="h4" size={'md'} mb={2}>Delivery</Heading>
          <Text fontSize={'md'} fontWeight={600}>Mobile Entry - Free</Text>
          <Flex w="full" flexDir={'column'} alignItems="flex-start" >
            <Text fontSize={'sm'}>Tickets Available by Sun Apr 3, 2022</Text>
            <Text fontSize={'sm'}>Theme mobile tickets will be transferred directly to you from a trusted seller.</Text>
          </Flex>
        </Flex>
        <Flex w="full" borderWidth={1} rounded="sm" flexDir={'column'} alignItems="flex-start" p={6} gap={3}>
          <Heading as="h4" size={'md'} mb={2}>Payment</Heading>
          <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
            w="full"
          >
            <Flex w="full" flexDir={'column'} alignItems="flex-start" gap={3}>
              <Text fontSize={'md'} fontWeight={600}>Use Credit/Debit Card</Text>
              <VStack w="full" align='stretch' divider={<StackDivider borderColor='gray.200' m={'0px !important'} />} {...group}>
                {(cards && cards.length !== 0) ? cards.map((card: any) => {
                  const radio = getRadioProps({ value: card.id.toString() })
                  return (
                    <CreditCard key={card.id} {...radio}>
                      <Flex alignItems={'flex-start'} gap={3}>
                        <Image w={12} src={getCardIcon(card.cardType)} alt='Logo' />
                        <Flex alignItems="flex-start" justify={'flex-start'} flexDir={'column'}>
                          <Text fontSize={'md'} fontWeight={600} textTransform={'uppercase'}>{card.cardType} {card.cardNumber?.slice(card.cardNumber.length - 4)}</Text>
                          <Text fontSize={'sm'} color={'gray.600'}>{card.cardName} | exp. {card.exp}</Text>
                        </Flex>
                      </Flex>
                    </CreditCard>
                  )
                }) : (
                  <Text fontSize={'sm'}>Please add Card.</Text>
                )}
              </VStack>
              <AddCard />
            </Flex>
            <Flex w="full" flexDir={'column'} alignItems="flex-start" >
              <Text fontSize={'md'} fontWeight={600}>Or Pay With</Text>
              <Text fontSize={'sm'}>By using a digital wallet and continuing past this page.</Text>
            </Flex>
          </VStack>
        </Flex>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Accordion borderWidth={1} rounded="sm" allowToggle defaultIndex={[0]} >
          <AccordionItem borderWidth={'0px !important'} >
            <AccordionButton>
              <Flex w="full" p={4} pb={2} justify={'space-between'}>
                <Heading as="h4" size={'lg'} mb={2}>Total</Heading>
                {isLoading ? (
                  <Skeleton width={12} height={6} rounded="md" />
                ) : (
                  <Heading as="h4" size={'lg'} mb={2}>${displayAmount(totalPrice)}</Heading>
                )}
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Flex flexDir={'column'} alignItems="flex-start" gap={2} mb={3}>
                <Text fontSize={'md'} fontWeight={600}>Products</Text>
                <Flex w="full" justify={'space-between'}>
                  {isLoading ? (
                    <Skeleton width={12} height={6} rounded="md" />
                    ) : (
                    <Text fontSize={'md'}>Resale Tickets: ${product.price} x {qty}</Text>
                  )}
                   {isLoading ? (
                    <Skeleton width={12} height={6} rounded="md" />
                  ) : (
                    <Text fontSize={'md'}>${displayAmount(Number(product.price) * Number(qty))}</Text>
                  )}
                </Flex>
              </Flex>
              <Flex flexDir={'column'} alignItems="flex-start" gap={2} mb={3}>
                <Text fontSize={'md'} fontWeight={600}>Note From Seller</Text>
                <Flex w="full" justify={'space-between'}>
                  <Text fontSize={'md'}>This is Sample Note.</Text>
                </Flex>
              </Flex>
              <Flex flexDir={'column'} alignItems="flex-start" mb={3}>
                <Text fontSize={'md'} fontWeight={600} mb={2}>Fee</Text>
                <Flex w="full" justify={'space-between'}>
                  <Text fontSize={'md'}>Service Fee: ${serviceFee} x {qty}</Text>
                  <Text fontSize={'md'}>${displayAmount(serviceFee * Number(qty))}</Text>
                </Flex>
                <Flex w="full" justify={'space-between'}>
                  <Text fontSize={'md'}>Order Processing Fee</Text>
                  <Text fontSize={'md'}>${displayAmount(orderFee)}</Text>
                </Flex>
              </Flex>
              <Flex flexDir={'column'} alignItems="flex-start" gap={2} mb={10}>
                <Text fontSize={'md'} fontWeight={600}>Delivery</Text>
                <Flex w="full" justify={'space-between'}>
                  <Text fontSize={'md'}>Mobile Entry</Text>
                  <Text fontSize={'md'}>Free</Text>
                </Flex>
              </Flex>
              <Flex mb={3}>
                <Checkbox checked={isTerms} onChange={()=> setIsTerms(!isTerms)}>I have read and agree to the current <Link color={'blue.500'}>Terms of Use</Link></Checkbox>
              </Flex>
              <Button w="full" colorScheme={'green'} isDisabled={!isTerms} onClick={handeOrder}>Place Order</Button>
              <Text fontSize={'sm'} mt={3}>Order ID: {orderId}</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </GridItem>
    </Grid>
  );
};

export default Purchase;
