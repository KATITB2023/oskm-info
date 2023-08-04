import {
  Box,
  Flex,
  Image,
  Grid,
  GridItem,
  Text,
  Stack,
  Button
} from '@chakra-ui/react';
import Navbar from '../Navbar';

export default function Jumbotron() {
  return (
    <Flex
      minH='100dvh'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      flexDirection='column'
      alignItems={'center'}
      padding={'100px 0 0 0'}
    >
      <Navbar></Navbar>
      <Image
        src='/images/coming-soon.png'
        draggable='false'
        loading='lazy'
        height={{ base: '50%', md: '25%' }}
        width={{ base: '50%', md: '25%' }}
        margin={'10% 0 10px 0'}
        zIndex='10'
      ></Image>
      <Image
        src='/images/oskm-logo.png'
        draggable='false'
        loading='lazy'
        height={{ base: '50%', md: '30%' }}
        width={{ base: '50%', md: '30%' }}
        zIndex='10'
      ></Image>
      <Flex fontSize={{ base: '5vw', md: '3vw' }} padding={'10px 0 15px 0'}>
        <Grid
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(4, 1fr)'
          gap={{ base: '4vw', md: '2vw' }}
          padding={'0 100px 0 100px'}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Flex flexDir={'column'}>
              <Text
                fontSize={{ base: '4vw', md: '2vw' }}
                alignSelf={'center'}
                fontWeight={700}
                color={'#FFFC83'}
              >
                00
              </Text>
              <Text
                fontSize={{ base: '1.5vw', md: '1vw' }}
                alignSelf={'center'}
                fontWeight={400}
                color={'#72D8BA'}
              >
                DAY
              </Text>
            </Flex>
          </GridItem>
          <GridItem rowSpan={2} colSpan={1}>
            <Flex flexDir={'column'}>
              <Text
                fontSize={{ base: '4vw', md: '2vw' }}
                alignSelf={'center'}
                fontWeight={700}
                color={'#FFFC83'}
              >
                00
              </Text>
              <Text
                fontSize={{ base: '1.5vw', md: '1vw' }}
                alignSelf={'center'}
                fontWeight={400}
                color={'#72D8BA'}
              >
                HOURS
              </Text>
            </Flex>{' '}
          </GridItem>
          <GridItem rowSpan={2} colSpan={1}>
            <Flex flexDir={'column'}>
              <Text
                fontSize={{ base: '4vw', md: '2vw' }}
                alignSelf={'center'}
                fontWeight={700}
                color={'#FFFC83'}
              >
                00
              </Text>
              <Text
                fontSize={{ base: '1.5vw', md: '1vw' }}
                alignSelf={'center'}
                fontWeight={400}
                color={'#72D8BA'}
              >
                MINUTES
              </Text>
            </Flex>
          </GridItem>
          <GridItem rowSpan={2} colSpan={1}>
            <Flex flexDir={'column'}>
              <Text
                fontSize={{ base: '4vw', md: '2vw' }}
                alignSelf={'center'}
                fontWeight={700}
                color={'#FFFC83'}
              >
                00
              </Text>
              <Text
                fontSize={{ base: '1.5vw', md: '1vw' }}
                alignSelf={'center'}
                fontWeight={400}
                color={'#72D8BA'}
              >
                SECONDS
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
      <Stack direction={'row'} spacing={{ base: 2, md: 4 }}>
        <Button
          height={{ base: '5vw', md: '3.5vw' }}
          width={{ base: '15vw', md: '12vw' }}
          borderColor='#FFFC83'
          backgroundColor='#FFFC83'
          color={'#1D0263'}
          fontSize={{ base: '1.5vw', md: '1.2vw' }}
          borderWidth={1}
          borderRadius={{ base: '6px', md: '12px' }}
        >
          Explore Now!
        </Button>
        <Button
          height={{ base: '5vw', md: '3.5vw' }}
          width={{ base: '28vw', md: '18vw' }}
          borderColor='#FFFC83'
          backgroundColor='#1D0263'
          color={'#FFFC83'}
          fontSize={{ base: '1.5vw', md: '1.2vw' }}
          borderWidth={1}
          _hover={{ color: '#1D0263', backgroundColor: '#FFFC83' }}
          borderRadius={{ base: '6px', md: '12px' }}
        >
          Download Guidebook
        </Button>
      </Stack>
    </Flex>
  );
}
