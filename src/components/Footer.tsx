import { Center, Flex, Box, Image, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Center>
      <Flex
        px={{ base: '3rem', lg: '5rem' }}
        width='100%'
        height='175px'
        flexShrink='0'
        bgImage='/images/foot-bg.png'
        bgColor='black'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        justifyContent='space-between'
        alignItems='center'
        overflow='hidden'
      >
        <Box pos='absolute' left='0'>
          <Image
            src='/images/foot-bintangMini.png'
            draggable='false'
            loading='lazy'
          />
        </Box>
        <Box pos='absolute' left='30'>
          <Image
            src='/images/foot-logo.png'
            height={{ base: '53', lg: '87' }}
            draggable='false'
            loading='lazy'
          />
        </Box>
        <Box pos='absolute' left='8'>
          <Image
            src='/images/foot-oskm.svg'
            height={{ base: '53', lg: '87' }}
            draggable='false'
            loading='lazy'
          />
        </Box>
      </Flex>
    </Center>
  );
};

export default Footer;
