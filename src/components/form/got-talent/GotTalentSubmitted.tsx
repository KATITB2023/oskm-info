import { Box, Flex, Heading, Image } from '@chakra-ui/react';

interface Props {
  date: string;
  time: string;
}

export const GotTalentSubmitted = ({ date, time }: Props) => (
  <Flex
    flexDir='column'
    alignItems='center'
    justifyContent='center'
    gap={5}
    px={5}
  >
    <Image
      src='/images/icon/maintenance-submitted.png'
      alt='coming-soon'
      w={{ base: '150px', md: '250px' }}
      draggable='false'
      loading='lazy'
    />
    <Heading
      fontSize={{ base: '2xl', md: '4xl' }}
      textAlign='center'
      px={4}
      textShadow={{ base: '0px 2px #000000', md: '0px 5px #000000' }}
      color='green.1'
    >
      JADWAL TELAH TERDAFTAR
    </Heading>
    <Box textAlign='center' fontFamily='Bodwars' color='green.4'>
      <Box
        as='span'
        fontFamily='SomarRounded-Bold'
        fontSize={{ base: 'xl', md: '2xl' }}
        color='orange'
        alignSelf='center'
      >
        {/* {date} {time} */}
      </Box>
    </Box>
  </Flex>
);
