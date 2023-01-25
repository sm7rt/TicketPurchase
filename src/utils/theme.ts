import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: "Ubuntu, sans-serif",
  },
	colors: {
    primary: {
      50: "rgb(224 242 254)",
      100: "rgb(186 230 253)",
      200: "#0ea5e9",
      500: "#0ea5e9",
			600: "#0284c7"
    },
		white: {
			50: '#f5f5f550',
      100: "#ffffff",
    },
		gray: {
			50: '#1a202c90',
    },
  },
	styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        // background: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },

      input: {
        focus: {
          borderColor: 'primary.500',
          boxShadow: 'none' 
        }
      } 
    }),
  },
})