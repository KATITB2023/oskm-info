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

interface Era {
  title: string;
  preview: string;
  text: string;
}

const history: Era[] = [
  {
    title: 'PERIODE 2000AN',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'PERIODE 2010AN',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: 'PERIODE 2020AN',
    preview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '17%' });

  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function (i: number) {
      return (
        <Hide above='md'>
          <Box
            borderRadius='full'
            bg='yellow.5'
            opacity={i === currentSlide ? 1 : 0.5}
            w='15px'
            h='15px'
            boxShadow={`0px 0px 10px ${colors.green[3]}`}
          ></Box>
        </Hide>
      );
    },
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
          autoplay={props.isPreview}
          ref={(slider) => setSlider(slider)}
        >
          {history.map((era, index) => (
            <Box key={index}>
              <HStack spacing={6} alignItems='flex-end'>
                <Show above='md'>
                  <Box opacity='70%' px='7%' pb={props.isPreview ? 0 : '50px'}>
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
                  <Fade in={true} transition={{ enter: { duration: 1 } }}>
                    <Flex
                      flexDirection='column'
                      justifyContent='center'
                      alignItems='center'
                      pb='30px'
                      px={{ base: '12%', md: '0' }}
                    >
                      <Heading
                        fontSize={{ base: '2xl', md: '4xl' }}
                        textAlign='center'
                        color='yellow.5'
                        textShadow={`0px 2.8px 2.8px ${colors.green[1]}`}
                      >
                        {era.title}
                      </Heading>
                      <Text
                        fontSize={{ base: 'md', lg: 'lg' }}
                        textAlign='justify'
                        color='white'
                        textShadow={`0px 0px 10px ${colors.yellow[5]}`}
                        pb='30px'
                        pt='35px'
                      >
                        {era.preview}
                      </Text>
                      <Box>
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
                  </Fade>
                ) : (
                  <Fade in={true} transition={{ enter: { duration: 1 } }}>
                    <Box
                      justifyContent='center'
                      bgGradient={{
                        base: 'linear(to-br, rgba(255,255,255,0.1), rgba(255,255,255,0.5))',
                        md: 'linear(to-br, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                      }}
                      py='70px'
                      px='60px'
                      mt='20px'
                      borderRadius='10px'
                      boxShadow={`0px 0px 10px ${colors.yellow[5]}`}
                      mb='60px'
                      outline={`1px solid ${colors.yellow[5]}`}
                      mx={{ base: '10%', md: '0' }}
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
                        textAlign='justify'
                        color='white'
                        textShadow={`0px 4px 6px ${colors.green[1]}`}
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
                )}
                <Show above='md'>
                  <Box opacity='70%' px='7%' pb={props.isPreview ? 0 : '50px'}>
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
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
