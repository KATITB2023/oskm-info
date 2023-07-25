import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '~/layout';
import { Flex, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';

export default function Merch() {
  return (
    <>
      <Layout title='Merch'>
        <Flex
          minH='100vh'
          position='absolute'
          w='100%'
          top='0'
          left='0'
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
        </Flex>
      </Layout>
    </>
  );
}
