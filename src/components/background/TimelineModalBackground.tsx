import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

const TimelineModalBackground = () => {
  const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
    <ChakraImage
      ref={ref}
      draggable='false'
      loading='lazy'
      position='absolute'
      opacity='0.7'
      {...props}
    />
  ));

  return (
    <Box position='absolute' inset='0' margin='auto' zIndex='-1'>
      <Image
        src='/images/timeline/bulan-full.png'
        alt=''
        top='0'
        right='0'
        w={{ base: '150px', lg: '250px' }}
      />
      <Image
        src='/images/timeline/smol-biru.png'
        alt=''
        top='0'
        right='0'
        w={{ base: '200px', lg: '350px' }}
      />
      <Image
        src='/images/misc/wrwr-alt-2.png'
        alt=''
        bottom='0'
        right='0'
        w={{ base: '200px', lg: '350px' }}
      />
      <Image
        src='/images/timeline/sparkle.png'
        alt=''
        top='20%'
        left='10'
        w={{ base: '200px', lg: '300px' }}
      />
      <Image
        src='/images/timeline/glubuk.png'
        alt=''
        bottom='7%'
        right='10'
        w={{ base: '100px', lg: '200px' }}
      />
      <Image
        src='/images/timeline/komet-yellow.png'
        alt=''
        bottom='30%'
        left='0'
        w={{ base: '100px', lg: '200px' }}
      />
    </Box>
  );
};

export default TimelineModalBackground;
