import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
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
      <Flex
        minH='100dvh'
        backgroundImage='/images/bg-coming-soon.png'
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
          src='/images/coming-soon.png'
          alt='coming-soon'
          w={{ base: '200px', md: '350px' }}
          draggable='false'
        />
        <Image
          src='/images/komet.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='20%'
          top='0'
          left='0'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/bulan.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='15%'
          bottom='0'
          left='-3%'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/munaroh.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='10%'
          top='10%'
          right='0'
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/spark.png'
          display={{ base: 'none', md: 'block' }}
          alt=''
          position='absolute'
          w='20%'
          bottom='5%'
          left='12%'
          zIndex='10'
          draggable='false'
        />
        <Heading
          fontSize={{ base: '2xl', md: '5xl' }}
          textAlign='center'
          px={4}
          textShadow={{ base: '0px 2px orange', md: '0px 3px orange' }}
        >
          <Box as='span' color='purple.5'>
            COMING{' '}
          </Box>
          <Box as='span' color='navy.5'>
            SOON!
          </Box>
        </Heading>
        <Box
          fontSize={{ base: 'sm', md: 'lg' }}
          textAlign='center'
          fontFamily='Bodwars'
          color='green.4'
        >
          <Text>BERSIAPLAH VOYAGERS!</Text>
          <Text>SESUATU YANG MENAKJUBKAN AKAN SEGERA DATANG!</Text>
        </Box>
        {/* <Flex flexDir={'column'}>
          <Center marginTop={'2'}>
            <Text fontSize={{ base: 'md', lg: 'xl' }} color='#FFBE3B'>
              Sponsor inquiries:&nbsp;
              <a href='https://wa.me/087875257932'>{'087875257932'}</a>{' '}
              (Sarayesa)
            </Text>
          </Center>
          <Center>
            <Text fontSize={{ base: 'md', lg: 'xl' }} color='#FFBE3B'>
              Media partner inquiries:&nbsp;
              <a href='https://wa.me/081281856144'>081281856144</a> (Stevani)
            </Text>
          </Center>
        </Flex> */}
      </Flex>
    </>
  );
};

export default Home;
