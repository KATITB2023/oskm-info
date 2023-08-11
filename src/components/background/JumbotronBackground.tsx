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
    <Box position='absolute' inset='0' margin='auto' zIndex='10'>
      <Image
        src='/images/space-object/dust.png'
        alt=''
        top='0'
        left='15%'
        w='65%'
      />
      <Image src='/images/misc/spark3.png' alt='' top='15%' left='10%' w='5%' />
      <Image
        src='/images/jumbotron/asteroid.png'
        alt=''
        bottom='0'
        right='0'
        w='10%'
      />
      <Image
        src='/images/jumbotron/blue-planet.png'
        alt=''
        bottom='20%'
        left='0'
        w='12%'
      />
      <Image
        src='/images/jumbotron/komet.png'
        alt=''
        top='5%'
        right='0'
        w='15%'
      />
      <Image
        src='/images/jumbotron/spark-kicik.png'
        alt=''
        bottom='-25%'
        left='5%'
        w='25%'
      />
      <Image
        src='/images/jumbotron/spark-kicik2.png'
        alt=''
        top='0%'
        right='5%'
        w='30%'
      />
      <Image
        src='/images/jumbotron/sparkle.png'
        alt=''
        bottom='20%'
        right='5%'
        w='10%'
      />
    </Box>
  );
};

export default JumbotronBackground;
