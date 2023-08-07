import { Card, Flex, Text, Image, Button, Box } from '@chakra-ui/react';

interface MerchCardProps {
  title: string;
  price: number;
  productImage: string;
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
    productLink,
    productWidth,
    spaceWidth,
    secondImage
  } = props;

  return (
    <Flex height={{ base: '350px', md: '600px' }}>
      <Card
        borderRadius={{ base: '90px', md: '144px' }}
        width={{ base: '217px', md: '333px' }}
        height={{ base: '278px', md: '427px' }}
        backgroundImage='/images/merch-card.png'
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
              title === 'Gantungan Kunci'
                ? { base: '20px', md: '30px' }
                : { base: '20px', md: '35px' }
            }
            mt={
              title === 'Gantungan Kunci'
                ? { base: '-1rem', md: '-2rem' }
                : { base: '0rem', md: '0rem' }
            }
            textShadow='0px 4px 30px #8D47E5'
            marginBottom='1rem'
            textAlign='center'
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
          >
            <Flex
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <Flex
                mt={title === 'Gantungan Kunci' ? '-10' : '0'}
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
                  src={productImage}
                  alt='merch-mug'
                  w={{ base: '70%', md: productWidth }}
                  zIndex='3'
                />
              </Flex>
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
            src='/images/merch-vector.svg'
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
