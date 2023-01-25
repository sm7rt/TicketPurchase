import {
  Flex,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Select,
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCardInfoManager } from "state/cards/hooks";

const AddCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [cardNumber, setCardNumber] = useState('')
  const [exp, setExp] = useState('')
  const [cardName, setCardName] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardType, setCardType] = useState('visa')
  const { cards, setCardAction } = useCardInfoManager()

  const handleAddCard = () => {
    const payload = {
      id: cards.length + 1,
      cardNumber: cardNumber,
      exp: exp,
      cardName: cardName,
      cvc: cvc, 
      cardType: cardType, 
    }
    //Action to save cards
    setCardAction(payload)
    onClose()
  }

  return (
    <>
    <Flex alignItems={'center'} gap={3} p={3}>
      <AddIcon color={'blue.500'} />
      <Button size='md' colorScheme={'blue'} variant='link' onClick={onOpen}>Add New Card</Button> 
    </Flex>
     <Modal onClose={onClose} isOpen={isOpen} isCentered size={'md'} blockScrollOnMount={false}>
          <ModalOverlay backdropFilter='blur(10px)' />
          <ModalContent>
            <ModalHeader>Add Card</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex flexDir={'column'} gap={3}>
              <FormControl>
                <FormLabel>Card Type</FormLabel>
                <Select placeholder='Select Card' onChange={(e) => setCardType(e.target.value)}>
                  <option value={'visa'}>Visa</option>
                  <option value={'master'}>Master</option>
                </Select>
              </FormControl>
                <FormControl>
                  <FormLabel>Card Number</FormLabel>
                  <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} borderRadius={'xl'} _focusVisible={{ borderColor: 'none' }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Expire Date</FormLabel>
                  <Input value={exp} onChange={(e) => setExp(e.target.value)} borderRadius={'xl'} _focusVisible={{ borderColor: 'none' }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Card on Name</FormLabel>
                  <Input value={cardName} onChange={(e) => setCardName(e.target.value)} borderRadius={'xl'} _focusVisible={{ borderColor: 'none' }} />
                </FormControl>
                <FormControl>
                  <FormLabel>Cvc</FormLabel>
                  <Input value={cvc} onChange={(e) => setCvc(e.target.value)} borderRadius={'xl'} _focusVisible={{ borderColor: 'none' }} />
                </FormControl>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme={'blue'} onClick={handleAddCard}>Add Card</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
}

export default AddCard;