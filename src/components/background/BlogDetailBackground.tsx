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
      <Image
        position='absolute'
        src='/images/blog/art-1.png'
        alt=''
        top='-2em'
        left='0'
        w={{ lg: '500px' }}
        display={{ base: 'none', lg: 'block' }}
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
        draggable={false}
      />
      <Image
        position='absolute'
        src='/images/blog/ornamen-2.png'
        alt=''
        top={{ base: '30%', lg: '50%'}}
        right={{ base: '-20%', lg: '0' }}
        w={{ base: '600px', lg: '800px' }}
        draggable={false}
        opacity='50%'
      />
      <Image
        position='absolute'
        src='/images/blog/ornamen-1.png'
        alt=''
        bottom='0'
        left='0'
        w={{ base: '100%', lg: '100%' }}
        transform={{ base: 'scale(1.3)', lg: 'scale(1)' }}
        draggable={false}
        opacity='50%'
      />
    </Box>
  );
}
