import { Box, Flex, Image, Text } from '@chakra-ui/react';

export default function Day(props: {
  date: string;
  title: string;
  top: string;
}) {
  return (
    <Box
      alignItems='center'
      justifyContent='space-between'
      display={{ base: 'none', md: 'block' }}
      position='absolute'
      zIndex='20'
      top={props.top}
      left='38.5%'
      draggable='false'
    >
      <Image src='/images/timeline-bigO.png' alt='Gambar' />
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize='24'
        position='absolute'
        top='5%'
        left='-450%'
        color='#FFFC83'
      >
        {props.date}
      </Text>
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize='24'
        position='absolute'
        top='5%'
        left='150%'
        color='#FFFC83'
      >
        {props.title}
      </Text>
    </Box>
  );
}
