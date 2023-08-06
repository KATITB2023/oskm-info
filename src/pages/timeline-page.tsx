import { Box, Heading, Center, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '~/layout';
import Day from '~/components/Day';
import Time from '~/components/Time';

export default function AboutUs() {
  return (
    <Center minH='100vh' position='relative'>
      <Image
        src='/images/timeline-bg.png'
        alt=''
        w='100%'
        h='100%'
        objectFit='cover'
        objectPosition='center'
      />
      <Image
        src='/images/timeline-spark.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='25%'
        top='0'
        left='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-komet.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='20%'
        top='55%'
        left='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-smol1.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='40%'
        top='0'
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-bulan.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='15%'
        top='0'
        right='12%'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-wrwr.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='30%'
        top='35%'
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-glubuk.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w='20%'
        top='55%'
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Text
        fontSize='55px'
        color='#FFFC83'
        position='absolute'
        zIndex='20'
        top='8%'
        left='43%'
        fontFamily='Bodwars'
      >
        OSKM
      </Text>
      <Image
        src='/images/timeline-line.png'
        display={{ base: 'none', md: 'block' }}
        alt=''
        position='absolute'
        w=''
        top='25%'
        left='40%'
        zIndex='10'
        draggable='false'
      />

      <Day date='dd month yyyy' title='Day x - Title' top='25%' />
      <Time time='hh.mm' title='Aktivitas' top='35%' />
      <Time time='hh.mm' title='Aktivitas' top='40%' />

      <Day date='dd month yyyy' title='Day x - Title' top='50%' />
      <Time time='hh.mm' title='Aktivitas' top='60%' />
      <Time time='hh.mm' title='Aktivitas' top='65%' />
    </Center>
  );
}
