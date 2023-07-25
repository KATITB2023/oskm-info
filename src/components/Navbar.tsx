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
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';

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
  const [isLogin, setIsLogin] = useState<Boolean>(false);
  useEffect(() => {}, []);
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
          <Image src='/images/nav-ekor.png' />
        </Box>
        <Box zIndex='1000'>
          <Image
            src='/images/nav-logo.svg'
            height={{ base: '38px', lg: '57px' }}
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
            <Link href='/'>
              <DeskLiItem>Interactive Map</DeskLiItem>
            </Link>
            <Link href='/'>
              <DeskLiItem>Blog</DeskLiItem>
            </Link>
            <Box>
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
              <Image src='/images/hamburger.png' width='24px' margin='auto' />
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
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M6 9.5H4V16.5H6V9.5Z' fill='currentColor' />
                      <path d='M12 9.5H10V16.5H12V9.5Z' fill='currentColor' />
                      <path
                        d='M21 5.5L11 0.5L1 5.5V7.5H21V5.5ZM5.47 5.5L11 2.74L16.53 5.5H5.47Z'
                        fill='currentColor'
                      />
                      <path
                        d='M1 18.5V20.5H13.4C13.19 19.86 13.08 19.19 13.04 18.5H1Z'
                        fill='currentColor'
                      />
                      <path
                        d='M18 11.76V9.5H16V12.76L18 11.76Z'
                        fill='currentColor'
                      />
                      <path
                        d='M19 13.5L15 15.5V18.05C15 20.57 16.71 22.93 19 23.5C21.29 22.93 23 20.57 23 18.05V15.5L19 13.5ZM18.28 20.5L16.25 18.47L17.31 17.41L18.28 18.38L20.69 16L21.75 17.06L18.28 20.5Z'
                        fill='currentColor'
                      />
                    </svg>
                  </Box>
                  <Text>About Us</Text>
                </MobLiItem>
              </Link>
              <Link href='/'>
                <MobLiItem>
                  <Box>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M19 6.5H17C17 3.74 14.76 1.5 12 1.5C9.24 1.5 7 3.74 7 6.5H5C3.9 6.5 3 7.4 3 8.5V20.5C3 21.6 3.9 22.5 5 22.5H19C20.1 22.5 21 21.6 21 20.5V8.5C21 7.4 20.1 6.5 19 6.5ZM12 3.5C13.66 3.5 15 4.84 15 6.5H9C9 4.84 10.34 3.5 12 3.5ZM19 20.5H5V8.5H19V20.5ZM12 12.5C10.34 12.5 9 11.16 9 9.5H7C7 12.26 9.24 14.5 12 14.5C14.76 14.5 17 12.26 17 9.5H15C15 11.16 13.66 12.5 12 12.5Z'
                        fill='currentColor'
                      />
                    </svg>
                  </Box>
                  <Text>Merchandise</Text>
                </MobLiItem>
              </Link>
              <Link href='/'>
                <MobLiItem>
                  <Box>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M20.5 3L20.34 3.03L15 5.1L9 3L3.36 4.9C3.15 4.97 3 5.15 3 5.38V20.5C3 20.78 3.22 21 3.5 21L3.66 20.97L9 18.9L15 21L20.64 19.1C20.85 19.03 21 18.85 21 18.62V3.5C21 3.22 20.78 3 20.5 3ZM10 5.47L14 6.87V18.53L10 17.13V5.47ZM5 6.46L8 5.45V17.15L5 18.31V6.46ZM19 17.54L16 18.55V6.86L19 5.7V17.54Z'
                        fill='currentColor'
                      />
                    </svg>
                  </Box>
                  <Text>Interactive Map</Text>
                </MobLiItem>
              </Link>
              <Link href='/'>
                <MobLiItem>
                  <Box>
                    <svg
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M4 6H2V20C2 21.1 2.9 22 4 22H18V20H4V6ZM20 2H8C6.9 2 6 2.9 6 4V16C6 17.1 6.9 18 8 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H8V4H20V16ZM10 9H18V11H10V9ZM10 12H14V14H10V12ZM10 6H18V8H10V6Z'
                        fill='currentColor'
                      />
                    </svg>
                  </Box>
                  <Text>Blog</Text>
                </MobLiItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Center>
  );
};

export default Navbar;
