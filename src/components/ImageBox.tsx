import { Flex, Image, Text, Heading, VStack } from '@chakra-ui/react';
import SponsorBackground from './background/SponsorBackground';
import TenantBackground from './background/TenantBackground';

interface Props {
  title?: string;
  object?: string;
  contact?: string;
  image: string;
  type: string;
}

const SponsorMedpar = (props: { type: 'sponsor' | 'medpar' }) => {
  const sponsorList = ['sponsor.png'];
  const medparList = ['medpar.png'];
  return (
    <Flex
      flexDirection='row'
      flexWrap='wrap'
      gap={16}
      alignItems='center'
      justifyContent='center'
      zIndex='10'
    >
      {props.type === 'sponsor'
        ? sponsorList.map((sponsor, index) => (
            <Image
              src={`/images/sponsor/${sponsor}`}
              draggable='false'
              key={index}
              alt=''
            />
          ))
        : medparList.map((medpar, index) => (
            <Image
              src={`/images/sponsor/${medpar}`}
              draggable='false'
              key={index}
              alt=''
            />
          ))}
    </Flex>
  );
};

const ImageBox = ({ title, object, contact, image, type }: Props) => {
  return (
    <VStack spacing={6} pt={12} w='100%'>
      <Heading
        fontSize='4xl'
        color='yellow.5'
        px={4}
        textAlign='center'
        textShadow={{
          base: '0px 0px 20px #72D8BA;',
          md: '0px 0px 20px #72D8BA;'
        }}
        zIndex='10'
      >
        {title}
      </Heading>
      <Flex
        bgImage='/images/bg-sponsor.png'
        bgSize='cover'
        bgPosition='center'
        borderRadius='lg'
        bgColor='navy.1'
        color='white'
        py={14}
        px={12}
        flexDirection='column'
        gap={4}
        textAlign='center'
        boxShadow='0px 0px 20px rgba(255, 255, 255, 0.4)'
        w={{ base: '80%', lg: '80ch' }}
        position='relative'
      >
        {type === 'sponsor' && (
          <>
            <SponsorBackground image={image} />
            <SponsorMedpar type='sponsor' />
          </>
        )}
        {type === 'medpar' && (
          <>
            <SponsorBackground image={image} />
            <SponsorMedpar type='medpar' />
          </>
        )}
        {type === 'tenants' && (
          <>
            <TenantBackground image={image} />
            <Heading fontSize='3xl' letterSpacing={4} zIndex='10'>
              CALLING OUT ALL&nbsp;{object}
            </Heading>
            <Text fontSize='2xl' zIndex='10'>
              For further information please contact
            </Text>
            <Text fontSize='xl' zIndex='10'>
              {contact}
            </Text>
          </>
        )}
      </Flex>
    </VStack>
  );
};

export default ImageBox;
