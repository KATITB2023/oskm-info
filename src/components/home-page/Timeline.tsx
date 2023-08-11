import {
  Box,
  Flex,
  HStack,
  Heading,
  VStack,
  Image,
  Text,
  Grid,
  GridItem
} from '@chakra-ui/react';
import TimelineBackground from '../background/TimelineBackground';
import { colors } from '~/styles/component/colors';
import { timelineData } from './Datetime';
import React from 'react';

export default function Timeline() {
  const timelineDate = timelineData;

  return (
    <Box position='relative' w='100%' zIndex='100' pt={20} id='timeline'>
      <TimelineBackground />
      <Flex px={{ base: 10, lg: 48 }} py={20} flexDir='column' gap={20}>
        <Heading
          size='2xl'
          color='yellow.5'
          textShadow={`0px 0px 10px ${colors.yellow[5]}`}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          TIMELINE
          <br />
          KAT ITB 2023
        </Heading>
        <VStack spacing={0} px={{ base: 0, lg: 40 }}>
          {timelineDate.map((data, indexParent) => (
            <React.Fragment key={data.event}>
              <HStack
                alignSelf={indexParent % 2 === 0 ? 'flex-start' : 'flex-end'}
                spacing={2}
              >
                <Image
                  src={data.image}
                  alt=''
                  draggable='false'
                  w={{ base: '100px', lg: '150px' }}
                />
                <VStack spacing={0} color='yellow.5'>
                  <Heading fontSize='xl'>{data.event}</Heading>
                  <Text fontSize='lg' textAlign='left' w='100%'>
                    {data.date}
                  </Text>
                </VStack>
              </HStack>
              {indexParent !== timelineDate.length - 1 && (
                <Grid
                  templateRows='repeat(4, 1fr)'
                  templateColumns='repeat(4, 1fr)'
                  w='80%'
                  key={`timeline-${indexParent}`}
                >
                  {new Array(4).fill(0).map((_, index) => (
                    <React.Fragment key={`meteor-${index}`}>
                      {index !== 0 && indexParent % 2 === 0 && (
                        <GridItem colSpan={index} />
                      )}
                      {index !== 3 && indexParent % 2 !== 0 && (
                        <GridItem colSpan={3 - index} />
                      )}
                      <GridItem
                        colSpan={indexParent % 2 === 0 ? 4 - index : index + 1}
                      >
                        <Image
                          src='/images/timeline/asteroid.png'
                          alt=''
                          w='50px'
                          transform={indexParent % 2 !== 0 ? 'scaleX(-1)' : ''}
                          draggable='false'
                        />
                      </GridItem>
                    </React.Fragment>
                  ))}
                </Grid>
              )}
            </React.Fragment>
          ))}
        </VStack>
      </Flex>
    </Box>
  );
}
