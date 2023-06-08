import { extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Futura-Light';
        src: url('/fonts/futura-light-bt.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      /* latin */
      @font-face {
        font-family: 'Futura-MD-BT';
        src: url('/fonts/futura-medium.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `}
  />
)

const theme = extendTheme({
  config,
  fonts: {
    body: 'Futura-MD-BT',
    heading: 'Futura-Light',
  },
  styles: {
    global: (props: { colorMode: string; }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'black' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'black',
      },
    }),
  },
});

export default theme;
