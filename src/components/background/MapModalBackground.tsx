import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

const MapModalBackground = () => {
  const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
    <ChakraImage
      ref={ref}
      draggable='false'
      loading='lazy'
      position='absolute'
      opacity='0.8'
      {...props}
    />
  ));

  return (
    <Box
      position='absolute'
      inset='0'
      margin='auto'
      zIndex='-1'
      overflow='hidden'
    >
      <Image
        src='/images/misc/banner-nebula-fuschia.png'
        alt=''
        top='0'
        right='0'
      />
      <Image
        src='/images/misc/banner-nebula-magenta.png'
        alt=''
        top='20'
        left='0'
      />
      <Image src='/images/misc/spark3.png' alt='' top='5' left='-5' w='100px' />
      <Image
        src='/images/misc/spark3.png'
        alt=''
        top='0'
        right='10'
        w='100px'
      />
      <Image src='/images/misc/wrwr.png' alt='' top='0' right='200' />
      <Image
        src='/images/timeline/sparkle.png'
        alt=''
        bottom='0'
        left='0'
        w='100px'
      />
      <Image
        src='/images/timeline/sparkle.png'
        alt=''
        bottom='70'
        right='10'
        w='100px'
      />
      <Image
        src='/images/timeline/sparkle.png'
        alt=''
        top='40'
        left='20'
        w='150px'
      />
      <Image
        src='/images/timeline/sparkle.png'
        alt=''
        top='50'
        right='30'
        w='150px'
      />
      <Image
        src='/images/space-object/bulan-no-glow.png'
        alt=''
        bottom='0'
        right='0'
        w='150px'
        opacity={1}
      />
    </Box>
  );
};

export default MapModalBackground;
