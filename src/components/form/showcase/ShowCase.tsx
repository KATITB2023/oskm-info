import { Flex, Image } from '@chakra-ui/react';
import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';
import { useEffect, useState } from 'react';

export const ShowCase = () => {
  const [daftarUnit, setDaftarUnit] = useState(true);

  useEffect(() => {
    // TODO: CHANGE THIS SWITCH TIME
    const switchTime = new Date('July 27, 2023 15:21:55');
    const currentTime = new Date();
    if (switchTime > currentTime) {
      setDaftarUnit(false);
    }
  }, []);

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
