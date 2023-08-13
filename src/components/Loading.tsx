import { Flex, Heading, Image, VStack } from '@chakra-ui/react';
import Head from 'next/head';

export const LoadingSuspense = () => (
  <>
    <Head>
      <title>OSKM ITB 2023</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Flex
      width='100%'
      h='100dvh'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      gap={4}
      backgroundImage='/images/background/blur4a.png'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      position='relative'
      overflow='hidden'
    >
      <Image
        src='/images/misc/wrwr-telanjang.png'
        alt=''
        draggable='false'
        top='20%'
        left='0'
        transform='translateY(-20%)'
        position='absolute'
        w='45%'
        display={{ base: 'none', lg: 'block' }}
      />
      <Image
        src='/images/misc/wrwr-telanjang.png'
        alt=''
        draggable='false'
        top='20%'
        right='0'
        position='absolute'
        w='45%'
        transform='scaleX(-1) translateY(-20%)'
        display={{ base: 'none', lg: 'block' }}
      />
      <VStack spacing={0}>
        <Image
          src='/images/loading.gif'
          alt=''
          draggable='false'
          w={{ base: '250px', lg: '400px' }}
        />
        <Heading
          color='yellow.5'
          fontSize={{ base: 'lg', lg: '2xl' }}
          letterSpacing={4}
        >
          Loading...
        </Heading>
      </VStack>
    </Flex>
  </>
);
