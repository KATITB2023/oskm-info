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
  Image
} from '@chakra-ui/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
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
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image:'/images/article-blog/placeholder_carousel.svg' 
    },
    {
      title: 'PERIODE 2010AN',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image:'/images/article-blog/placeholder_carousel.svg' 
    },
    {
      title: 'PERIODE 2020AN',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image:'/images/article-blog/placeholder_carousel.svg' 
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

const Carousel= () => {
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
          <Flex>
            <Show above='lg'>
                <Box>
                    <IconButton
                    aria-label='left-arrow'
                    variant='ghost'
                    zIndex={2}
                    onClick={() => slider?.slickPrev()}
                    borderRadius='full'
                    bg='yellow.5'
                    color='navy.4'
                    _hover={{ boxShadow: `0px 0px 10px ${colors.green[3]}` }}
                    >
                    <BiChevronLeft size='40px' />
                    </IconButton>
                </Box>
            </Show>
            <Box h={'full'}>
                <Slider 
                {...settings}
                ref={setSlider}
                >
                    {card.map((content, index) => (    
                        <Box w={'calc(100vw)'} h={'inherit'} bgImage={`url(${content.image})`} bgPosition="center" bgRepeat="no-repeat" paddingX={'258px'} paddingY={'75px'}>
                            <Flex flexDir={'column'} justifyContent={'flex-end'}>
                                <Heading>
                                    {content.title}
                                </Heading>
                                <Text>
                                    {content.text}
                                </Text>
                            </Flex>
                        </Box>                
                    ))}
                </Slider>
            </Box>
            <Show>
                <Box>
                <IconButton
                aria-label='right-arrow'
                variant='ghost'
                zIndex={2}
                onClick={() => slider?.slickNext()}
                borderRadius='full'
                bg='yellow.5'
                color='navy.4'
                _hover={{ boxShadow: `0px 0px 10px ${colors.green[3]}` }}
                >
                <BiChevronRight size='40px' />
                </IconButton>
                </Box>
            </Show>
          </Flex>
        </Box>
        
    );
}

export default Carousel;