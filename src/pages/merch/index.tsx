import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '~/layout';
import { Card, Flex, Grid, Text, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function Merch() {
  return (
    <>
      <Layout title='Merch'>
        <Flex
          minH='150vh'
          position='absolute'
          w='100%'
          top='0'
          left='0'
          bottom='0'
          flexDirection='column'
          gap='5rem'
          backgroundImage='/images/merch-blur.png'
          backgroundSize='cover'
          backgroundRepeat='no-repeat'
          alignItems='center'
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

          <Grid>
            <Card
              borderRadius='144px'
              width='333px'
              height='427px'
              backgroundImage='/images/merch-card.png'
              alignItems='center'
            >
              <Flex
                flexDirection='column'
                alignItems='center'
                gap='0.5rem'
                padding='5rem 0 1rem 1rem'
                justifyContent='center'
              >
                <Text
                  color='#FF93D1;'
                  fontFamily='Bodwars'
                  fontSize='40px'
                  textShadow='0px 4px 30px #8D47E5'
                  marginBottom='1rem'
                >
                  Mug
                </Text>

                <Text
                  color='#FFF'
                  fontFamily='SomarRounded-Regular'
                  fontSize='16px'
                >
                  Rp.20.000/pcs
                </Text>
                <Button
                  padding='1.5rem 1.5rem'
                  fontFamily='SomarRounded-Regular'
                >
                  Buy Now
                </Button>

                <Flex>
                  <Image
                    src='/images/merch-mug.png'
                    alt='merch-mug'
                    w='180px'
                    zIndex='3'
                  />

                  <Image
                    src='/images/merch-asteroid-1.png'
                    alt='asteroid-1'
                    w='281px'
                    position='absolute'
                    zIndex='2'
                    bottom='-155'
                    left='8'
                  />
                </Flex>

                <Image
                  src='/images/merch-vector.svg'
                  alt='merch-vector'
                  position='absolute'
                  zIndex='1'
                  bottom='0'
                  w='10000px'
                />
              </Flex>
            </Card>
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}
