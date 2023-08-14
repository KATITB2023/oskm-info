import {
  Flex,
  Image,
  Box,
  Text,
  Heading,
  VStack,
  Button
} from '@chakra-ui/react';
import { Nullable } from '@tryghost/content-api';
import Fonts from '~/styles/fonts';
interface CardData {
  image: Nullable<string>;
  title: string;
  text: string
}

const ArticleCard = (props:CardData) => (
  <Box
    bgGradient={'linear(to-r, #98F9FF, #EABFFF)'}
    w={{ base: '322px', lg: '241px' }}
    h={{ base: '180px', lg: '323px' }}
    borderRadius={'3xl'}
    alignItems={'center'}
    display={'flex'}
    mx={'auto'}
    justifyContent={'center'}
    // overflow={'hidden'}
    p={'1px'}
  >
    <Box
      w={ 'full' }
      h={ 'full' }
      position={'relative'}
      borderRadius={'3xl'}
      overflow={'hidden'}
    >
      <Image
        src={props.image ?? undefined}
        objectFit={'cover'}
        h={{base: 'full', lg:'50%'}}
        w={{base: '85%', lg:'full'}}
        objectPosition={'center'}
      />
      <Box
        position={'absolute'}
        top={{ base: '0px', lg: '112px' }}
        // left={{ base: '205px', lg: '-1px' }}
        right={'0px'}
        bgGradient={'linear(to-r, #98F9FF, #EABFFF)'}
        w={{base:'190px', lg:'full'}}
        h={{base: 'full',lg:'211px'}}
        overflow={'hidden'}
        borderRadius={'3xl'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1px'}

      >
        <Box
          padding={{ base: '11.85px', lg: '24px' }}
          w={'full'}
          h={'full'}
          overflow={'hidden'}
          bg={'navy.1'}
          borderRadius={'3xl'}
          display={'flex'}
          gap={'8px'}
          alignItems={'center'}
          flexDirection={'column'}
        >
          <Heading
            noOfLines={2}
            color={'white'}
            textAlign={'center'}
            fontSize={'24px'}
          >
            {
              props.title
            }
          </Heading>
          <Text
            color={'white'}
            textAlign={'justify'}
            noOfLines={{base: 2, lg: 3}}
            fontSize={'12px'}
          >
            {
              props.text
            }
          </Text>
          <Button py={{base:'6px', lg:'8px'}} px={{base:'16px', lg:'24px'}}>
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ArticleCard;
