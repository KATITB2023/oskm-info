import { Box, Flex, Image, Text } from '@chakra-ui/react';

export default function Time(props: {
  time: string;
  title: string;
  top: string;
}) {
  return (
    <Box
      alignItems='center'
      justifyContent='space-between'
      position='absolute'
      zIndex='20'
      top={props.top}
      left='39.5%'
      draggable='false'
    >
      <Image src='/images/timeline-smallO.png' alt='Gambar' />
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize='15'
        position='absolute'
        top='5%'
        left='-450%'
        color='#FFFC83'
      >
        {props.time}
      </Text>
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize='15'
        position='absolute'
        top='5%'
        left='270%'
        color='#FFFC83'
      >
        {props.title}
      </Text>
    </Box>
  );
}
