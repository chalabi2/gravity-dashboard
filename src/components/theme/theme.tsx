import { extendTheme } from '@chakra-ui/react';
import { Global } from '@emotion/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Futura';
        src: url('./fonts/futura\ light\ bt.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
      /* latin */
      @font-face {
        font-family: 'Futura';
        src: url('./fonts/futura\ medium\ bt.ttf') format('truetype');
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
    body: 'Futura',
    heading: 'Futura',
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
