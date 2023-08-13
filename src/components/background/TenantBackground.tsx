import {
  Box,
  Image as ChakraImage,
  type ImageProps,
  forwardRef
} from '@chakra-ui/react';

interface Props {
  image: string;
}
const TenantBackground = ({ image }: Props) => {
  const Image = forwardRef<ImageProps, 'img'>((props: ImageProps, ref) => (
    <ChakraImage
      ref={ref}
      src={image}
      draggable='false'
      loading='lazy'
      position='absolute'
      zIndex='10'
      {...props}
    />
  ));

  return (
    <Box position='absolute' inset='0' margin='auto' zIndex='1'>
      <Image alt='' top='14' left='0' h='250px' />
      <Image transform='scaleX(-1)' alt='' bottom='2' right='0' h='250px' />
    </Box>
  );
};

export default TenantBackground;
