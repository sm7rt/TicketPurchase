import {
  Box,
  useRadio,
} from '@chakra-ui/react';

function CreditCard(props: any) {

  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input type="radio" {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        _checked={{
          bg: 'blue.100',
          borderColor: 'blue.100',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default CreditCard;