import { type NextPage } from 'next';
import { Box, Flex } from '@chakra-ui/react';
import Layout from '~/layout';
import ImageBox from '~/components/ImageBox';
import Jumbotron from '~/components/home-page/Jumbotron';
import Timeline from '~/components/home-page/Timeline';
import SupportBackground from '~/components/background/SupportBackground';

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
        pb={10}
        overflow='hidden'
      >
        <Jumbotron />
        <Timeline />
        <Box position='relative' w='100%'>
          <SupportBackground />
          <ImageBox
            title='OUR SPONSORS'
            image='/images/misc/spark.png'
            type='sponsor'
          />
          {/* <ImageBox
          title='OUR MEDIA PARTNER'
          object='MEDIA&nbsp;PARTNER'
          contact='+62-812-9237-2312'
          image='/images/bg-media-partner.png'
        /> */}
          <ImageBox
            title='OUR TENANTS'
            object='TENANTS'
            contact='+62-878-0868-1581'
            image='/images/sponsor/bintang-kicil.png'
            type='tenants'
          />
        </Box>
      </Flex>
    </Layout>
  );
};

export default Home;
