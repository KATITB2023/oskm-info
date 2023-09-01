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
  Icon,
  type As,
  Avatar
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import {
  MdAssuredWorkload,
  MdShoppingBag,
  MdMap,
  MdNewspaper,
  MdRocketLaunch,
  MdLogin,
  MdLogout
} from "react-icons/md";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut, useSession } from "next-auth/react";

interface LiItemProps {
  href: string;
  itemName: string;
  itemIcon?: As;
  isExternal?: boolean;
  onClick?: () => void;
}

const MobLiItem = ({
  href,
  itemIcon,
  itemName,
  isExternal = false,
  onClick
}: LiItemProps) => {
  const router = useRouter();
  const activeRoute = (routeName: string) => {
    return router.pathname.includes(routeName) && itemName !== "Logout";
  };

  return (
    <Link href={href} target={isExternal ? "_blank" : "_self"}>
      <MenuItem
        my='4px'
        bg='transparent'
        pos='relative'
        color={activeRoute(href) ? "yellow.5" : "#ffffff"}
        _hover={{
          color: "yellow.5",
          _after: { height: "100%" }
        }}
        _after={{
          content: '""',
          display: "block",
          width: "2px",
          height: activeRoute(href) ? "100%" : 0,
          background: "yellow.5",
          position: "absolute",
          left: 0
        }}
        onClick={onClick}
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
        color={activeRoute(href) ? "yellow.5" : "#ffffff"}
        _hover={{
          color: "yellow.5",
          transition: "width 0.3s",
          _after: { width: "100%" }
        }}
        _after={{
          content: '""',
          display: "block",
          width: activeRoute(href) ? "100%" : 0,
          height: "2px",
          background: "yellow.5",
          transition: "width .3s",
          position: "absolute",
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
  const { data: session } = useSession();
  const isLogin = session?.user;

  return (
    <Center>
      <Flex
        mt='1rem'
        px={{ base: "3rem", lg: "5rem" }}
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
        zIndex='200'
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
        <Box zIndex='200'>
          <Link href='/'>
            <HStack>
              <Image
                src='/images/logo-oskm.png'
                height={{ base: "38px", lg: "57px" }}
                draggable='false'
                loading='lazy'
                alt='logo'
              />
              <Image
                src='/images/nav-logo.svg'
                height={{ base: "38px", lg: "57px" }}
                draggable='false'
                loading='lazy'
                alt='logo-teks'
              />
            </HStack>
          </Link>
        </Box>
        <UnorderedList
          listStyleType='none'
          display={{ base: "none", lg: "block" }}
        >
          <HStack spacing={{ lg: "27px", xl: "45px" }}>
            <DeskLiItem href='/about-us' itemName='About Us' />
            <DeskLiItem href='/merch' itemName='Merchandise' />
            <DeskLiItem href='/interactive-map' itemName='Interactive Map' />
            <DeskLiItem href='/showcase-map/festival' itemName='Festival Map' />
            <DeskLiItem href='/showcase-map/pengmas' itemName='Pengmas Map' />
            <DeskLiItem href='/blog' itemName='Blog' />
            {isLogin ? (
              <Menu strategy='fixed'>
                <MenuButton
                  as={Button}
                  variant='none'
                  padding='0'
                  _hover={{
                    color: "yellow.5"
                  }}
                  _active={{
                    color: "yellow.5"
                  }}
                >
                  <Avatar
                    name={session?.user?.name as string}
                    _hover={{
                      opacity: 0.8
                    }}
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
                  <MobLiItem
                    href='https://app.oskmitb.com'
                    itemName='Spacelog'
                    itemIcon={MdRocketLaunch}
                  />
                  <MobLiItem
                    href='/'
                    itemName='Logout'
                    itemIcon={MdLogout}
                    onClick={() =>
                      void signOut({
                        callbackUrl: "/"
                      })
                    }
                  />
                </MenuList>
              </Menu>
            ) : (
              <>
                <Link href='https://app.oskmitb.com' target='_blank'>
                  <Button variant='solid'>Space Log</Button>
                </Link>
                <Link href='/login'>
                  <Button variant='outline'>Login</Button>
                </Link>
              </>
            )}
          </HStack>
        </UnorderedList>
        <Box display={{ base: "block", lg: "none" }}>
          <Menu strategy='fixed'>
            <MenuButton
              as={Button}
              variant='none'
              padding='0'
              border='1px'
              borderRadius='8px'
              _hover={{
                color: "yellow.5"
              }}
              _active={{
                color: "yellow.5"
              }}
            >
              <Box display='flex' alignItems='center' justifyContent='center'>
                <RxHamburgerMenu size={24} />
              </Box>
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
              <MobLiItem
                href='/about-us'
                itemName='About Us'
                itemIcon={MdAssuredWorkload}
              />
              <MobLiItem
                href='/merch'
                itemName='Merchandise'
                itemIcon={MdShoppingBag}
              />
              <MobLiItem
                href='/interactive-map'
                itemName='Interactive Map'
                itemIcon={MdMap}
              />
              <MobLiItem
                href='/showcase-map/festival'
                itemName='Festival Map'
                itemIcon={MdMap}
              />
              <MobLiItem
                href='/showcase-map/pengmas'
                itemName='Pengmas Map'
                itemIcon={MdMap}
              />
              <MobLiItem href='/blog' itemName='Blog' itemIcon={MdNewspaper} />
              <MobLiItem
                href='https://app.oskmitb.com'
                itemName='Spacelog'
                itemIcon={MdRocketLaunch}
                isExternal
              />
              {isLogin ? (
                <MobLiItem
                  href='/'
                  itemName='Logout'
                  itemIcon={MdLogout}
                  onClick={() =>
                    void signOut({
                      callbackUrl: "/"
                    })
                  }
                />
              ) : (
                <MobLiItem href='/login' itemName='Login' itemIcon={MdLogin} />
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Center>
  );
};

export default Navbar;
