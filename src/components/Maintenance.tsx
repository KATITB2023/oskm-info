import { Flex, Image, Box, Text, Heading, VStack } from '@chakra-ui/react';

export const Maintenance = () => (
  <Flex
    minH='100dvh'
    backgroundImage='/images/background/bg.png'
    backgroundSize='cover'
    backgroundPosition='center'
    backgroundRepeat='no-repeat'
    alignItems='center'
    justifyContent='center'
    flexDirection='column'
    gap={5}
    px={6}
  >
    <Image
      src='/images/space-object/komet.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='15%'
      top='0'
      left='0'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/space-object/bintang.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='15%'
      top='-5%'
      left='15%'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/space-object/bintang2.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='15%'
      top='-10%'
      left='25%'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/space-object/bulan.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='17%'
      bottom='0%'
      left='-3%'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/misc/spark.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='35%'
      bottom='0'
      left='10%'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/icon/maintenance.png'
      alt='maintenance'
      w={{ base: '200px', md: '350px' }}
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/misc/munaroh.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='10%'
      top='25%'
      right='0'
      zIndex='10'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/misc/wrwr-alt-2.png'
      display={{ base: 'none', md: 'block' }}
      alt=''
      position='absolute'
      w='15%'
      top='30%'
      right='0'
      zIndex='9'
      draggable='false'
      loading='lazy'
    />
    <VStack textAlign='center' spacing={5}>
      <Heading
        letterSpacing={4}
        textShadow='4px 4px black'
        color='green.4'
        fontSize={{ base: '2xl', md: '3xl' }}
      >
        UNDER MAINTENANCE
      </Heading>
      <Box color='white' fontSize={{ base: 'md', md: 'xl' }}>
        <Text>Bersiaplah Spacefarers!</Text>
        <Text>Sesuatu yang menakjubkan sedang dipersiapkan!</Text>
      </Box>
    </VStack>
  </Flex>
);
