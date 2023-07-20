import { Box, Center, Heading, Image } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>OSKM ITB 2023</title>
        <meta
          name='description'
          content='Sebuah website yang akan digunakan untuk acara OSKM ITB 2023'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Center minH='100vh' position='relative'>
        <Image
          src='/images/background.png'
          alt=''
          position='absolute'
          zIndex='-1'
          w='100%'
          h='100%'
          objectFit='cover'
          objectPosition='center'
          draggable='false'
        />
        <Image
          src='/images/shooting-star-left.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='35%'
          top='0'
          left='0'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/shooting-star-right.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='35%'
          top='0'
          right='0'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/mini-star-right.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='35%'
          bottom='0'
          right='0'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/mini-star-left.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='35%'
          bottom='0'
          left='0'
          zIndex='10'
          draggable='false'
        />
        <Heading
          fontSize={{ base: '2xl', lg: '6xl' }}
          textAlign='center'
          px={4}
          textShadow={{ base: '0px 1px #E77A23', lg: '0px 3px #E77A23' }}
        >
          <Box as='span' color='#8D47E5'>
            PREPARE TO {` `}
          </Box>
          <Box as='span' color='#4A58F6'>
            launch
          </Box>
        </Heading>
      </Center>
    </>
  );
};

export default Home;
