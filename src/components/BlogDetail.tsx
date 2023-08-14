import { Box, Button, Flex, Heading, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '~/layout';
import { BlogDetailBackground } from './background/BlogDetailBackground';
import { MdRemoveRedEye, MdThumbDown, MdThumbUp, MdTimer } from "react-icons/md";

const BlogPage = () => {
  const router = useRouter()
  const { slug } = router.query;

  console.log(slug)
  return (
    <Layout title='Blog Detail'>
      <Flex
        minH='100dvh'
        width='100%'
        backgroundImage='/images/background/blur1a-2.png'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        alignItems='center'
        flexDirection='column'
        overflow='hidden'
        position='relative'
      >
        <Image 
          src='/images/blog/dummy-image.png'
          alt=''
          width='100%'
          zIndex='3'
        />
        <BlogDetailBackground />
        <Flex
          backgroundColor='rgba(54, 8, 192, 0.4)'
          padding='10'
          paddingInline={{ base: '10', lg: '24'}}
          alignItems='center'
          flexDirection='column'
          width='80%'
          zIndex='3'
          color='white'
        >
          <Image 
            src='/images/oskm-title.png'
            alt=''
            width={{ base: '50%', lg: '20%'}}
            mb='14'
          />
          <Text fontWeight='bold' fontSize={{ base: '1rem', lg: '2rem'}} textAlign='center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur</Text>
          <Flex
            justifyContent='space-between'
            width={{ base: '65%', lg: '25%'}}
            fontWeight='bold'
            mt='4'
            mb='14'
            fontSize={{ base: '14px'}}
          >
            <Flex alignItems='center' gap='1.5'>
              <Icon 
                as={MdRemoveRedEye}
                fontSize='20px'
                transform='translateY(-2px)'
              />
              <Text>1.7K</Text>
            </Flex>
            <Flex alignItems='center' gap='1.5'>
              <Icon 
                as={MdThumbUp}
                fontSize='20px'
                transform='translateY(-2px)'
              />
              <Text>1.5K</Text>
            </Flex>
            <Flex alignItems='center' gap='1.5'>
              <Icon 
                as={MdTimer}
                fontSize='20px'
                transform='translateY(-2px)'
              />
              <Text>8 min</Text>
            </Flex>
          </Flex>
          <Text textAlign='justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.</Text>
          <Text textAlign='justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.</Text>
          <Text textAlign='justify'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.. Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.Lorem ipsum dolor sit amet, consectetur adipiscing elit. At purus tellus arcu sit nibh consectetur.</Text>
          <Box mt='20' borderBottom='1px solid white' pb='10' width='100%'>
            <Text fontSize='1.5rem' textAlign='center'>Apakah kamu menyukai artikelnya?</Text>
            <Flex
              justifyContent='center'
              mt='4'
              gap='14'
            >
              <IconButton 
                icon={<MdThumbUp />}
                aria-label='like'
                paddingInline='1em'
                backgroundColor='purple.1'
                color='white'
                _hover={{
                  backgroundColor: 'purple.3'
                }}
                fontSize='26px'
              />
              <IconButton 
                icon={<MdThumbDown />}
                aria-label='like'
                paddingInline='1em'
                backgroundColor='purple.1'
                color='white'
                _hover={{
                  backgroundColor: 'purple.3'
                }}
                fontSize='26px'
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  );
}


export default BlogPage;
