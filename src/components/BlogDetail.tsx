import { Box, Flex, Icon, IconButton, Image, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Layout from '~/layout';
import { BlogDetailBackground } from './background/BlogDetailBackground';
import { MdRemoveRedEye, MdThumbDown, MdThumbUp, MdTimer } from "react-icons/md";
import { api } from '~/utils/api';
import ReactHtmlParser from 'react-html-parser';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react'
import CarouselDetail from './article-list/CarouselDetail';
import type { PostOrPage } from '@tryghost/content-api';

const BlogDetailPage = () => {
  const router = useRouter()
  const { slug } = router.query;

  const toast = useToast();

  const blogDetailQuery = api.cms.getArticlesBySlug.useQuery({
    slug: slug as string
  }, { refetchOnWindowFocus: false })

  const articleListQuery = api.cms.getArticlesList.useQuery({
    currentPage: 1,
    sortBy: 'published_at DESC',
    limitPerPage: 9,
    searchQuery: undefined
  });

  const cardsData = articleListQuery.data;
  const paginatedData = cardsData?.data || ([] as PostOrPage[]);

  const addArticleLikeMutation = api.cms.addArticleLike.useMutation()
  const addArticleDislikeMutation = api.cms.addArticleDislike.useMutation()

  const blogDetail = blogDetailQuery.data;

  const [disabled, setDisabled] = useState<boolean>(false);

  const formatNumber = (number: number) => {
    let result: number = number;
    if (number >= 1000) {
      result = number / 1000;
      return result.toFixed(1).toString() + 'K';
    }

    return result.toString();
  }

  const likeArticle = async () => {
    try {
      setDisabled(true)
      await addArticleLikeMutation.mutateAsync({
        id: blogDetail?.content.id as string
      })
      await blogDetailQuery.refetch()
    } catch (err) {
      if (!(err instanceof TRPCClientError)) throw err
      toast({
        title: err.message,
        status: 'error',
        duration: 2000,
        position: 'top'
      })
    }
  }

  const dislikeArticle = async () => {
    try {
      setDisabled(true)
      await addArticleDislikeMutation.mutateAsync({
        id: blogDetail?.content.id as string
      })
      await blogDetailQuery.refetch()
    } catch (err) {
      if (!(err instanceof TRPCClientError)) throw err
      toast({
        title: err.message,
        status: 'error',
        duration: 2000,
        position: 'top'
      })
    }
  }

  return (
    <Layout title='Blog Detail'>
      {blogDetail ? (
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
          <Box
            width='100%'
            height={{ base: '25em', md: '18em', lg: '25em'}}
            backgroundImage={blogDetail.content.feature_image ? blogDetail.content.feature_image : ''}
            backgroundSize='cover'
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            zIndex='5'
          >
          </Box>
          <BlogDetailBackground />
          <Flex
            backgroundColor='rgba(54, 8, 192, 0.4)'
            padding='10'
            paddingInline={{ base: '0', lg: '24'}}
            alignItems='center'
            flexDirection='column'
            width={{ base: '95%', lg: '80%'}}
            zIndex='3'
            color='white'
          >
            <Image 
              src='/images/oskm-title.png'
              alt=''
              width={{ base: '50%', lg: '20%'}}
              mb='14'
            />
            <Text fontWeight='bold' fontSize={{ base: '1.5rem', lg: '2rem'}} textAlign='center'>
              {blogDetail.content.title}
            </Text>
            <Flex
              justifyContent='space-between'
              width={{ base: '85%', md: '50%', lg: '35%'}}
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
                <Text>{formatNumber(blogDetail.metadata?.views as number)}</Text>
              </Flex>
              <Flex alignItems='center' gap='1.5'>
                <Icon 
                  as={MdThumbUp}
                  fontSize='20px'
                  transform='translateY(-2px)'
                />
                <Text>{formatNumber(blogDetail.metadata?.likes as number)}</Text>
              </Flex>
              <Flex alignItems='center' gap='1.5'>
                <Icon 
                  as={MdTimer}
                  fontSize='20px'
                  transform='translateY(-2px)'
                />
                <Text>{blogDetail.content.reading_time === 0 ? 1 : blogDetail.content.reading_time} min</Text>
              </Flex>
            </Flex>
            <Box
              textAlign='justify'
              sx={{ '& img': { display:'block', margin: '20px auto', loading: 'lazy' }}}
              paddingInline={{ base: '7' }}
            >
              {ReactHtmlParser(blogDetail.content.html ? blogDetail.content.html : '')}
            </Box>
            <Box mt='20' borderBottom='1px solid white' pb='10' width='100%'>
              <Text fontSize='1rem' textAlign='center'>Apakah kamu menyukai artikelnya?</Text>
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
                  fontSize='1rem'
                  onClick={() => void likeArticle()}
                  isDisabled={disabled}
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
                  fontSize='1rem'
                  onClick={() => void dislikeArticle()}
                  isDisabled={disabled}
                />
              </Flex>
            </Box>
            <Flex width='100%' my='14' justifyContent='center'>
              <CarouselDetail data={paginatedData} />
            </Flex>
          </Flex>
        </Flex>
      ) : (
        null
      )}
    </Layout>
  );
}


export default BlogDetailPage;
