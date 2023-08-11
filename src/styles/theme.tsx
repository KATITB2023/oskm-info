import { extendTheme } from '@chakra-ui/react';
import { colors } from './component/colors';
import { Button } from './component/button';
import { Input } from './component/input';

const theme = extendTheme({
  fonts: {
    heading: 'Bodwars',
    body: 'SomarRounded-Regular'
  },
  colors,
  styles: {
    global: {
      body: {
        bg: 'navy.1',
        color: 'oranye'
      },
      '*': {
        '&::-webkit-scrollbar': {
          width: '2',
          borderRadius: '144px',
          background: 'transparent',
          boxShadow: '0px 4px 30px 0px #72D8BA'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--yellow-yellow-5, #FFFC83)'
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: 'var(--yellow-yellow-6, #FFEB3B)'
        },
        '&::-webkit-scrollbar-track': {
          background: 'var(--gray-100, #E2E8F0)',
          backdropFilter: 'blur(40px)'
        }
      }
    }
  },
  components: {
    Button,
    Input
  }
});

export default theme;
