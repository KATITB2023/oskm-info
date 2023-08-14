import { Box, Image } from '@chakra-ui/react';

export function BlogDetailBackground() {
  return (
    <Box
      position='absolute'
      inset='0'
      margin='auto'
      marginTop='20em'
      overflow='hidden'
      zIndex='1'
    >
      <Box position='relative'>
        <Image
          position='absolute'
          src='/images/blog/art-1.png'
          alt=''
          top='-2em'
          left='0'
          w={{ lg: '500px' }}
          display={{ base: 'none', lg: 'block' }}
          userSelect='none'
          draggable={false}
        />
        <Image
          position='absolute'
          src='/images/blog/planet-1.png'
          alt=''
          top='-7em'
          right='7%'
          w={{ lg: '350px' }}
          display={{ base: 'none', lg: 'block' }}
          userSelect='none'
          draggable={false}
        />
        <Image
          position='absolute'
          src='/images/blog/spark-1.png'
          alt=''
          top='6em'
          right='0'
          w={{ lg: '650px' }}
          display={{ base: 'none', lg: 'block' }}
          userSelect='none'
          draggable={false}
        />
      </Box>
      <Image
        position='absolute'
        src='/images/blog/ornamen-2.png'
        alt=''
        top={{ base: '30%', lg: '50%'}}
        right={{ base: '-20%', lg: '0' }}
        w={{ base: '600px', lg: '800px' }}
        userSelect='none'
        draggable={false}
      />
      <Image
        position='absolute'
        src='/images/blog/ornamen-1.png'
        alt=''
        bottom={{ base: '7%', lg: '5%' }}
        left={{ base: '0', lg: '0' }}
        w={{ base: '100%', lg: '100%' }}
        transform={{ base: 'scale(1.3)', lg: 'scale(1)' }}
        userSelect='none'
        draggable={false}
      />
    </Box>
  );
}
