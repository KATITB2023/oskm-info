import { Flex, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function Element(props: {
  date: string;
  title: string;
  exp: string;
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Flex
      alignItems='center'
      marginTop={{ base: '-5%', lg: '-20%' }}
      marginBottom={{ base: '-25%', lg: '-5%' }}
    >
      {props.exp == 'day' && (
        <>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '10', lg: '24' }}
            position='absolute'
            left={{ base: '4%', lg: '6%' }}
            color='#FFFC83'
          >
            {props.date}
          </Text>
          <svg height='' width=''>
            <circle
              cx={windowWidth >= 1024 ? '90%' : '30%'}
              cy='50%'
              r={windowWidth >= 1024 ? '10%' : '6%'}
              fill='#FF93D1'
            />
          </svg>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '10', lg: '24' }}
            position='absolute'
            left={{ base: '40%', lg: '30%' }}
            color='#FFFC83'
          >
            {props.title}
          </Text>
        </>
      )}
      {props.exp == 'time' && (
        <>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '8', lg: '18' }}
            position='absolute'
            left={{ base: '20%', lg: '18%' }}
            color='#FFFC83'
          >
            {props.date}
          </Text>
          <svg height='' width=''>
            <circle
              cx={windowWidth >= 1024 ? '90%' : '30%'}
              cy='50%'
              r={windowWidth >= 1024 ? '6%' : '4%'}
              fill='#FF93D1'
            />
          </svg>
          <Text
            whiteSpace='nowrap'
            fontFamily='SomarRounded-Bold'
            fontSize={{ base: '8', lg: '18' }}
            position='absolute'
            left={{ base: '40%', lg: '30%' }}
            color='#FFFC83'
          >
            {props.title}
          </Text>
        </>
      )}
    </Flex>
  );
}
