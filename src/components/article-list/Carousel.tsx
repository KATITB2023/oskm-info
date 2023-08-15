import React from 'react';
import classes from './carousel.module.css'
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
  Image
} from '@chakra-ui/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
// import "~/slick-carousel/slick/slick.css";
// import "~/slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import { colors } from '~/styles/component/colors';

interface Content {
  title: string;
  text: string;
  image: string | undefined;
}

const card: Content[] = [
  {
    title: 'PERIODE 2000AN',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/images/article-blog/placeholder_carousel.svg'
  },
  {
    title: 'PERIODE 2010AN',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/images/article-blog/placeholder_carousel.svg'
  },
  {
    title: 'PERIODE 2020AN',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: '/images/article-blog/placeholder_carousel.svg'
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

const Carousel = () => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    arrows: false,
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
    <Box width='100vw' h={{ base: '350px', lg: '540px' }} position={'relative'}>
      <Show above='md'>
        <Box position={'absolute'} top={'50%'} left={'70px'}>
          <IconButton
            aria-label='left-arrow'
            variant='ghost'
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            color='white'
            _hover={{ color: `${colors.yellow[5]}` }}
            _active={{ color: `${colors.yellow[5]}` }}
          >
            <BiChevronLeft size='65px' />
          </IconButton>
        </Box>
      </Show>
      <Box h={{ base: '350px', lg: '540px' }} maxW={'full'} overflow={'visible'}>
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
        <Slider {...settings} ref={setSlider}>
          {card.map((content, index) => (
            <Box
              w={'full'}
              h={'full'}
              key={index}
              bgImage={`url(${content.image})`}
              bgPosition='center'
              bgSize={'cover'}
              bgRepeat='no-repeat'
              textColor={'white'}
            >
              <Box
                width='100vw'
                h={{ base: '350px', lg: '540px' }}
                paddingX={{base:'38px', lg:'258px'}}
                paddingTop={{base:'232px', lg:'75px'}}
                paddingBottom={{base:'20px', lg:'75px'}}
              >
                <Flex flexDir={'column'} justifyContent={'end'} h={'full'}>
                  <Heading>{content.title}</Heading>
                  <Text>{content.text}</Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
      <Show above='md'>
        <Box position={'absolute'} top={'50%'} right={'70px'}>
          <IconButton
            aria-label='right-arrow'
            variant='ghost'
            zIndex={2}
            onClick={() => slider?.slickNext()}
            color='white'
            _hover={{ color: `${colors.yellow[5]}` }}
            _active={{ color: `${colors.yellow[5]}` }}
          >
            <BiChevronRight size='65px' />
          </IconButton>
        </Box>
      </Show>
    </Box>
  );
};

export default Carousel;
