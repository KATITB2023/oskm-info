import {
  Center,
  Flex,
  Box,
  Image,
  UnorderedList,
  HStack,
  VStack,
  Divider,
  Text,
  Icon,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';

interface NavItemProps {
  href: string;
  label: string;
}

const Footer = () => {
  const navURL = [
    { href: '/about-us', label: 'About Us' },
    { href: '/merch', label: 'Merchandise' },
    { href: '/interactive-map', label: 'Interactive Map' },
    { href: '/blog', label: 'Blog' }
  ];
  const sosmed = [
    { href: 'https://twitter.com/oskmitb', icon: FaTwitter, hover: '#1DA1F2' },
    {
      href: 'https://instagram.com/oskm.itb/',
      icon: FaInstagram,
      hover: '#C13584'
    },
    {
      href: 'https://www.youtube.com/channel/UCmkkBEqwMZ1SEZN937pdpgA',
      icon: FaYoutube,
      hover: '#FF0000'
    }
    // { href: 'https://linkedin.com', icon: FaLinkedin, hover: '#0E76A8' }
  ];

  const NavItem = ({ href, label }: NavItemProps) => (
    <Link href={href}>
      <Box
        pos='relative'
        w='100%'
        _hover={{
          color: 'yellow.5',
          transition: 'width 0.3s',
          _after: { width: '100%' }
        }}
        _after={{
          content: '""',
          position: 'absolute',
          display: 'block',
          height: '2px',
          background: 'yellow.5',
          transition: 'width .3s',
          bottom: 0,
          left: 0,
          width: 0
        }}
      >
        <Text>{label}</Text>
      </Box>
    </Link>
  );

  return (
    <Flex
      px={{ base: 5, lg: 14 }}
      py={9}
      bgColor='black'
      color='white'
      justifyContent={{ base: 'center', lg: 'space-between' }}
      flexDirection={{ base: 'column', lg: 'row' }}
      gap={4}
      alignItems='center'
      fontWeight='semibold'
      fontSize='14px'
      bgImage='/images/foot-bg.png'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      position='relative'
    >
      <Image
        src='/images/foot-bintangMini.png'
        draggable='false'
        loading='lazy'
        alt=''
        position='absolute'
        left='0'
        bottom='0'
        overflow='hide'
      />
      <Flex
        flexDirection={{ base: 'column', lg: 'row' }}
        gap={{ base: 4, lg: 12 }}
      >
        <Flex flexDir={{ base: 'column', lg: 'row' }} alignItems='center'>
          <Image
            src='/images/logo-oskm.png'
            draggable='false'
            loading='lazy'
            alt=''
            w={{ base: '50px', lg: '75px' }}
          />
          <Image
            src='/images/nav-logo.svg'
            draggable='false'
            loading='lazy'
            alt=''
            w={{ base: '200px', lg: '175px' }}
          />
        </Flex>
        <VStack spacing={4}>
          <HStack spacing={{ lg: 10 }} display={{ base: 'none', lg: 'flex' }}>
            {navURL.map((item, index) => (
              <NavItem key={index} href={item.href} label={item.label} />
            ))}
          </HStack>
          <Grid
            display={{ base: 'grid', lg: 'none' }}
            templateColumns='repeat(2, 1fr)'
            templateRows='repeat(2, 1fr)'
            rowGap={3}
            columnGap={14}
          >
            {navURL.map((item, index) => (
              <>
                <GridItem key={index}>
                  <NavItem href={item.href} label={item.label} />
                </GridItem>
              </>
            ))}
          </Grid>
          <Divider color='gray.600' />
          <HStack spacing={3} alignSelf='flex-start'>
            {sosmed.map((item, index) => (
              <Link href={item.href} key={index}>
                <Icon
                  as={item.icon}
                  w={5}
                  h={5}
                  transition='color 0.2s'
                  _hover={{ color: item.hover }}
                />
              </Link>
            ))}
          </HStack>
        </VStack>
      </Flex>
      <HStack spacing={2}>
        <Image
          src='/images/foot-itb.svg'
          draggable='false'
          loading='lazy'
          alt=''
          w='75px'
          alignSelf='flex-start'
        />
        <Box fontWeight='normal' maxW='270px'>
          <Text fontSize='lg'>ITB Kampus Jatinangor</Text>
          <Text>
            Jl. Let. Jen. Purn. Dr. (HC) Mashudi No. 1 Jatinangor, Kab.
            Sumedang, Jawa Barat Indonesia 45363
          </Text>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Footer;
