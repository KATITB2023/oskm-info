import { Flex } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Head from 'next/head';
import Navbar from '~/components/Navbar';
import ImageBox from '~/components/ImageBox';

const LandingPage: NextPage = () => {
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
      <Navbar/>
      <Flex
        minH='100dvh'
        width='100%'
        backgroundImage='/images/bg-landing.png'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        gap={5}
        px={6}
      >
        {/* JUMBOTRON */}
        {/* TIMELINE */}
        <ImageBox title='OUR SPONSORS' object='SPONSORS' contact='loremipsum@gmail.com' image='/images/bg-sponsor.png'/>
        <ImageBox title='OUR MEDIA PARTNER' object='MEDIA&nbsp;PARTNER' contact='+62-812-9237-2312' image='/images/bg-media-partner.png'/>
        </Flex>
    </>
  );
};

export default LandingPage;
