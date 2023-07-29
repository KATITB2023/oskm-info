import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

export const GotTalentFull = () => (
  <Flex
    flexDir='column'
    alignItems='center'
    justifyContent='center'
    gap={5}
    px={5}
  >
    <Image
      src='/images/maintenance-booked-up.png'
      alt='coming-soon'
      w={{ base: '200px', md: '350px' }}
      draggable='false'
      loading='lazy'
    />
    <Heading
      fontSize={{ base: '2xl', md: '4xl' }}
      textAlign='center'
      px={4}
      textShadow={{ base: '0px 2px orange', md: '0px 3px orange' }}
      color='oranye'
    >
      MAAF SEKALI :(
    </Heading>
    <Box
      fontSize={{ base: 'sm', md: 'lg' }}
      textAlign='center'
      fontFamily='Bodwars'
      color='green.4'
    >
      <Text>JADWAL UNTUK ITB GOT TALENT</Text>
      <Text>TELAH HABIS</Text>
    </Box>
  </Flex>
);
