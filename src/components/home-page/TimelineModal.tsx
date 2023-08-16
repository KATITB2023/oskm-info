import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  HStack,
  Text,
  Circle,
  Box,
  Flex,
  Spacer,
  Image,
  keyframes,
  Heading,
  Divider
} from '@chakra-ui/react';
import { type EventDetail } from './Timeline';
import React from 'react';
import TimelineModalBackground from '../background/TimelineModalBackground';

interface Props {
  isOpen: boolean;
  title: string;
  data: EventDetail[];
  onClose: () => void;
}

const scaling = keyframes`
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(1.4);
    }
`;

const VerticalDivider = ({
  type,
  lastEl,
  index
}: {
  type: string;
  lastEl: boolean;
  index: number;
}) => {
  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      zIndex='100'
      flexDir='column'
      position='relative'
      minH='20%'
      flex={1}
      alignSelf='stretch'
    >
      {type === 'title' ? (
        <>
          <Box position='absolute' w='55px' top='-6'>
            <Image
              src='/images/misc/timeline-marker.png'
              alt=''
              draggable='false'
              animation={`${scaling} 1.5s infinite alternate`}
              sx={{
                animationDelay: `${index * 0.3}s`
              }}
            />
          </Box>
        </>
      ) : (
        <Circle size='20px' bg='pink.5' mb={lastEl ? 'auto' : 0} />
      )}
      {!lastEl && (
        <Divider
          orientation='vertical'
          borderColor='pink.5'
          borderWidth='2.5px'
          py={2}
        />
      )}
    </Flex>
  );
};

export const TimelineModal = ({ isOpen, onClose, title, data }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='2xl'>
      <ModalOverlay />
      <ModalContent
        backgroundImage='/images/bg-landing.png'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        color='yellow.5'
        maxH='60vh'
        overflowY='scroll'
        containerProps={{
          px: 4
        }}
        sx={{
          '&::-webkit-scrollbar': {
            borderRadius: '144px',
            bg: 'transparent'
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: '144px',
            bg: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '144px'
          }
        }}
      >
        <ModalBody position='relative' py={10} px={7}>
          <TimelineModalBackground />
          <Heading textAlign='center' fontSize='3xl' zIndex='10' mb={7}>
            {title}
          </Heading>
          {data.map((item: EventDetail, index: number) => (
            <React.Fragment key={index}>
              <HStack
                spacing={0}
                alignItems='flex-start'
                fontFamily={
                  item.type === 'title' ? 'Bodwars' : 'SomarRounded-Regular'
                }
                zIndex='10'
                mt={item.type === 'title' ? 10 : 0}
              >
                <Text w={{ base: '35%', lg: '25%' }}>{item.time}</Text>
                <Spacer />
                <VerticalDivider
                  type={item.type}
                  lastEl={
                    index === data.length - 1 ||
                    data[index + 1]?.type === 'title'
                  }
                  index={index}
                />
                <Spacer />
                <Text
                  textAlign='left'
                  w={{ base: '50%', lg: '60%' }}
                  alignItems='flex-start'
                  fontSize={item.type === 'title' ? 'xl' : 'md'}
                >
                  {item.event}
                </Text>
              </HStack>
            </React.Fragment>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
