import {
  Center,
  Flex,
  Box,
  Image,
  Link,
  UnorderedList,
  HStack,
  VStack,
  Divider,
  Text
} from '@chakra-ui/react';

const Footer = () => {
  return (
    <Center>
      <Flex
        px={{ base: '3rem', lg: '5rem' }}
        width='100%'
        height={{ base: '364px', lg: '175px' }}
        // height='175px'
        flexShrink='0'
        bgImage='/images/foot-bg.png'
        bgColor='black'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        justifyContent='center'
        alignItems='center'
        overflow='hidden'
        fontWeight='semibold'
        fontFamily='SomarRounded-Regular'
      >
        <Box pos='absolute' left='0'>
          <Image
            src='/images/foot-bintangMini.png'
            draggable='false'
            loading='lazy'
          />
        </Box>
        {/* Desktop Display */}
        <Box pos='absolute' left='30' display={{ base: 'none', lg: 'block' }}>
          <Flex>
            <Image
              src='/images/foot-logo.png'
              height={{ base: '53', lg: '87' }}
              draggable='false'
              loading='lazy'
              marginLeft='30px'
            />
            <Image
              src='/images/foot-oskm.svg'
              height={{ base: '53', lg: '87' }}
              draggable='false'
              loading='lazy'
              marginLeft='8px'
            />
            <UnorderedList listStyleType='none' marginLeft='73px'>
              <HStack spacing={{ lg: '27px', xl: '45px' }}>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  About Us
                </Link>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Merchandise
                </Link>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Interactive Map
                </Link>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Blog
                </Link>
              </HStack>
              <Divider my='20px' />
              <HStack spacing={{ lg: '27px', xl: '13px' }}>
                <Link href='/' color='white'>
                  <Image
                    src='/images/foot-twitter.png'
                    draggable='false'
                    loading='lazy'
                  />
                </Link>
                <Link href='/' color='white'>
                  <Image
                    src='/images/foot-instagram.png'
                    draggable='false'
                    loading='lazy'
                  />
                </Link>
                <Link href='/' color='white'>
                  <Image
                    src='/images/foot-youtube.png'
                    draggable='false'
                    loading='lazy'
                  />
                </Link>
                <Link href='/' color='white'>
                  <Image
                    src='/images/foot-linkedin.png'
                    draggable='false'
                    loading='lazy'
                  />
                </Link>
              </HStack>
            </UnorderedList>
            <Box marginLeft='255px'>
              <HStack>
                <Image
                  src='/images/foot-itb.png'
                  draggable='false'
                  loading='lazy'
                />
                <Box fontSize='12px' textAlign='left' color='white'>
                  <Text>ITB Kampus Jatinangor</Text>
                  <Text maxW='250px'>
                    Jl. Let. Jen. Purn. Dr. (HC) Mashudi No. 1 Jatinangor, Kab.
                    Sumedang, Jawa Barat Indonesia 45363
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Flex>
        </Box>
        {/* Mobile Display */}
        <Box pos='absolute' display={{ base: 'block', lg: 'none' }}>
          <Image
            src='/images/foot-logo.png'
            height={{ base: '54', lg: '87' }}
            draggable='false'
            loading='lazy'
          />
          <Image
            src='/images/foot-oskm.svg'
            height={{ base: '26', lg: '87' }}
            draggable='false'
            loading='lazy'
          />
          <Box>
            <HStack marginTop='33px' spacing={{ base: '51px', lg: '45px' }}>
              <VStack alignItems='left' spacing={{ base: '14px', lg: '45px' }}>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  About Us
                </Link>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Interactive Map
                </Link>
              </VStack>
              <VStack alignItems='left' spacing={{ base: '14px', lg: '45px' }}>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Merchandise
                </Link>
                <Link
                  href='/'
                  color='white'
                  _hover={{ textDecoration: 'none' }}
                >
                  Blog
                </Link>
              </VStack>
            </HStack>
          </Box>
          <Divider my='20px' />
          <HStack spacing={{ base: '13px', lg: '13px' }}>
            <Link href='/' color='white'>
              <Image
                src='/images/foot-twitter.png'
                draggable='false'
                loading='lazy'
              />
            </Link>
            <Link href='/' color='white'>
              <Image
                src='/images/foot-instagram.png'
                draggable='false'
                loading='lazy'
              />
            </Link>
            <Link href='/' color='white'>
              <Image
                src='/images/foot-youtube.png'
                draggable='false'
                loading='lazy'
              />
            </Link>
            <Link href='/' color='white'>
              <Image
                src='/images/foot-linkedin.png'
                draggable='false'
                loading='lazy'
              />
            </Link>
          </HStack>
          <Box marginTop='22px' alignItems='left'>
            <HStack>
              <Image
                src='/images/foot-itb.png'
                draggable='false'
                loading='lazy'
              />
              <Box fontSize='12px' textAlign='left' color='white'>
                <Text>ITB Kampus Jatinangor</Text>
                <Text maxW='250px'>
                  Jl. Let. Jen. Purn. Dr. (HC) Mashudi No. 1 Jatinangor, Kab.
                  Sumedang, Jawa Barat Indonesia 45363
                </Text>
              </Box>
            </HStack>
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};

export default Footer;
