import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  UnorderedList,
  Text,
  Center,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Icon
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { type ReactNode, useState } from 'react';
import {
  MdAssuredWorkload,
  MdShoppingBag,
  MdMap,
  MdNewspaper,
  MdRocketLaunch,
  MdLogin
} from 'react-icons/md';

const MobLiItem = ({ children }: { children: ReactNode }) => {
  return (
    <MenuItem
      my='4px'
      bg='transparent'
      pos='relative'
      _hover={{
        color: 'yellow.5',
        _after: { height: '100%' }
      }}
      _after={{
        content: '""',
        display: 'block',
        width: '2px',
        background: 'yellow.5',
        position: 'absolute',
        left: 0
      }}
    >
      <HStack spacing={2}>{children}</HStack>
    </MenuItem>
  );
};

const DeskLiItem = ({ children }: { children: ReactNode }) => {
  return (
    <HStack
      pos='relative'
      _hover={{
        color: 'yellow.5',
        transition: 'width 0.3s',
        _after: { width: '100%' }
      }}
      _after={{
        content: '""',
        display: 'block',
        width: 0,
        height: '2px',
        background: 'yellow.5',
        transition: 'width .3s',
        position: 'absolute',
        bottom: 0,
        left: 0
      }}
    >
      <Text>{children}</Text>
    </HStack>
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
          <Image
            src='/images/nav-ekor.png'
            draggable='false'
            loading='lazy'
            alt=''
          />
        </Box>
        <Box zIndex='1000'>
          <Image
            src='/images/nav-logo.svg'
            height={{ base: '38px', lg: '57px' }}
            draggable='false'
            loading='lazy'
            alt=''
          />
        </Box>
        <UnorderedList
          listStyleType='none'
          display={{ base: 'none', lg: 'block' }}
        >
          <HStack spacing={{ lg: '27px', xl: '45px' }}>
            <Link href='/tes'>
              <DeskLiItem>About Us</DeskLiItem>
            </Link>
            <Link href='/'>
              <DeskLiItem>Merchandise</DeskLiItem>
            </Link>
            <Link href='/interactive-map'>
              <DeskLiItem>Interactive Map</DeskLiItem>
            </Link>
            <Link href='/'>
              <DeskLiItem>Blog</DeskLiItem>
            </Link>
            <Box onClick={handleLogin}>
              {isLogin ? (
                <Link href='/'>
                  <Button variant='solid'>Space Log</Button>
                </Link>
              ) : (
                <Link href='/'>
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
                alt=''
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
              <Link href='/tes'>
                <MobLiItem>
                  <Box>
                    <Icon w={6} h={6} as={MdAssuredWorkload} />
                  </Box>
                  <Text>About Us</Text>
                </MobLiItem>
              </Link>
              <Link href='/'>
                <MobLiItem>
                  <Box>
                    <Icon w={6} h={6} as={MdShoppingBag} />
                  </Box>
                  <Text>Merchandise</Text>
                </MobLiItem>
              </Link>
              <Link href='/interactive-map'>
                <MobLiItem>
                  <Box>
                    <Icon w={6} h={6} as={MdMap} />
                  </Box>
                  <Text>Interactive Map</Text>
                </MobLiItem>
              </Link>
              <Link href='/'>
                <MobLiItem>
                  <Box>
                    <Icon w={6} h={6} as={MdNewspaper} />
                  </Box>
                  <Text>Blog</Text>
                </MobLiItem>
              </Link>
              <Box onClick={handleLogin}>
                {isLogin ? (
                  <Link href='/'>
                    <MobLiItem>
                      <Box>
                        <Icon w={6} h={6} as={MdRocketLaunch} />
                      </Box>
                      <Text>Spacelog</Text>
                    </MobLiItem>
                  </Link>
                ) : (
                  <Link href='/'>
                    <MobLiItem>
                      <Box>
                        <Icon w={6} h={6} as={MdLogin} />
                      </Box>
                      <Text>Login</Text>
                    </MobLiItem>
                  </Link>
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
