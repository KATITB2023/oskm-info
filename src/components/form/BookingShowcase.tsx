import { Flex, Image } from '@chakra-ui/react';
import { BookingShowcaseForm } from './BookingShowcaseForm';

export const BookingShowcase = () => (
  <Flex
    backgroundImage='/images/bg-coming-soon.png'
    backgroundSize='cover'
    backgroundPosition='center'
    backgroundRepeat='no-repeat'
    minH='100vh'
    alignItems='center'
    justifyContent='center'
    position='relative'
    px={5}
  >
    <Image
      src='/images/spark.png'
      alt=''
      position='absolute'
      w='30%'
      top='0'
      left='0'
      zIndex='0'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/spark3.png'
      alt=''
      position='absolute'
      w='10%'
      bottom='10%'
      right='35%'
      zIndex='0'
      draggable='false'
      loading='lazy'
    />
    <Image
      src='/images/ornamen.png'
      alt=''
      position='absolute'
      w='30%'
      top='5%'
      right='0'
      zIndex='1'
      draggable='false'
      loading='lazy'
    />
    <BookingShowcaseForm />
  </Flex>
);
