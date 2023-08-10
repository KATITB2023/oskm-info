import { type NextPage } from 'next';
import { Flex } from '@chakra-ui/react';
import Layout from '~/layout';
import ImageBox from '~/components/ImageBox';
import Jumbotron from '~/components/home-page/Jumbotron';

const Home: NextPage = () => {
  return (
    <Layout>
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
        <Jumbotron />
        {/* timleine */}
        {/* <ImageBox
          title='OUR SPONSORS'
          object='SPONSORS'
          contact='loremipsum@gmail.com'
          image='/images/bg-sponsor.png'
        />
        <ImageBox
          title='OUR MEDIA PARTNER'
          object='MEDIA&nbsp;PARTNER'
          contact='+62-812-9237-2312'
          image='/images/bg-media-partner.png'
        /> */}
      </Flex>
    </Layout>
  );
};

export default Home;
