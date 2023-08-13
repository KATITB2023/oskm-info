import {
  Flex,
  Image,
  Box,
  Text,
  Heading,
  VStack,
  Button
} from '@chakra-ui/react';
import Fonts from '~/styles/fonts';
const ArticleCard = () => (
  <Box
    bgGradient={'linear(to-r, #98F9FF, #EABFFF)'}
    w={{ base: '322px', lg: '241px' }}
    h={{ base: '137.5px', lg: '323px' }}
    borderRadius={'3xl'}
    alignItems={'center'}
    display={'flex'}
    mx={'auto'}
    justifyContent={'center'}
    overflow={'hidden'}
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
        src='/images/article-blog/placeholder_pict.svg'
        objectFit={'cover'}
      />
      <Box
        position={'absolute'}
        top={{ base: '0px', lg: '112px' }}
        left={{ base: '205px', lg: '-1px' }}
        bgGradient={'linear(to-r, #98F9FF, #EABFFF)'}
        w={'241px'}
        h={'211px'}
        overflow={'hidden'}
        borderRadius={'3xl'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        padding={'1px'}
        paddingTop={'1px'}

      >
        <Box
          padding={{ base: '12px', lg: '24px' }}
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
          <Fonts />
          <Heading
            noOfLines={2}
            color={'white'}
            textAlign={'center'}
            fontSize={'24px'}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            ipsa, aliquam perferendis nobis minima eligendi neque pariatur
            facere vitae, harum cum? Maxime ratione fugiat id architecto veniam
            repellat illum officia.
          </Heading>
          <Text
            color={'white'}
            textAlign={'justify'}
            noOfLines={3}
            fontSize={'12px'}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti,
            alias corporis incidunt adipisci et earum iusto natus distinctio.
            Minus corrupti voluptate illum distinctio sit fugiat sapiente,
            reiciendis suscipit fugit quisquam.
          </Text>
          <Button py={'8px'} px={'24px'}>
            Explore
          </Button>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default ArticleCard;
