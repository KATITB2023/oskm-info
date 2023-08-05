import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import { colors } from '~/styles/component/colors';

export default function VisMis(props: {
  title: 'VISI' | 'MISI';
  text: string;
}) {
  return (
    <Box mx={{ base: '8%', md: '15%' }}>
      <Flex justifyContent='center' pb='100px' pt='150px'>
        <Heading
          size={{ base: 'xl', md: '3xl' }}
          color='yellow.5'
          textShadow={`0px 0px 10px ${
            props.title === 'VISI' ? colors.green[3] : colors.green[1]
          }`}
        >
          {props.title}
        </Heading>
      </Flex>
      <Box
        bg='navy.1'
        py='90px'
        px={{ base: '30px', md: '60px' }}
        borderRadius='10px'
        boxShadow={`0px 0px 10px ${colors.navy[5]}`}
        bgImage={{
          base: '/images/vismis-bg-mobile.png',
          md: '/images/vismis-bg.png'
        }}
        bgSize='cover'
        bgRepeat='no-repeat'
        bgPosition='center'
      >
        <Text align='justify' color='white'>
          {props.text}
        </Text>
      </Box>
    </Box>
  );
}
