import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

interface Props {
  image: string;
}
const SponsorBackground = ({ image }: Props) => {
  const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
    <ChakraImage
      ref={ref}
      src={image}
      draggable='false'
      loading='lazy'
      position='absolute'
      zIndex='10'
      opacity='0.8'
      {...props}
    />
  ));

  return (
    <Box position='absolute' inset='0' margin='auto' zIndex='1'>
      <Image alt='' top='5' left='-5' w={{ base: '150px', lg: '300px' }} />
      <Image alt='' bottom='5' right='0' w={{ base: '150px', lg: '300px' }} />
    </Box>
  );
};

export default SponsorBackground;
