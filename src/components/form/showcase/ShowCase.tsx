import { Button, Flex, Image } from '@chakra-ui/react';
import { FirstForm } from './FirstForm';
import { SecondForm } from './SecondForm';
import { useState } from 'react';

export const ShowCase = () => {
  const [daftarUnit, setDaftarUnit] = useState(true);

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
      <Flex direction={'column'} rowGap={'1rem'}>
        <Flex
          borderWidth={'3px'}
          borderColor={'black'}
          borderRadius={'50px'}
          w={{ base: '80%', lg: '700px' }}
          columnGap={'0.5rem'}
        >
          <Button
            color={daftarUnit ? undefined : 'white'}
            width={'50%'}
            borderRadius={'50px'}
            backgroundColor={daftarUnit ? '' : 'transparent'}
            onClick={() => setDaftarUnit(true)}
          >
            Daftar Unit
          </Button>
          <Button
            color={daftarUnit ? 'white' : undefined}
            width={'50%'}
            borderRadius={'50px'}
            backgroundColor={daftarUnit ? 'transparent' : ''}
            onClick={() => setDaftarUnit(false)}
          >
            Ambil Lokasi
          </Button>
        </Flex>
        {daftarUnit ? <FirstForm /> : <SecondForm />}
      </Flex>
    </Flex>
  );
};
