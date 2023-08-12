import { Circle, Flex } from '@chakra-ui/react';
import { colors } from '~/styles/component/colors';

export function Dots(props: { currentSlide: number; len: number }) {
  const arr: number[] = [...Array(props.len).keys()];

  return (
    <Flex justifyContent='center' alignItems='center' mb='60px'>
      {arr.map((i: number) =>
        i >= props.currentSlide - 1 && i <= props.currentSlide + 1 ? (
          <Circle
            size='15px'
            bg='yellow.5'
            mx='5px'
            opacity={i === props.currentSlide ? 1 : 0.5}
            key={i}
            boxShadow={`0px 0px 10px ${colors.green[3]}`}
          />
        ) : (i >= props.currentSlide - 4 && i <= props.currentSlide - 2) ||
          (i >= props.currentSlide + 2 && i <= props.currentSlide + 4) ? (
          <Circle
            size='5px'
            bg='yellow.5'
            mx='5px'
            boxShadow={`0px 0px 10px ${colors.green[3]}`}
            key={i}
            opacity='0.5'
          />
        ) : null
      )}
    </Flex>
  );
}
