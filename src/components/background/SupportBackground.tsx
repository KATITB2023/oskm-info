import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

const SupportBackground = () => {
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
    <Box position='absolute' inset='0' margin='auto' zIndex='0'>
      <Image
        src='/images/sponsor/spiral.png'
        alt=''
        top={{ base: '20%', lg: '10%' }}
        right='0'
        w={{ base: '300px', lg: '500px' }}
      />
      <Image
        src='/images/sponsor/munaroh-telanjang.png'
        alt=''
        top='-20%'
        left='0'
        w={{ base: '150px', lg: '250px' }}
      />
      <Image
        src='/images/sponsor/spark.png'
        alt=''
        top='50%'
        left='20%'
        w={{ base: '200px', lg: '350px' }}
      />
      <Image
        src='/images/jumbotron/asteroid.png'
        alt=''
        transform='scaleX(-1)'
        bottom='5%'
        left='0'
        w='175px'
      />
    </Box>
  );
};

export default SupportBackground;
