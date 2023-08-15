import { Box, Image } from '@chakra-ui/react';

const ArticleListBackground = () => {
  return (
    <Box
      position='absolute'
      inset='0'
      margin='auto'
      overflow='hidden'
      zIndex='-99'
      backgroundImage='/images/article-blog/background_article.svg'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
    >
      <Image
        alt=''
        draggable='false'
        opacity={'50%'}
        loading='lazy'
        src='/images/article-blog/komet2.png'
        objectFit={'cover'}
        position={'absolute'}
        top={'-11%'}
        right={'-3%'}
        transform='rotate(11deg)'
        width={{ base: '19.861%', lg: '50%' }}
        height={{ base: '19.861%', lg: '50%' }}
      />
      <Image
        alt=''
        draggable='false'
        opacity={'50%'}
        loading='lazy'
        src='/images/article-blog/spark_kicik6.png'
        objectFit={'cover'}
        position={'absolute'}
        top={'4%'}
        left={'4.25%'}
        // transform='rotate(7deg)'
        width={{ base: '19.861%', lg: '60%' }}
        height={{ base: '19.861%', lg: '60%' }}
      />
      <Image
        alt=''
        draggable='false'
        opacity={'50%'}
        loading='lazy'
        src='/images/article-blog/ornamen_horizontal_bebatuan_2.png'
        objectFit={'fill'}
        position={'absolute'}
        top={'17%'}
        left={'7.25%'}
        width={{ base: '19.861%', lg: '96%' }}
        height={{ base: '19.861%', lg: '48%' }}
      />
      <Image
        alt=''
        zIndex={-100}
        width={{ base: '19.861%', lg: '100%' }}
        height={{ base: '19.861%', lg: '63%' }}
        position={'absolute'}
        bottom={'0%'}
        right={'0%'}
        draggable='false'
        opacity={'50%'}
        loading='lazy'
        src='/images/article-blog/spark_kicik5.png'
        objectFit={'cover'}
      />
      <Image
        alt=''
        zIndex={-100}
        width='100%'
        height={{ base: '19.861%', lg: '63%' }}
        position={'absolute'}
        bottom={'-2%'}
        left={'0%'}
        draggable='false'
        opacity={'50%'}
        loading='lazy'
        src='/images/article-blog/ornamen_horizontal_bebatuan_1.png'
        objectFit={'fill'}
      />
    </Box>
  );
};

export default ArticleListBackground;
