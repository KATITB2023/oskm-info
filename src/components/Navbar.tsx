import { Box, Button, Flex, HStack, Image, UnorderedList, Text, Center, Menu, MenuItem, MenuButton, MenuList, Icon, As } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdAssuredWorkload, MdShoppingBag, MdMap, MdNewspaper, MdRocketLaunch, MdLogin } from 'react-icons/md';
import { useRouter } from 'next/router';

interface LiItemProps {
  href: string;
  itemName: string;
  itemIcon?: As;
}

const MobLiItem = ({ href, itemIcon, itemName }: LiItemProps) => {
  const router = useRouter();
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName);
  };

  return (
    <Link href={href}>
      <MenuItem
        my='4px'
        bg='transparent'
        pos='relative'
        color={activeRoute(href) ? 'yellow.5' : '#ffffff'}
        _hover={{
          color: 'yellow.5',
          _after: { height: '100%' }
        }}
        _after={{
          content: '""',
          display: 'block',
          width: '2px',
          height: activeRoute(href) ? '100%' : 0,
          background: 'yellow.5',
          position: 'absolute',
          left: 0
        }}
      >
        <HStack spacing={2}>
          <Box>
            <Icon w={6} h={6} as={itemIcon} />
          </Box>
          <Text>{itemName}</Text>
        </HStack>
      </MenuItem>
    </Link>
  );
};

const DeskLiItem = ({ href, itemName }: LiItemProps) => {
  const router = useRouter();
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName);
  };

  return (
    <Link href={href}>
      <HStack
        pos='relative'
        color={activeRoute(href) ? 'yellow.5' : '#ffffff'}
        _hover={{
          color: 'yellow.5',
          transition: 'width 0.3s',
          _after: { width: '100%' }
        }}
        _after={{
          content: '""',
          display: 'block',
          width: activeRoute(href) ? '100%' : 0,
          height: '2px',
          background: 'yellow.5',
          transition: 'width .3s',
          position: 'absolute',
          bottom: 0,
          left: 0
        }}
      >
        <Text>{itemName}</Text>
      </HStack>
    </Link>
  );
};

const Navbar = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // contoh
  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Center>
      <Flex
        mt='1rem'
        px={{ base: '3rem', lg: '5rem' }}
        py='8px'
        width='90%'
        bgImage='/images/nav-bg.png'
        bgColor='black'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        justifyContent='space-between'
        alignItems='center'
        borderRadius='50'
        boxShadow='0px 0px 20px 0px #FFFC83;'
        overflow='hidden'
        pos='fixed'
        top='0'
        color='white'
        zIndex='100'
        fontSize='14px'
        fontWeight='semibold'
      >
        <Box pos='absolute' width='100%' left='0' top='0'>
          <Image src='/images/nav-ekor.png' draggable='false' loading='lazy' />
        </Box>
        <Box zIndex='1000'>
          <Link href='/'>
            <Image
              src='/images/nav-logo.svg'
              height={{ base: '38px', lg: '57px' }}
              draggable='false'
              loading='lazy'
            />
          </Link>
        </Box>
        <UnorderedList
          listStyleType='none'
          display={{ base: 'none', lg: 'block' }}
        >
          <HStack spacing={{ lg: '27px', xl: '45px' }}>
            <DeskLiItem href='/' itemName='About Us' />
            <DeskLiItem href='/' itemName='Merchandise' />
            <DeskLiItem href='/' itemName='Interactive Map' />
            <DeskLiItem href='/' itemName='Blog' />
            <Box onClick={handleLogin}>
              {isLogin ? (
                <Link href=''>
                  <Button variant='solid'>Space Log</Button>
                </Link>
              ) : (
                <Link href=''>
                  <Button variant='outline'>Login</Button>
                </Link>
              )}
            </Box>
          </HStack>
        </UnorderedList>
        <Box display={{ base: 'block', lg: 'none' }}>
          <Menu strategy='fixed'>
            <MenuButton
              as={Button}
              variant='none'
              padding='0'
              border='1px'
              borderRadius='8px'
            >
              <Image
                src='/images/hamburger.png'
                width='24px'
                margin='auto'
                draggable='false'
                loading='lazy'
              />
            </MenuButton>
            <MenuList
              color='white'
              bgImage='/images/nav-bg.png'
              bgColor='black'
              bgPos='center'
              bgRepeat='no-repeat'
              bgSize='cover'
              border='none'
            >
              <MobLiItem href='/' itemName='About Us' itemIcon={MdAssuredWorkload}/>
              <MobLiItem href='/' itemName='Merchandise' itemIcon={MdShoppingBag}/>
              <MobLiItem href='/' itemName='Interactive Map' itemIcon={MdMap}/>
              <MobLiItem href='/' itemName='Blog' itemIcon={MdNewspaper}/>
              <Box onClick={handleLogin}>
                {isLogin ? 
                (
                  <MobLiItem href='/' itemName='Spacelog' itemIcon={MdRocketLaunch}/>
                ) : (
                  <MobLiItem href='/' itemName='Login' itemIcon={MdLogin}/>
                )}
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Center>
  );
};

export default Navbar;