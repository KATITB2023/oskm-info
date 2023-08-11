import { Card, Flex, Text, Image, Button, Box } from '@chakra-ui/react';
import { set } from 'lodash';
import { useEffect, useState } from 'react';

interface MerchCardProps {
  title: string;
  price: number;
  productImage: string;
  productImages: string[];
  secondImage?: string;
  spaceImage: string;
  productWidth: string;
  spaceWidth: string;
  productLink?: string;
}

export default function MerchCard(props: MerchCardProps) {
  const {
    title,
    price,
    productImage,
    spaceImage,
    productImages,
    productLink,
    productWidth,
    spaceWidth,
    secondImage
  } = props;

  const [imageIndex, setImageIndex] = useState(0);
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  }

  const handleMouseLeave = () => {
    setIsHover(false);
    setImageIndex(0);

  }

  useEffect(() => {
    if (isHover) {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => {
          if (prevIndex === productImages.length - 1) {
            return 0;
          } else {
            return prevIndex + 1;
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isHover]);


  const itemList = ['Totebag','Gelang', 'Kaos', 'Hoodie', 'Pouch', 'Pulpen', 'Notebook'];
  const longTitle = ['Gantungan Kunci', 'Anti-Dingin Kit', 'Anti- Rempong Kit', 'Anti-Panas Kit','Bestseller Kit']
  const isInItemList = (item: string) => {
    //buat foto yang ga pure png, jdi perlu dikasi margin top
    return itemList.includes(item);
  }
  const isInLongTitle = (item: string) => {
    return longTitle.includes(item);
  }


  return (
    <Flex height={{ base: '350px', md: '600px' }}>
      <Card
        borderRadius={{ base: '90px', md: '144px' }}
        width={{ base: '217px', md: '333px' }}
        height={{ base: '278px', md: '427px' }}
        backgroundImage='/images/merch/merch-card.png'
        backgroundSize='cover'
        alignItems='center'
      >
        <Flex
          flexDirection='column'
          alignItems='center'
          gap={{ base: '0.2rem', md: '0.5rem' }}
          padding={{ base: '3rem 0rem 1rem 1rem', md: '5rem 0rem 1rem 1rem' }}
          justifyContent='center'
        >
          <Text
            color='#FF93D1;'
            fontFamily='Bodwars'
            fontSize={
              isInLongTitle(title)
                ? { base: '20px', md: '30px' }
                : { base: '20px', md: '35px' }
            }
            mt={
              isInLongTitle(title)
                ? { base: '-1rem', md: '-2rem' }
                : { base: '0rem', md: '0rem' }
            }
            textShadow='0px 4px 30px #8D47E5'
            marginBottom='1rem'
            textAlign='center'
            paddingX ='1rem'
          >
            {title}
          </Text>

          <Text color='#FFF' fontFamily='SomarRounded-Regular' fontSize='16px'>
            {price}/pcs
          </Text>
          <Button
            padding={{ base: '0.8rem 0.8rem', md: '1.5rem 1.5rem' }}
            fontFamily='SomarRounded-Regular'
            zIndex='10'
            mb={{ base: '0.5rem', md: '0' }}
          >
            Buy Now
          </Button>
          <Box
            zIndex='3'
            _hover={{
              animation: 'hoverEffect 1s infinite alternate' // Apply the keyframe animation
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            height={{ base: '150px', md: '180px' }}
          >
            <Flex
              mt={isInItemList(title) ? '-10' : '0'}
              justifyContent='center'
            >
              {secondImage && (
                <Image
                  src={secondImage}
                  alt='merch-mug'
                  w={{ base: '100%', md: '120px' }}
                  zIndex='3'
                />
              )}
              <Image
                src={productImages[imageIndex]}
                alt='merch-mug'
                w={{ base: '90%', md: productWidth }}
                zIndex='3'
              />
            </Flex>
          </Box>
          <Image
            src={spaceImage}
            alt='asteroid-1'
            w={{ base: '80%', md: spaceWidth }}
            zIndex='1'
            left='8'
            mt={
              title === 'Stiker'
                ? { base: '-6rem', md: '-9rem' }
                : { base: '-6rem', md: '-7rem' }
            }
          />

          <Image
            src='/images/merch/merch-vector.svg'
            alt='merch-vector'
            position='absolute'
            zIndex='2'
            bottom='0'
            w='10000px'
          />
        </Flex>
      </Card>
    </Flex>
  );
}
