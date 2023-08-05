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
  Hide
} from '@chakra-ui/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
import { useState } from 'react';
import { colors } from '~/styles/component/colors';

const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1
};

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

export default function HistoryCarousel() {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [isPreview, setIsPreview] = useState<boolean>(true);

  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '17%' });

  return (
    <Box>
      <Flex
        justifyContent='center'
        pb={isPreview ? '75px' : '30px'}
        pt={isPreview ? '500px' : '400px'}
      >
        <Heading
          size={{ base: 'xl', md: '3xl' }}
          color='yellow.5'
          textShadow={`0px 0px 10px ${colors.green[3]}`}
        >
          SEJARAH OSKM
        </Heading>
      </Flex>
      <Box position={'relative'} width={'full'} overflow={'hidden'}>
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
        {isPreview ? null : (
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
          autoplay={isPreview}
          ref={(slider) => setSlider(slider)}
        >
          {history.map((era, index) => (
            <Box key={index}>
              <HStack spacing={6} alignItems='flex-end'>
                <Show above='md'>
                  <Box opacity='70%' px='7%'>
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
                {isPreview ? (
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
                        onClick={() => setIsPreview(false)}
                        bg='gray.600'
                        color='yellow.5'
                        outline={`2px solid ${colors.yellow[5]}`}
                        _hover={{ bg: 'gray.600' }}
                      >
                        Read More
                      </Button>
                    </Box>
                  </Flex>
                ) : (
                  <Box
                    justifyContent='center'
                    bgGradient='linear(to-br, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                    py='70px'
                    px='60px'
                    mt='20px'
                    borderRadius='10px'
                    boxShadow={`0px 0px 10px ${colors.yellow[5]}`}
                    mb='10px'
                    outline={`1px solid ${colors.yellow[5]}`}
                    mx={{ base: '10px', md: '0' }}
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
                  </Box>
                )}
                <Show above='md'>
                  <Box opacity='70%' px='7%'>
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
