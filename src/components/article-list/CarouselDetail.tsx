import React from 'react';
import classes from './carousel.module.css';
import { Box, IconButton, Flex, Show } from '@chakra-ui/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import Slider from 'react-slick';
import { useState, useEffect } from 'react';
import { colors } from '~/styles/component/colors';
import type { PostOrPage } from '@tryghost/content-api';
import ArticleCard from './Card';

interface Props {
  data: PostOrPage[];
}

const CarouselDetail = ({ data }: Props) => {
  const [slider, setSlider] = useState<Slider | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);

    handleResize()

    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth])

  console.log(screenWidth)

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: screenWidth <= 1000 ? 1
      : screenWidth > 1000 && screenWidth <= 1300 ? 2
      : screenWidth > 1300 ? data.length === 1 ? 1 : data.length === 2 ? 2 : 3 : 3,
    slidesToScroll: 1
  };

  return (
    <Box width='100%' position='relative'>
      <Show above='md'>
        <Flex position='absolute' height='100%' alignItems='center' left='-40px'>
          <IconButton
            aria-label='left-arrow'
            variant='ghost'
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            color='white'
            _hover={{ color: `${colors.yellow[5]}` }}
            _active={{ color: `${colors.yellow[5]}` }}
          >
            <BiChevronLeft size='100px' />
          </IconButton>
        </Flex>
      </Show>
      <Box paddingInline='2em'>
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
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
          {data.map((content, index) => (
            <ArticleCard
              image={content.feature_image}
              text={content.plaintext ?? ''}
              title={content.title ?? ''}
              slug={content.slug}
              key={index}
            />
          ))}
        </Slider>
      </Box>
      <Show above='md'>
        <Flex position='absolute' right='-40px' top='0' height='100%' alignItems='center'>
          <IconButton
            aria-label='right-arrow'
            variant='ghost'
            zIndex={2}
            onClick={() => slider?.slickNext()}
            color='white'
            _hover={{ color: `${colors.yellow[5]}` }}
            _active={{ color: `${colors.yellow[5]}` }}
          >
            <BiChevronRight size='100px' />
          </IconButton>
        </Flex>
      </Show>
    </Box>
  );
};

export default CarouselDetail;
