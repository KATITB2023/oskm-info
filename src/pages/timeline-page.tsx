import { Box, Heading, Center, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '~/layout';
import Day from '~/components/Day';
import Time from '~/components/Time';

export default function AboutUs() {
  return (
    <Center minH='100vh' position='relative'>
      <Image
        display={{ base: 'none', lg: 'block' }}
        src='/images/timeline-long-bg2.png'
        alt=''
        w='100%'
        h='100%'
        objectFit='cover'
        objectPosition='center'
      />
      <Image
        display={{ base: 'block', lg: 'none' }}
        src='/images/timeline-long-bg.png'
        alt=''
        w='100%'
        h='100%'
        objectFit='cover'
        objectPosition='center'
      />
      <Image
        src='/images/timeline-spark.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '35%', lg: '25%' }}
        top={{ base: '10%', lg: '20%' }}
        left='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-komet.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '30%', lg: '20%' }}
        top={{ base: '91%', lg: '75%' }}
        left='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-smol1.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '50%', lg: '40%' }}
        top='0'
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-bulan.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '20%', lg: '15%' }}
        top='0'
        right='12%'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-wrwr.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '40%', lg: '30%' }}
        top='35%'
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Image
        src='/images/timeline-glubuk.png'
        alt=''
        position='absolute'
        display={{ base: 'block', md: 'block' }}
        w={{ base: '28%', lg: '20%' }}
        top={{ base: '38.5%', lg: '40%' }}
        right='0'
        zIndex='10'
        draggable='false'
      />
      <Text
        fontSize={{ base: '3xl', lg: '6xl' }}
        color='#FFFC83'
        position='absolute'
        zIndex='20'
        top={{ base: '3%', lg: '3%' }}
        textAlign='center'
        fontFamily='Bodwars'
      >
        OSKM
      </Text>

      <Flex
        alignItems='center'
        position='absolute'
        zIndex='20'
        draggable='false'
        top={{ base: '8%', lg: '8%' }}
        left={{ base: '35%', lg: '40%' }}
      >
        <Image
          src='/images/timeline-line.png'
          alt=''
          position='absolute'
          w={{ base: '10%', lg: '15%' }}
          left={{ base: '25%', lg: '45%' }}
          top={{ base: '18%', lg: '8%' }}
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/timeline-line.png'
          alt=''
          position='absolute'
          w={{ base: '10%', lg: '15%' }}
          left={{ base: '25%', lg: '45%' }}
          top={{ base: '18%', lg: '2500%' }}
          zIndex='10'
          draggable='false'
        />
        <Image
          src='/images/timeline-line.png'
          alt=''
          position='absolute'
          w={{ base: '10%', lg: '15%' }}
          left={{ base: '25%', lg: '45%' }}
          top={{ base: '2450%', lg: '2750%' }}
          zIndex='10'
          draggable='false'
        />
        <Box>
          <Image
            src='/images/timeline-bigO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '60%', lg: '100%' }}
            transform='translate(0%, 0%)'
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '70%', lg: '160%' }}
            position='absolute'
            left={{ base: '-230%', lg: '-520%' }}
            top={{ base: '20%', lg: '0' }}
            color='#FFFC83'
          >
            16 Agustus 2023
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '100%', lg: '160%' }}
            position='absolute'
            left={{ base: '90%', lg: '180%' }}
            top={{ base: '5%', lg: '0' }}
            color='#FFFC83'
          >
            DAY 1
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='180%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='180%'
            color='#FFFC83'
          >
            12.45
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='180%'
            color='#FFFC83'
          >
            Open Gate
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='320%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='320%'
            color='#FFFC83'
          >
            13.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='320%'
            color='#FFFC83'
          >
            Opening Ceremony
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='460%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='460%'
            color='#FFFC83'
          >
            14.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='460%'
            color='#FFFC83'
          >
            Opening Performance
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='600%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='600%'
            color='#FFFC83'
          >
            15.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='600%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='740%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='740%'
            color='#FFFC83'
          >
            15.45
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='740%'
            color='#FFFC83'
          >
            Talkshow 1: Tentang ITB dan KM ITB
          </Text>

          <Image
            src='/images/timeline-bigO.png'
            alt='Gambar'
            position='relative'
            w={{ base: '60%', lg: '100%' }}
            top='920%'
            transform='translate(5%, 920%)'
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '70%', lg: '160%' }}
            position='absolute'
            left={{ base: '-230%', lg: '-520%' }}
            top='930%'
            color='#FFFC83'
          >
            17 Agustus 2023
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '100%', lg: '160%' }}
            position='absolute'
            left={{ base: '90%', lg: '180%' }}
            top='920%'
            color='#FFFC83'
          >
            DAY 2
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1100%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1100%'
            color='#FFFC83'
          >
            07.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1100%'
            color='#FFFC83'
          >
            Upacara Kemerdekaan Indonesia
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1240%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1240%'
            color='#FFFC83'
          >
            09.30
          </Text>
          <Text
            whiteSpace='nowrap'
            display={{ base: 'block', lg: 'none' }}
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1240%'
            color='#FFFC83'
          >
            Talkshow 2: Tentang Bangsa, Perguruan<br></br>tinggi, dan Mahasiswa
            Sesi 1
          </Text>
          <Text
            whiteSpace='nowrap'
            display={{ base: 'none', lg: 'block' }}
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1240%'
            color='#FFFC83'
          >
            Talkshow 2: Tentang Bangsa, Perguruan tinggi, dan Mahasiswa Sesi 1
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1380%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1380%'
            color='#FFFC83'
          >
            10.50
          </Text>
          <Text
            display={{ base: 'block', lg: 'none' }}
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1380%'
            color='#FFFC83'
          >
            Talkshow 2: Tentang Bangsa, Perguruan<br></br>tinggi, dan Mahasiswa
            Sesi 2
          </Text>
          <Text
            display={{ base: 'none', lg: 'block' }}
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1380%'
            color='#FFFC83'
          >
            Talkshow 2: Tentang Bangsa, Perguruan tinggi, dan Mahasiswa Sesi 2
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1520%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1520%'
            color='#FFFC83'
          >
            12.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1520%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1660%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1660%'
            color='#FFFC83'
          >
            13.00
          </Text>
          <Text
            display={{ base: 'blcok', lg: 'none' }}
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1660%'
            color='#FFFC83'
          >
            Mentoring 1 : Tentang Bangsa, Perguruan<br></br>tinggi, dan
            Mahasiswa
          </Text>
          <Text
            display={{ base: 'none', lg: 'block' }}
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1660%'
            color='#FFFC83'
          >
            Mentoring 1 : Tentang Bangsa, Perguruan tinggi, dan Mahasiswa
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1800%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1800%'
            color='#FFFC83'
          >
            14.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1800%'
            color='#FFFC83'
          >
            Treasure Hunt
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='1940%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='1940%'
            color='#FFFC83'
          >
            14.45
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='1940%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='2080%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='2080%'
            color='#FFFC83'
          >
            16.20
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='2080%'
            color='#FFFC83'
          >
            Interfak
          </Text>

          <Image
            src='/images/timeline-bigO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '60%', lg: '100%' }}
            top='750%'
            transform='translate(5%, 1500%)'
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '70%', lg: '160%' }}
            position='absolute'
            left={{ base: '-230%', lg: '-520%' }}
            top='2260%'
            color='#FFFC83'
          >
            18 Agustus 2023
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '100%', lg: '160%' }}
            position='absolute'
            left={{ base: '90%', lg: '180%' }}
            top='2260%'
            color='#FFFC83'
          >
            DAY 3
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='2460%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='2460%'
            color='#FFFC83'
          >
            06.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='2460%'
            color='#FFFC83'
          >
            Open Gate
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='2600%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='2600%'
            color='#FFFC83'
          >
            08.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='2600%'
            color='#FFFC83'
          >
            Defile Unit
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='2740%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='2740%'
            color='#FFFC83'
          >
            08.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='2740%'
            color='#FFFC83'
          >
            Talkshow 3: Tentang Diri
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='2880%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='2880%'
            color='#FFFC83'
          >
            11.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='2880%'
            color='#FFFC83'
          >
            Mentoring 2: Tentang Diri
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3020%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3020%'
            color='#FFFC83'
          >
            11.50
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3020%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3160%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3160%'
            color='#FFFC83'
          >
            13.10
          </Text>
          <Text
            whiteSpace='nowrap'
            display={{ base: 'none', lg: 'block' }}
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3160%'
            color='#FFFC83'
          >
            Mentoring #: Identitas Mahasiswa dan PoPoPe
          </Text>
          <Text
            whiteSpace='nowrap'
            display={{ base: 'block', lg: 'none' }}
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3160%'
            color='#FFFC83'
          >
            Mentoring #: Identitas Mahasiswa dan<br></br>PoPoPe
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3300%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3300%'
            color='#FFFC83'
          >
            13.55
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3300%'
            color='#FFFC83'
          >
            Mentoring 4: Organisasi dan Kaderisasi
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3440%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3440%'
            color='#FFFC83'
          >
            15.10
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3440%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3580%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3580%'
            color='#FFFC83'
          >
            15.40
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3580%'
            color='#FFFC83'
          >
            Mentoring Agama
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='3720%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='3720%'
            color='#FFFC83'
          >
            17.10
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='3720%'
            color='#FFFC83'
          >
            Treasure Hunt
          </Text>

          <Image
            src='/images/timeline-bigO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '60%', lg: '100%' }}
            top='750%'
            transform='translate(5%, 3150%)'
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '70%', lg: '160%' }}
            position='absolute'
            left={{ base: '-230%', lg: '-520%' }}
            top='3910%'
            color='#FFFC83'
          >
            19 Agustus 2023
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '100%', lg: '160%' }}
            position='absolute'
            left={{ base: '90%', lg: '180%' }}
            top='3910%'
            color='#FFFC83'
          >
            DAY 4
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4100%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4100%'
            color='#FFFC83'
          >
            13.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4100%'
            color='#FFFC83'
          >
            Lorong Massa
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4240%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4240%'
            color='#FFFC83'
          >
            14.30
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4240%'
            color='#FFFC83'
          >
            Performance Warna-Warni
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4380%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4380%'
            color='#FFFC83'
          >
            15.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4380%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4520%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4520%'
            color='#FFFC83'
          >
            15.00
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4520%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4660%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4660%'
            color='#FFFC83'
          >
            15.45
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4660%'
            color='#FFFC83'
          >
            Orasi Danlap
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4800%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4800%'
            color='#FFFC83'
          >
            16.10
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4800%'
            color='#FFFC83'
          >
            Pawai Pelangi
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='4940%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='4940%'
            color='#FFFC83'
          >
            16.55
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='4940%'
            color='#FFFC83'
          >
            Orasi Pelangi
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='5080%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='5080%'
            color='#FFFC83'
          >
            17.55
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='5080%'
            color='#FFFC83'
          >
            ISHOMA
          </Text>

          <Image
            src='/images/timeline-smallO.png'
            alt='Gambar'
            position='absolute'
            w={{ base: '30%', lg: '50%' }}
            top='5220%'
            left={{ base: '15%', lg: '30%' }}
          />
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '-80%', lg: '-200%' }}
            top='5220%'
            color='#FFFC83'
          >
            18.25
          </Text>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '60%', lg: '110%' }}
            position='absolute'
            left={{ base: '80%', lg: '180%' }}
            top='5220%'
            color='#FFFC83'
          >
            Closing Ceremony
          </Text>
        </Box>
      </Flex>
    </Center>
  );
}
