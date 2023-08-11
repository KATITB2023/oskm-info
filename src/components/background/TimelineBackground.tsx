import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

const TimelineBackground = () => {
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
        src='/images/timeline/dust-pink.png'
        alt=''
        top={{ base: '20%', lg: '-15%' }}
        left='0'
        w={{ base: '800px', lg: '1200px' }}
      />
      <Image
        src='/images/timeline/komet.png'
        alt=''
        top={{ base: '10%', lg: '20%' }}
        left='0'
        w={{ base: '100px', lg: '200px' }}
      />
      <Image
        src='/images/jumbotron/sparkle.png'
        alt=''
        top='50%'
        left='5%'
        w={{ base: '200px', lg: '350px' }}
      />
      <Image
        src='/images/timeline/planet-dudidam.png'
        alt=''
        bottom='5%'
        right='0'
        w={{ base: '150px', lg: '325px' }}
      />
      <Image
        src='/images/timeline/spark.png'
        alt=''
        bottom='0'
        left='10%'
        w={{ base: '100px', lg: '200px' }}
      />
    </Box>
  );
};

export default TimelineBackground;
