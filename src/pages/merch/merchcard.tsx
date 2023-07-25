import { Card, Flex, Text, Image, Button } from '@chakra-ui/react';

interface MerchCardProps {
  title: string;
  price: number;
  productImage: string;
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
    spaceWidth
  } = props;
  return (
    <Flex height='600px'>
      <Card
        borderRadius='144px'
        width='333px'
        height='427px'
        backgroundImage='/images/merch-card.png'
        alignItems='center'
      >
        <Flex
          flexDirection='column'
          alignItems='center'
          gap='0.5rem'
          padding='5rem 0 1rem 1rem'
          justifyContent='center'
        >
          <Text
            color='#FF93D1;'
            fontFamily='Bodwars'
            fontSize='35px'
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
            padding='1.5rem 1.5rem'
            fontFamily='SomarRounded-Regular'
            zIndex='10'
          >
            Buy Now
          </Button>

          <Flex>
            <Image
              src={productImage}
              alt='merch-mug'
              w={productWidth}
              zIndex='3'
            />

            <Image
              src={spaceImage}
              alt='asteroid-1'
              w={spaceWidth}
              position='absolute'
              zIndex='2'
              bottom='-155'
              left='8'
            />
          </Flex>

          <Image
            src='/images/merch-vector.png'
            alt='merch-vector'
            position='absolute'
            zIndex='1'
            bottom='0'
            w='10000px'
          />
        </Flex>
      </Card>
    </Flex>
  );
}
