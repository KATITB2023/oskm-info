import {
  Flex,
  Image,
  Box,
  Text,
  Heading,
  VStack,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  GridItem,
  AbsoluteCenter,
  Show,
  Container
} from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { colors } from '~/styles/component/colors';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from 'react-icons/md';
// import { Input } from '~/styles/component/input';
import Fonts from '~/styles/fonts';
import ArticleCard from './card';
import Navbar from '~/components/Navbar';
import { useState } from 'react';
import { dummyData } from './data';
import { api } from '~/utils/api';
import Custom404 from '../404';
import type { PostOrPage } from '@tryghost/content-api';


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
      templateRows={{ base: 'repeat(8, 1fr)', lg: 'repeat(4, 1fr)' }}
      rowGap={{ base: '20px', lg: '50px' }}
      mt={'28px'}
    >
      {data.map((item, index) => {
        return (
          <ArticleCard
            image={item.feature_image}
            text={item.plaintext ?? ''}
            title={item.title ?? ''}
            key={index}
          />
        );
      })}
    </Grid>
  );
};

const cardperPage = 16;

const ArticleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery,setSearchQuery] = useState<string|undefined>(undefined);
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery)
  }
  const cursor = 1 as number;
  const limit = 40 as number;
  // Perform Fetchin Data

  const getDataArticle = api.cms.adminGetArticlesList.useQuery({
    currentPage : cursor,
    limitPerPage: limit,
    searchQuery:searchQuery
  })
  const cardsData = getDataArticle.data
  if(!cardsData){
    return <Custom404 />
  }
  const totalCard = cardsData.data.length;
  const totalPages = Math.ceil(totalCard / cardperPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const paginatedData = cardsData.data.slice(
    (currentPage - 1) * cardperPage,
    currentPage * cardperPage
  );
  const getPageButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(i);
      }
    } else {
      const leftEllipsis = currentPage > 3;
      const rightEllipsis = currentPage < totalPages - 2;

      if (leftEllipsis) {
        pageButtons.push(1, '...');
      }

      let startPage = currentPage;
      let endPage = currentPage + 1;

      if (endPage > totalPages) {
        endPage = totalPages;
      }

      if (rightEllipsis) {
        endPage = totalPages - 2;
        startPage = Math.max(1, currentPage - 2);
      } else if (leftEllipsis) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }

      if (rightEllipsis) {
        if (currentPage <= 3) {
          for (let i = startPage; i <= startPage + 2; i++) {
            pageButtons.push(i);
          }
        } else {
          for (let i = startPage; i <= startPage + 2; i++) {
            pageButtons.push(i + 1);
          }
        }
      } else if (leftEllipsis) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageButtons.push(i);
        }
      }

      if (rightEllipsis) {
        pageButtons.push('...', totalPages);
      }
    }

    return pageButtons;
  };
  return (
    <>
      <Navbar />
      <Box bgImage={'./images/article-blog/bg_article.svg'} objectFit={'cover'} bgRepeat={'no-repeat'}>
        <HStack
          marginTop={{ base: '116px', lg: '164px' }}
          spacing={{ base: '14px', lg: '29px' }}
          color='green.5'
          marginLeft={{ base: '4.2667%', lg: '10.20833%' }}
        >
          <IconButton
            aria-label='back-arrow'
            variant='ghost'
            color='green.5'
            _hover={{ color: `${colors.green[3]}` }}
            _active={{ color: `${colors.green[4]}` }}
          >
            <BiChevronLeft size='65px' />
          </IconButton>
          <Heading size={{ base: 'md', lg: 'lg' }}>List of Articles</Heading>
        </HStack>
        <InputGroup
          textColor={'white'}
          marginTop={'37px'}
          maxW={{ base: '177px', lg: '784px' }}
          marginX={'auto'}
        >
          <Input
            placeholder='Search article'
            _placeholder={{ color: 'white' }}
            variant={'filledLight'}
            paddingLeft={{ base: '25px', lg: '32px' }}
            paddingRight={{ base: '60px', lg: '67px' }}
            onChange={handleChange}
          />
          <InputRightElement
            marginRight={{ base: '25px', lg: '32px' }}
            w={'fit-content'}
          >
            <AiOutlineSearch size={'24px'} />
          </InputRightElement>
        </InputGroup>
        <Show above='lg'>
          <Flex
            marginTop={'12px'}
            alignItems={'center'}
            w={'full'}
            justifyContent={'center'}
          >
            <Text
              color={'green.5'}
              textAlign={'center'}
              fontWeight={'bold'}
              fontSize={'24px'}
            >
              Hasil Pencarian Anda
            </Text>
            <Box position={'relative'} left={'82px'}>
              <Box
                w={'23px'}
                h={'23px'}
                bg={'yellow.5'}
                borderRadius={'md'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Image src='/images/article-blog/button_icon.svg' />
              </Box>
            </Box>
          </Flex>
        </Show>
        <Cards currentPage={currentPage} data={paginatedData} />
        <Show above='lg'>
            <Container
            width='350px'
            height='45px'
            padding='0'
            my='50px'
            zIndex='2'
            >
            <Flex justifyContent='space-between' alignItems='center'>
                <IconButton
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
                zIndex='1'
                aria-label='Previous Page'
                variant={'ghost'}
                icon={<MdOutlineArrowBackIosNew width='12px' height='12px'/>}
                />
                {getPageButtons().map((button, index) => (
                    <Text
                    key={index}
                    zIndex='1'
                    color={'navy.2'}
                    fontWeight={button === currentPage ? '700' : '400'}
                    textAlign='center'
                    lineHeight='40px'
                    //   top='50%'
                    //   left='50%'
                    //   transform='translate(-50%,-50%)'
                    width='100%'
                    onClick={() => {
                        if (typeof button === 'number') {
                        handlePageChange(button);
                        }
                    }}
                    >
                    {button}
                    </Text>
                ))}
                <IconButton
                onClick={() => handlePageChange(currentPage + 1)}
                style={{
                    cursor: currentPage < totalPages ? 'pointer' : 'not-allowed'
                }}
                zIndex='1'
                aria-label='Next Page'
                variant={'ghost'}
                icon={<MdOutlineArrowForwardIos width='12px' height='12px'/>}
                />
            </Flex>
            </Container>
        </Show>
      </Box>
    </>
  );
};
export default ArticleList;
