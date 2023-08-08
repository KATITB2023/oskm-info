import { Box, Flex, Image, Text } from '@chakra-ui/react';

export default function Day(props: {
  date: string;
  title: string;
  top: { base: string; lg: string };
  //   left: {base: string, lg: string};
}) {
  return (
    <Box>
      <Image
        src='/images/timeline-bigO.png'
        alt='Gambar'
        w={{ base: '30%', lg: '100%' }}
      />
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize={{ base: '10', lg: '24' }}
        position='absolute'
        left={{ base: '-220%', lg: '-520%' }}
        color='#FFFC83'
        top={props.top}
      >
        {props.date}
      </Text>
      <Text
        whiteSpace='nowrap'
        fontFamily='SomarRounded-Bold'
        fontSize={{ base: '10', lg: '24' }}
        position='absolute'
        left={{ base: '80%', lg: '180%' }}
        color='#FFFC83'
        top={props.top}
      >
        {props.title}
      </Text>
    </Box>
  );
}
