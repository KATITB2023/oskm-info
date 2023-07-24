import { extendTheme } from '@chakra-ui/react';
import { colors } from './component/colors';
import { Button } from './component/button';
import { Input } from './component/input';
import { Table } from './component/table';

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
          w: '2',
          h: '1.5'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'oranye',
          boxShadow: 'inset 0 0 7px black'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'green.1',
          boxShadow: 'inset 0 0 2px black',
          borderRadius: '4'
        }
      }
    }
  },
  components: {
    Button,
    Input,
    Table
  }
});

export default theme;
