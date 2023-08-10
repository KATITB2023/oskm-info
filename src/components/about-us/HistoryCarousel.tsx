import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  HStack,
  Heading,
  Text,
  Button,
  Flex,
  Show,
  Hide,
  Fade,
  Image,
  Icon
} from '@chakra-ui/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
import { useState } from 'react';
import { colors } from '~/styles/component/colors';
import { CgClose } from 'react-icons/cg';
import { Dots } from './Dots';

interface Era {
  title: string;
  preview?: string;
  text: string;
}

const history: Era[] = [
  {
    title: 'SEBELUM 2000-AN',
    preview:
      'Pada era ini, OSKM ITB merupakan ajang kaderisasi terpusat yang kental dengan agenda-agenda pergerakan.',
    text: 'Pada era ini, OSKM ITB merupakan ajang kaderisasi terpusat yang kental dengan agenda-agenda pergerakan sesuai dengan kondisi ekonomi sosial politik pada zaman itu.'
  },
  {
    title: 'TAHUN 2000',
    preview:
      'Muncul permasalahan terkait legalitas OSKM karena adanya pandangan bahwa kaderisasi di OSKM ITB mengandung unsur kekerasan.',
    text: 'Muncul permasalahan terkait legalitas OSKM karena adanya pandangan bahwa kaderisasi di OSKM ITB mengandung unsur kekerasan. Sehingga, penyelenggaraan OSKM ITB ilegal dan kehadiran peserta sangat minim.'
  },
  {
    title: 'TAHUN 2002',
    preview:
      'Pada tahun ini, OSKM ITB pun akhirnya dilegalkan dengan beberapa perubahan.',
    text: 'Pada tahun ini, OSKM ITB pun akhirnya dilegalkan dengan beberapa perubahan seperti peniadaan acara swasta dan pendekatan kekerasan yang diganti dengan pendekatan disiplin.'
  },
  {
    title: 'TAHUN 2005',
    preview: 'OSKM kembali di bawah bayang-bayang permasalahan legalitas.',
    text: 'OSKM kembali di bawah bayang-bayang permasalahan legalitas.'
  },
  {
    title: 'TAHUN 2006',
    preview:
      'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Pengenalan Satuan Akademik dan Kemahasiswaan (PSAK) ITB.',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Pengenalan Satuan Akademik dan Kemahasiswaan (PSAK) ITB.\n\nOSKM dilakukan secara ilegal dan hanya diikuti 136 mahasiswa. Ancaman DO pun menghantui Ketua Kabinet pada saat itu, Ketua OSKM, dan peserta yang mengikutinya.'
  },
  {
    title: 'TAHUN 2007',
    preview:
      'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Penerimaan Mahasiswa Baru (PMB) ITB.',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Penerimaan Mahasiswa Baru (PMB) ITB.\n\nOSKM dilegalkan kembali dengan perubahan konsep dan metode karena pertimbangan agar angkatan 2007 dapat berinteraksi dengan seniornya.'
  },
  {
    title: 'TAHUN 2009',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Pengenalan Ruang dan Orientasi KM (PROKM) ITB.'
  },
  {
    title: 'TAHUN 2010',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Inisiasi Keluarga Mahasiswa (INKM) ITB.'
  },
  {
    title: 'TAHUN 2014',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "Simfoni Pergerakan Untuk Indonesia".'
  },
  {
    title: 'TAHUN 2015',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "OSKM ITB 2015 sebagai penyadaran akan identitas insan akademis masa depan bangsa".'
  },
  {
    title: 'TAHUN 2016',
    preview:
      'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Inisiasi Terpusat Keluarga Mahasiswa (INTEGRASI) ITB.',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Inisiasi Terpusat Keluarga Mahasiswa (INTEGRASI) ITB dengan membawakan visi "KAT ITB 2016 yang melahirkan perintis gerakan berdasarkan empati".'
  },
  {
    title: 'TAHUN 2017',
    preview:
      'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Orientasi Studi Keluarga Mahasiswa (OSKM) ITB.',
    text: 'Pada tahun ini, acara penerimaan mahasiswa baru pada KM ITB diselenggarakan dengan nama Orientasi Studi Keluarga Mahasiswa (OSKM) ITB dengan membawakan visi "Mewujudkan mozaik pergerakan untuk Indonesia".'
  },
  {
    title: 'TAHUN 2018',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "Sebagai sarana inisiasi pembentuk mahasiswa nirmala pemrakarsa pembangunan bangsa".'
  },
  {
    title: 'TAHUN 2019',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "OSKM ITB 2019 sebagai sarana inisiasi semangat bermimpi untuk Indonesia".'
  },
  {
    title: 'TAHUN 2020',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "Terciptanya mahasiswa dengan keunikannya masing-masing senantiasa mendefinisikan perannya dan bertanggung jawab terhadap peran tersebut".'
  },
  {
    title: 'TAHUN 2021',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "KAT ITB sebagai ruang inspirasi bernavigasi budaya dalam mewujudkan kesadaran berkontribusi untuk Indonesia".'
  },
  {
    title: 'TAHUN 2022',
    text: 'Pada tahun ini, OSKM ITB diselenggarakan dengan dengan membawakan visi "Sarana Inisiasi Perubahan Progresif sebagai langkah awal membangun bangsa".'
  }
];

const getPrevIdx = (currIdx: number) => {
  if (currIdx === 0) return history.length - 1;
  return currIdx - 1;
};

const getNextIdx = (currIdx: number) => {
  if (currIdx === history.length - 1) return 0;
  return currIdx + 1;
};

export default function HistoryCarousel(props: {
  isPreview: boolean;
  setIsPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const top = useBreakpointValue({ base: '90%', md: '47%' });
  const side = useBreakpointValue({ base: '30%', md: '17%' });

  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev: number, next: number) => {
      setCurrentSlide(next);
    }
  };

  return (
    <Box>
      <Flex
        justifyContent='center'
        pb={props.isPreview ? '75px' : '30px'}
        pt={{ base: '400px', md: props.isPreview ? '500px' : '400px' }}
        px='20%'
      >
        <Fade in={true} transition={{ enter: { duration: 1 } }}>
          <Heading
            size={{ base: 'xl', md: '3xl' }}
            color='yellow.5'
            textShadow={`0px 0px 10px ${colors.green[3]}`}
            textAlign='center'
          >
            SEJARAH OSKM
          </Heading>
        </Fade>
      </Flex>
      <Box position='relative' width='full'>
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
        />
        <link
          rel='stylesheet'
          type='text/css'
          href='https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
        />
        {props.isPreview ? null : (
          <Show above='md'>
            <IconButton
              aria-label='left-arrow'
              variant='ghost'
              position='absolute'
              left={side}
              top={top}
              transform={'translate(0%, -50%)'}
              zIndex={2}
              onClick={() => slider?.slickPrev()}
              borderRadius='full'
              bg='yellow.5'
              color='navy.4'
              _hover={{ boxShadow: `0px 0px 10px ${colors.green[3]}` }}
            >
              <BiChevronLeft size='40px' />
            </IconButton>
            <IconButton
              aria-label='right-arrow'
              variant='ghost'
              position='absolute'
              right={side}
              top={top}
              transform={'translate(0%, -50%)'}
              zIndex={2}
              onClick={() => slider?.slickNext()}
              borderRadius='full'
              bg='yellow.5'
              color='navy.4'
              _hover={{ boxShadow: `0px 0px 10px ${colors.green[3]}` }}
            >
              <BiChevronRight size='40px' />
            </IconButton>
          </Show>
        )}
        <Slider
          {...settings}
          // autoplay={props.isPreview}
          autoplay={false}
          ref={(slider) => setSlider(slider)}
        >
          {history.map((era, index) => (
            <Box key={index} w='100vw' display='flex'>
              <HStack spacing='0' alignItems='flex-end' justifyContent='center'>
                <Show above='md'>
                  <Box
                    opacity='70%'
                    pb={props.isPreview ? 0 : '50px'}
                    // bg='pink'
                    w='25%'
                    minW='25%'
                    maxW='25%'
                    px='7%'
                  >
                    <Heading
                      textAlign='center'
                      color='yellow.5'
                      textShadow={`0px 2.8px 2.8px ${colors.green[1]}`}
                      size='md'
                    >
                      {history[getPrevIdx(index)]?.title}
                    </Heading>
                  </Box>
                </Show>
                {props.isPreview ? (
                  <Flex
                    flexDirection='column'
                    justifyContent='center'
                    alignItems='center'
                    pb='30px'
                    px={{ base: '12%', md: '0' }}
                    // bg='red'
                    w={{ base: '100%', md: '50%' }}
                    maxW={{ base: '100%', md: '50%' }}
                    minW={{ base: '100%', md: '50%' }}
                  >
                    <Heading
                      fontSize={{ base: '2xl', md: '4xl' }}
                      textAlign='center'
                      color='yellow.5'
                      textShadow={`0px 2.8px 2.8px ${colors.green[1]}`}
                      // bg='green'
                    >
                      {era.title}
                    </Heading>
                    <Box w='100%'>
                      <Text
                        fontSize={{ base: 'md', lg: 'lg' }}
                        textAlign='center'
                        color='white'
                        textShadow={`0px 0px 10px ${colors.yellow[5]}`}
                        pb='30px'
                        pt='35px'
                      >
                        {era.preview ? era.preview : era.text}
                      </Text>
                    </Box>
                    <Box zIndex='10'>
                      <Button
                        onClick={() => props.setIsPreview(false)}
                        bg='gray.600'
                        color='yellow.5'
                        variant='outline'
                      >
                        Read More
                      </Button>
                    </Box>
                  </Flex>
                ) : (
                  <Box
                    w='50%'
                    maxW={{ base: '100%', md: '50%' }}
                    minW={{ base: '100%', md: '50%' }}
                  >
                    <Fade in={true} transition={{ enter: { duration: 1 } }}>
                      <Box
                        justifyContent='center'
                        bgGradient={{
                          base: 'linear(to-br, rgba(255,255,255,0.1), rgba(255,255,255,0.5))',
                          md: 'linear(to-br, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                        }}
                        pb='90px'
                        pt='70px'
                        px='60px'
                        borderRadius='10px'
                        boxShadow={`0px 0px 10px ${colors.yellow[5]}`}
                        outline={`1px solid ${colors.yellow[5]}`}
                        position='relative'
                      >
                        <Heading
                          fontSize={{ base: '2xl', md: '4xl' }}
                          textAlign='center'
                          color='yellow.5'
                          textShadow={`0px 2.8px 2.8px ${colors.green[1]}`}
                          pb='30px'
                        >
                          {era.title}
                        </Heading>
                        <Text
                          textAlign='center'
                          color='white'
                          textShadow={`0px 4px 6px ${colors.green[1]}`}
                          whiteSpace='pre-line'
                        >
                          {era.text}
                        </Text>
                        <Button
                          position='absolute'
                          right='18px'
                          top='18px'
                          bg='transparent'
                          opacity='0.5'
                          _hover={{
                            bg: 'transparent',
                            opacity: '0.8'
                          }}
                          onClick={() => props.setIsPreview(true)}
                          borderRadius='full'
                          p='0'
                          zIndex='3'
                        >
                          <Icon
                            as={CgClose}
                            width='30px'
                            height='30px'
                            color='yellow.5'
                          ></Icon>
                        </Button>
                        <Image
                          src='/images/about-us/spark-edge.png'
                          top={{
                            base: 'calc(100% - 100px)',
                            md: 'calc(100% - 125px)'
                          }}
                          left={{
                            base: 'calc(100% - 100px)',
                            md: 'calc(100% - 125px)'
                          }}
                          zIndex='2'
                          width={{ base: '200px', md: '250px' }}
                          position='absolute'
                          draggable='false'
                          loading='lazy'
                        />
                      </Box>
                    </Fade>
                  </Box>
                )}
                <Show above='md'>
                  <Box
                    opacity='70%'
                    px='7%'
                    w='25%'
                    minW='25%'
                    maxW='25%'
                    pb={props.isPreview ? 0 : '50px'}
                    // bg='pink'
                  >
                    <Heading
                      textAlign='center'
                      color='yellow.5'
                      textShadow={`0px 2.8px 2.8px ${colors.green[1]}`}
                      size='md'
                    >
                      {history[getNextIdx(index)]?.title}
                    </Heading>
                  </Box>
                </Show>
              </HStack>
              <Hide above='md'>
                <Dots currentSlide={currentSlide} len={history.length} />
              </Hide>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
