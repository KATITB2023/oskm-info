import React from "react";
import { Box, IconButton, Heading, Text, Flex, Show } from "@chakra-ui/react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import Slider from "react-slick";
import { useState } from "react";
import { colors } from "~/styles/component/colors";
import type { PostOrPage } from "@tryghost/content-api";

interface Props {
  data: PostOrPage[];
}

const Carousel = ({ data }: Props) => {
  const [slider, setSlider] = useState<Slider | null>(null);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Box
      width={{ base: "100vw", lg: "calc(100vw - 0.5rem)" }}
      maxW={"100vw"}
      h={{ base: "25em", md: "18em", lg: "25em" }}
      position={"relative"}
    >
      <Show above='md'>
        <Box position={"absolute"} top={"50%"} left={"70px"}>
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
      <Box
        h={{ base: "350px", lg: "540px" }}
        maxW={"full"}
        overflow={"visible"}
      >
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
            <Box
              w={"100%"}
              height={{ base: "25em", md: "18em", lg: "25em" }}
              key={index}
              bgImage={`url(${content.feature_image ?? ""})`}
              bgPosition='center'
              bgSize={"cover"}
              bgRepeat='no-repeat'
              textColor={"white"}
            >
              <Box
                width='100vw'
                height={{ base: "25em", md: "18em", lg: "25em" }}
                paddingX={{ base: "38px", lg: "258px" }}
                paddingTop={{ base: "232px", lg: "75px" }}
                paddingBottom={{ base: "20px", lg: "75px" }}
              >
                <Flex flexDir={"column"} justifyContent={"end"} h={"full"}>
                  <Heading>{content.title}</Heading>
                  <Text noOfLines={2}>{content.plaintext}</Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
      <Show above='md'>
        <Box position={"absolute"} top={"50%"} right={"70px"}>
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
