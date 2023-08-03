import { Flex, Center, Image, Text, Box, Heading } from '@chakra-ui/react';

interface Props {
  title: string;
  object: string;
  contact: string;
  image: string;
}

const ImageBox = ({title, object, contact, image} : Props) => {

  return (
    <Center flexDirection='column'>
      <Heading
        fontSize={{ base: '2xl', md: '5xl' }}
        color='yellow.5'
        px={4}
        pt={24}
        textShadow={{ base: '0px 0px 20px #72D8BA;', md: '0px 0px 20px #72D8BA;' }}
      >
        { title }
      </Heading>
      <Flex
        mt='2rem'
        py='8px'
        width='95%'
        justifyContent='space-between'
        alignItems='center'
        zIndex='10'
        pos='relative'
        flexDirection='column'
        color='yellow.5'
      >
        <Image src={image} alt="Your Image" objectFit="cover" flex="1" />
        <Box
          pos='absolute'
          top='50%'  
          transform='translate(0%, -50%)'
          alignItems='center'
          padding='8'
        >
          <Text 
            fontFamily='Bodwars' 
            textAlign='center'
            fontSize={{ base: '20px', sm: '28px', md: '3xl', lg: '5xl' }} 
            textShadow='0px 0px 20px #72D8BA'
          >
            CALLING OUT ALL&nbsp;{ object }
          </Text>
          <Text 
            fontFamily='SomarRounded-Bold' 
            textAlign='center'
            top='50%' 
            fontSize={{ base: '12px', sm: '16px', md: '3xl', lg: '4xl' }} 
            mt={{ md: '5%'}}
          >
            For further information please contact:
          </Text>
          <Text 
            fontFamily='SomarRounded-Bold' 
            textAlign='center'
            fontSize={{ base: '12px', sm: '16px', md: '3xl', lg: '4xl' }} 
          >
            { contact }
          </Text>
        </Box>
      </Flex>
    </Center>
  );
};

export default ImageBox;
