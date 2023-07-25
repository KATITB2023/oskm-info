import Layout from '~/layout';
import { Card, Flex, Grid, Text, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import MerchCard from './merchcard';

export default function Merch() {
  return (
    <>
      <Layout title='Merch'>
        <Flex
          minH='200vh'
          position='absolute'
          w='100%'
          inset='0'
          flexDirection='column'
          gap='5rem'
          backgroundImage='/images/merch-blur.png'
          backgroundSize='cover'
          alignItems='center'
          backgroundPosition='center center'
          overflowX='hidden'
        >
          <Text
            fontSize={'100px'}
            fontWeight='bold'
            color='#FFFC83'
            fontFamily='Bodwars'
            margin='10rem 0 0 0'
            textShadow='0px 4px 30px #72D8BA'
            lineHeight='30px'
          >
            Merch
          </Text>

          <Flex gap='2rem'>
            <Flex flexDirection='column' alignItems='center' gap='0.5rem'>
              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Tokopedia
              </Text>
              <Button
                padding='1.5rem 2rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
              >
                Ganesha Goods
              </Button>
            </Flex>
            <Flex flexDirection='column' alignItems='center' gap='0.5rem'>
              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Instagram
              </Text>
              <Button
                padding='1.5rem 2rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
              >
                @ganeshagoods
              </Button>
            </Flex>
          </Flex>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap='10rem'
          >
            <MerchCard
              title='Mug'
              price={20000}
              productImage='/images/merch-mug.png'
              spaceImage='/images/merch-asteroid-1.png'
              productWidth='180px'
              spaceWidth=''
            />
            <MerchCard
              title='Lanyard'
              price={30000}
              productImage='/images/merch-lanyard-1.png'
              spaceImage='/images/merch-asteroid-2.png'
              productWidth=''
              spaceWidth=''
            />
            <MerchCard
              title='Korek Api'
              price={10000}
              productImage='/images/merch-korek-api.png'
              spaceImage='/images/merch-asteroid-3.png'
              productWidth='46px'
              spaceWidth=''
            />
            <MerchCard
              title='Gantungan Kunci'
              price={15000}
              productImage='/images/merch-ganci.png'
              spaceImage='/images/merch-bulan-1.png'
              productWidth='176px'
              spaceWidth=''
            />
            <MerchCard
              title='Stiker'
              price={5000}
              productImage='/images/merch-sticker.png'
              spaceImage='/images/merch-bulan-2.png'
              productWidth='135px'
              spaceWidth=''
            />
            <MerchCard
              title='Kipas'
              price={10000}
              productImage='/images/merch-kipas.png'
              spaceImage='/images/merch-bulan-3.png'
              productWidth='162px'
              spaceWidth=''
            />
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}
