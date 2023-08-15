import {
  Flex,
  Image,
  Box,
  Text,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Grid,
  Spinner,
  Container,
  Show
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
import ArticleCard from './ArticleCard';
import Navbar from '~/components/Navbar';
import { useState, useDeferredValue, useEffect } from 'react';
import { api } from '~/utils/api';
import type { PostOrPage } from '@tryghost/content-api';
import { LoadingSuspense } from '~/components/Loading';
import DropdownFilter from './DropdownFilter';
import ArticleListBackground from '../background/ArticleListBackGround';

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
      rowGap={{ base: '20px', lg: '50px' }}
      mt={'28px'}
    >
      {data.map((item, index) => {
        return (
          <ArticleCard
            image={item.feature_image}
            text={item.html ?? ''}
            title={item.title ?? ''}
            key={index}
          />
        );
      })}
    </Grid>
  );
};

const cardperPage = 16;

const SearchCards = (props: {
  deferedValue: string | undefined;
  sortby: string | undefined;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<PostOrPage[]>([])
  const cursor = 1 as number;
  const limit = 40 as number;
  // Perform Fetchin Data

  const {
    data: getDataArticle,
    isLoading,
    isFetching
  } = api.cms.getArticlesList.useQuery({
    currentPage: cursor,
    limitPerPage: limit,
    searchQuery: props.deferedValue
  });

  
  const cardsData = getDataArticle?.data;
  
  
  useEffect(() => {
    const paginatedData = cardsData?.slice(
      (currentPage - 1) * cardperPage,
      currentPage * cardperPage
    );
    if(!paginatedData) return
    if(!props.sortby){
      setFilteredData(paginatedData)
    }

    if (props.sortby === 'a-z') {
      paginatedData.sort((a, b) => {
        const nameA = a.title!.toLowerCase();
        const nameB = b.title!.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setFilteredData(paginatedData)
    } else if (props.sortby === 'z-a'){
      paginatedData.sort((a, b) => {
        const nameA = a.title!.toLowerCase();
        const nameB = b.title!.toLowerCase();

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
        return 0;
      });
      setFilteredData(paginatedData)
    } else if (props.sortby == 'rekomendasi'){
      paginatedData.sort((a, b) => {
        const readA = a.reading_time;
        const readB = b.reading_time;

        if ((readA ?? 0) < (readB ?? 0)) {
          return 1;
        }
        if ((readA ?? 0) > (readB ?? 0)) {
          return -1;
        }
        return 0;
      });
      setFilteredData(paginatedData)
    }

  }, [props.sortby,getDataArticle]);

  if(!cardsData){
    return <Spinner width='12px' height='12px' />
  }
  const totalCard = cardsData.length;
  const totalPages = Math.ceil(totalCard / cardperPage);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
      <Cards currentPage={currentPage} data={filteredData} />
      <Show above='lg'>
        <Container width='350px' height='45px' padding='0' my='50px' zIndex='2'>
          <Flex justifyContent='space-between' alignItems='center'>
            <IconButton
              onClick={() => handlePageChange(currentPage - 1)}
              color={'navy.2'}
              style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}
              zIndex='1'
              aria-label='Previous Page'
              variant={'ghost'}
              icon={<MdOutlineArrowBackIosNew width='12px' height='12px' />}
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
              color={'navy.2'}
              style={{
                cursor: currentPage < totalPages ? 'pointer' : 'not-allowed'
              }}
              zIndex='1'
              aria-label='Next Page'
              variant={'ghost'}
              icon={<MdOutlineArrowForwardIos width='12px' height='12px' />}
            />
          </Flex>
        </Container>
      </Show>
    </>
  );
};

const ArticleList = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | undefined>('');
  const [sortValue, setSortValue] = useState<string>('');
  const deferedValue = useDeferredValue(searchQuery);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };


  return (
    <>
      <ArticleListBackground/>
      <Box
        paddingTop={{ base: '116px', lg: '164px' }}
        minH={'2167px'}
      >
        <HStack
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
          maxW={{ base: '240px', lg: '784px' }}
          marginX={'auto'}
          marginBottom={`${open == false ?  '78px' : '0px'}`}
        >
          <Input
            placeholder='Search article'
            _placeholder={{ color: 'white' }}
            variant={'filledLight'}
            paddingLeft={{ base: '25px', lg: '32px' }}
            paddingRight={{ base: '60px', lg: '67px' }}
            onChange={handleChange}
            onClick={() => setOpen(false)}
            value={searchQuery}
          />
          <InputRightElement
            marginRight={{ base: '25px', lg: '32px' }}
            w={'fit-content'}
          >
            <AiOutlineSearch size={'24px'} />
          </InputRightElement>
        </InputGroup>
        {searchQuery != '' && (
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
              <Box position={'relative'} left={{base:'14px', lg:'82px'}} w={0}>
                <Box
                  w={'23px'}
                  h={'23px'}
                  bg={'yellow.5'}
                  borderRadius={'md'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  _hover={{opacity: '80%'}}
                  onClick={() => setOpen(!open)}
                >
                  <Image src='/images/article-blog/button_icon.svg' />
                </Box>
                {open && (
                  <DropdownFilter
                    setSortValue={setSortValue}
                    sortValue={sortValue}
                    placeholder='Urutkan Berdasarkan'
                  />
                )}
              </Box>
            </Flex>
        )}
        <SearchCards sortby={sortValue} deferedValue={deferedValue} />
      </Box>
    </>
  );
};
export default ArticleList;
