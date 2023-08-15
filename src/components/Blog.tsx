import Layout from '~/layout';
import { Text, Grid, Button, Flex } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronLeft } from 'react-icons/bi';
import { colors } from '~/styles/component/colors';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md';
// import { Input } from '~/styles/component/input';
import ArticleCard from '~/components/article-list/card';
import { useState, useEffect } from 'react';
import { api } from '~/utils/api';
import type { PostOrPage } from '@tryghost/content-api';
import ArticleListBackground from '~/components/background/ArticleListBackGround';
import DropdownFilter from '~/components/article-list/DropdownFilter';
import Carousel from './article-list/Carousel';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Link from 'next/link';

interface PaginatedProps {
  data: PostOrPage[];
  currentPage: number;
}

const Cards: React.FC<PaginatedProps> = ({ data }) => {
  return (
    <Grid
      w={'98%'}
      maxW={'1056px'}
      marginX={'auto'}
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(4, 1fr)'
      }}
      templateRows={{
        base: 'repeat(8, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(2, 1fr)'
      }}
      rowGap={{ base: '20px', lg: '50px' }}
      mt={'28px'}
    >
      {data.map((item, index) => {
        return (
          <ArticleCard
            image={item.feature_image}
            text={item.plaintext ?? ''}
            title={item.title ?? ''}
            slug={item.slug}
            key={index}
          />
        );
      })}
    </Grid>
  );
};

const ArticleList = () => {
  const articleListQuery = api.cms.getArticlesList.useQuery({
    currentPage: 1,
    sortBy: 'published_at DESC',
    limitPerPage: 8,
    searchQuery: undefined
  });

  const cardsData = articleListQuery.data;
  const paginatedData = cardsData?.data || ([] as PostOrPage[]);

  return (
    <Layout title='Blog'>
      <ArticleListBackground />
      <Flex h='full' w='full' direction='column'>
        <Carousel data={paginatedData} />
        <Flex direction='column' rowGap={10} my='2rem'>
          <Cards currentPage={1} data={paginatedData} />

          <Button w={'fit-content'} mx='auto'>
            <Link href='/blog/article-list'>
              <Flex columnGap={3} alignItems={'center'}>
                <Text>More Articles</Text>
                <AiOutlineArrowRight size={20} />
              </Flex>
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ArticleList;
