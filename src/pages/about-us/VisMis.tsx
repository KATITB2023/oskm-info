import {
  Box,
  Flex,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Image
} from '@chakra-ui/react';
import { colors } from '~/styles/component/colors';

export default function VisMis(props: { title: 'VISI' | 'MISI' }) {
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
        bgSize='cover'
        bgRepeat='no-repeat'
        bgPosition='center'
        position='relative'
        width='100%'
      >
        <Image
          src='/images/about-us/small-moon.png'
          bottom='-50px'
          right='-50px'
          zIndex='10'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/magenta-gradient.png'
          top='0'
          left='0'
          w='100%'
          zIndex='0'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/fuschia-gradient.png'
          bottom='0'
          right='0'
          w='100%'
          zIndex='0'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/spark-right-box.png'
          right='0'
          top='0'
          zIndex='3'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/spark-left-box.png'
          left='0'
          top='0'
          zIndex='3'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        {props.title === 'VISI' ? (
          <Text align='center' color='white' zIndex='2'>
            KAT ITB 2023 sebagai vivarium pencetak katalisator penuh warna dalam
            mewujudkan masyarakat madani.
          </Text>
        ) : (
          <OrderedList textAlign='justify' color='white' zIndex='2'>
            <ListItem>
              KAT ITB 2023 dapat menciptakan Iingkungan yang inklusif dan dapat
              mendukung pertumbuhan dan pengembangan setiap insan yang terlibat
              di dalamnya.
            </ListItem>
            <ListItem>
              KAT ITB 2023 dapat menjalankan pendidikan yang memberikan
              pembekalan dengan tetap mempertahankan warna setiap insan.
            </ListItem>
            <ListItem>
              KAT ITB mampu membentuk model civil society dalam kemahasiswaan di
              KM ITB.
            </ListItem>
            <ListItem>
              KAT ITB dapat menginisiasi keinginan untuk berkontribusi membangun
              tatanan masyarakat madani Indonesia di masa depan
            </ListItem>
          </OrderedList>
        )}
      </Box>
    </Box>
  );
}
