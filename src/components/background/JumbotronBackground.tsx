import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

const JumbotronBackground = () => {
  const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
    <ChakraImage
      ref={ref}
      draggable='false'
      loading='lazy'
      position='absolute'
      zIndex='10'
      {...props}
    />
  ));

  return (
    <Box position='absolute' inset='0' margin='auto' zIndex='1'>
      <Image
        src='/images/space-object/dust.png'
        alt=''
        top={{ base: '20%', lg: '0' }}
        left={{ base: '0', lg: '15%' }}
        w={{ base: '800px', lg: '1200px' }}
      />
      <Image
        src='/images/misc/spark3.png'
        alt=''
        top='15%'
        left='10%'
        w='100px'
      />
      <Image
        src='/images/jumbotron/asteroid.png'
        alt=''
        bottom='-10%'
        right='0'
        w={{ base: '125px', lg: '175px' }}
      />
      <Image
        src='/images/jumbotron/blue-planet.png'
        alt=''
        bottom='20%'
        left='0'
        w={{ base: '150px', lg: '250px' }}
      />
      <Image
        src='/images/jumbotron/komet.png'
        alt=''
        top='5%'
        right='0'
        w={{ base: '125px', lg: '250px' }}
      />
      <Image
        src='/images/jumbotron/spark-kicik.png'
        alt=''
        bottom={{ base: '-5%', lg: '-25%' }}
        left='5%'
        w={{ base: '200px', lg: '425px' }}
      />
      <Image
        src='/images/jumbotron/spark-kicik2.png'
        alt=''
        top='0%'
        right='5%'
        w={{ base: '300px', lg: '500px' }}
      />
      <Image
        src='/images/jumbotron/sparkle.png'
        alt=''
        bottom='20%'
        right='5%'
        w={{ base: '125px', lg: '250px' }}
      />
    </Box>
  );
};

export default JumbotronBackground;
