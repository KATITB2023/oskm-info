import { Flex, Image, Text, Stack, Button, VStack } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import JumbotronBackground from '../background/JumbotronBackground';
import _ from 'lodash';

interface Props {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export default function Jumbotron() {
  const handleGetRequest = async () => {
    const guidebookURL = 'https://cdn.oskmitb.com/sop_peserta_oskm.pdf';
    const response = await axios.get(guidebookURL, {
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'SOP Peserta OSKM.pdf');
    document.body.appendChild(link);
    link.click();
  };

  const targetDate = new Date('2023-08-16T12:45:00.000+07:00').getTime();
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date().getTime();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<Props>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <Flex
      minH='100dvh'
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      pt={10}
      gap={5}
      position='relative'
      w='100%'
    >
      <JumbotronBackground />
      <VStack alignItems='center' spacing={0}>
        <Image
          src='/images/logo-oskm.png'
          draggable='false'
          loading='lazy'
          zIndex='10'
          w='60%'
          alt=''
        />
        <Image
          src='/images/oskm-title.png'
          draggable='false'
          loading='lazy'
          w='60%'
          zIndex='10'
          alt=''
        />
      </VStack>

      {!_.isEmpty(timeLeft) && (
        <Flex flexDirection='row' gap={10} zIndex='100'>
          {Object.keys(timeLeft).map((interval, index) => (
            <Flex flexDir={'column'} key={index} alignItems='center'>
              <Text
                fontWeight={700}
                color='yellow.5'
                fontSize={{ base: 'xl', md: '3xl' }}
              >
                {timeLeft[interval as keyof Props]?.toLocaleString('id-ID', {
                  minimumIntegerDigits: 2,
                  useGrouping: false
                })}
              </Text>
              <Text color='green.4' fontSize={{ base: 'sm', md: 'md' }}>
                {interval.toUpperCase()}
              </Text>
            </Flex>
          ))}
        </Flex>
      )}
      <Stack direction={'row'} spacing={{ base: 2, md: 4 }} zIndex='100'>
        <Button>Explore Now!</Button>
        <Button variant='outline' onClick={() => void handleGetRequest()}>
          Download Guidebook
        </Button>
      </Stack>
    </Flex>
  );
}
