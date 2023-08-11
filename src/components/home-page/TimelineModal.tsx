import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  HStack,
  Text,
  Circle,
  Box,
  Flex,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { type EventDetail } from './Timeline';
import React from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  data: EventDetail[];
  onClose: () => void;
}

const Line = () => (
  <Flex alignItems='center' justifyContent='center' zIndex='100'>
    <svg height='30' width='150'>
      <line
        x1='10'
        y1='0'
        x2='10'
        y2='65'
        fill='#FF93D1'
        stroke='#FF93D1'
        strokeWidth='2.5'
      />
    </svg>
  </Flex>
);

export const TimelineModal = ({ isOpen, onClose, title, data }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered size='lg'>
    <ModalOverlay />
    <ModalContent
      backgroundImage='/images/bg-landing.png'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      color='yellow.5'
    >
      <ModalHeader fontFamily='Bodwars' textAlign='center' fontSize='3xl'>
        {title}
      </ModalHeader>
      <ModalBody>
        {data.map((item: EventDetail, index: number) => (
          <React.Fragment key={index}>
            {/* <HStack spacing={0} alignItems='center'>
              <Text w='150px'>{item.time}</Text>
              <Circle size='25px' bg='pink.5' justifySelf='center' />
              <Text ml='auto'>{item.event}</Text>
            </HStack>
            <Line /> */}
          </React.Fragment>
        ))}
      </ModalBody>
    </ModalContent>
  </Modal>
);
