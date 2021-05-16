import {extendTheme} from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const theme = extendTheme({config})
export default theme
