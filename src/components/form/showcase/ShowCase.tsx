import { Flex, Image } from '@chakra-ui/react';
import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';

export const ShowCase = () => {
  const daftarUnit =
    new Date('Aug 6, 2023 23:59:59 GMT+0700').getTime() > new Date().getTime();

  return (
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
      {daftarUnit ? <FirstForm /> : <SecondForm />}
    </Flex>
  );
};
