import { Box, Image, Flex, Show, Hide, Fade } from '@chakra-ui/react';

export function AboutUsBackground(props: { isPreview: boolean }) {
  return (
    <Box
      position='absolute'
      inset='0'
      margin='auto'
      overflow='hidden'
      zIndex='-99'
    >
      <Flex
        bgImage={{
          base: '/images/about-us/blur-bg-mobile.png',
          md: '/images/about-us/blur-bg.png'
        }}
        bgSize='cover'
        bgRepeat='no-repeat'
        w='100%'
        h='100%'
        position='absolute'
        zIndex='-99'
      ></Flex>
      <Image
        src='/images/about-us/star-top.png'
        top='0'
        right={{ base: '8%', md: '0%' }}
        height={{ base: '280px', md: '800px' }}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/spark-top.png'
        top={{ base: '15.5%', md: '2%' }}
        left={{ md: '2%' }}
        right={{ base: '0%' }}
        height={{ base: '250px', md: '400px' }}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/star-left.png'
        top={{ base: '8%', md: '-3%' }}
        left='0'
        height={{ base: '1000px', md: '2300px' }}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/planet-yellow.png'
        top={{base: '30%', md: '34%'}}
        right={{base: 'calc(100% - 224px)', md:'-164px'}}
        height={{base: '334px', md:'550px'}}
        scaleX={{base: '-1', md: '1'}}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/planet-left.png'
        top={{ base: props.isPreview ? '51.5%' : '48%', md: '39%' }}
        left='0'
        height={{ base: '700px', md: '1250px' }}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/spiral-right.png'
        top={{ base: props.isPreview ? '66.6%' : '62%', md: '60%' }}
        right={{ base: '6%', md: '12%' }}
        height={{ base: '140px', md: '360px' }}
        zIndex='-98'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Image
        src='/images/about-us/big-moon.png'
        bottom={{ base: '0%', md: '-500px' }}
        right={{ base: '0%', md: '0%' }}
        width='100%'
        zIndex='-95'
        position='absolute'
        draggable='false'
        loading='lazy'
      />
      <Show above='md'>
        {props.isPreview ? null : (
          <Fade in={true} transition={{ enter: { duration: 3 } }}>
            <Image
              src='/images/about-us/nebula.png'
              top={{ base: '5%', md: '52%' }}
              right='0'
              width={{ base: '10px', md: '100%' }}
              zIndex='-97'
              position='absolute'
              draggable='false'
              loading='lazy'
            />
          </Fade>
        )}
        <Image
          src='/images/about-us/hidden-spark-right.png'
          top='67%'
          right='0'
          height='450px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/hidden-spark-left.png'
          top='83%'
          left='0'
          height='450px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/planet-mini-left.png'
          top='80%'
          left='0'
          height='250px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/planet-mini-right.png'
          top='80%'
          right='0'
          height='250px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
      </Show>
      <Hide above='md'>
        <Image
          src='/images/about-us/star-top-mobile.png'
          top='2%'
          left='0'
          height='400px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/star-bottom-mobile.png'
          top={props.isPreview ? '54.7%' : '51%'}
          right='0'
          height='250px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
        <Image
          src='/images/about-us/spark-bottom-mobile.png'
          top={props.isPreview ? '69.8%' : '65%'}
          left='0%'
          height='270px'
          zIndex='-98'
          position='absolute'
          draggable='false'
          loading='lazy'
        />
      </Hide>
    </Box>
  );
}
