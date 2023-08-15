import Layout from "~/layout";
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
  Show,
  Container
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import { colors } from "~/styles/component/colors";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from "react-icons/md";
import ArticleCard from "~/components/article-list/ArticleCard";
import { useState, useEffect } from "react";
import { api } from "~/utils/api";
import type { PostOrPage } from "@tryghost/content-api";
import ArticleListBackground from "~/components/background/ArticleListBackGround";
import DropdownFilter from "~/components/article-list/DropdownFilter";
import { useRouter } from "next/router";

interface PaginatedProps {
  data: PostOrPage[];
  currentPage: number;
}

const Cards: React.FC<PaginatedProps> = ({ data }) => {
  return (
    <Grid
      w={"98%"}
      maxW={"1056px"}
      marginX={"auto"}
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)"
      }}
      templateRows={{ base: "repeat(8, 1fr)", lg: "repeat(4, 1fr)" }}
      rowGap={{ base: "20px", lg: "50px" }}
      mt={"28px"}
    >
      {data.map((item, index) => {
        return (
          <ArticleCard
            image={item.feature_image}
            text={item.plaintext ?? ""}
            title={item.title ?? ""}
            slug={item.slug}
            key={index}
          />
        );
      })}
    </Grid>
  );
};

const ArticleList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState("published_at DESC");
  const [openSort, setOpenSort] = useState(false);

  // Perform Fetchin Data

  function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
      const timer = setTimeout(() => setDebouncedValue(value), delay || 1000);

      return () => {
        clearTimeout(timer);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const searchValue = useDebounce(searchQuery);

  const articleListQuery = api.cms.getArticlesList.useQuery({
    currentPage: currentPage,
    sortBy: sortBy,
    limitPerPage: 16,
    searchQuery: searchValue
  });

  const cardsData = articleListQuery.data;
  const paginatedData = cardsData?.data || ([] as PostOrPage[]);

  const totalPages = cardsData?.meta.pagination.pages || 0;
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
        pageButtons.push(1, "...");
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
        pageButtons.push("...", totalPages);
      }
    }

    return pageButtons;
  };
  return (
    <Layout title='Article List'>
      <ArticleListBackground />
      <Box
        bgImage={"./images/article-blog/bg_article.svg"}
        objectFit={"cover"}
        bgRepeat={"no-repeat"}
      >
        <HStack
          marginTop={{ base: "116px", lg: "164px" }}
          spacing={{ base: "14px", lg: "29px" }}
          color='green.5'
          marginLeft={{ base: "4.2667%", lg: "10.20833%" }}
        >
          <IconButton
            aria-label='back-arrow'
            variant='ghost'
            color='green.5'
            _hover={{ color: `${colors.green[3]}` }}
            _active={{ color: `${colors.green[4]}` }}
            onClick={() => router.back()}
          >
            <BiChevronLeft size='65px' />
          </IconButton>
          <Heading size={{ base: "md", lg: "lg" }}>List of Articles</Heading>
        </HStack>
        <InputGroup
          textColor={"white"}
          marginTop={"37px"}
          maxW={{ base: "60%", lg: "50%" }}
          marginX={"auto"}
        >
          <Input
            value={searchQuery}
            placeholder='Search article'
            _placeholder={{ color: "white" }}
            variant={"filledLight"}
            paddingLeft={{ base: "25px", lg: "32px" }}
            paddingRight={{ base: "60px", lg: "67px" }}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputRightElement
            marginRight={{ base: "25px", lg: "32px" }}
            w={"fit-content"}
          >
            <AiOutlineSearch size={"24px"} />
          </InputRightElement>
        </InputGroup>

        <Show above='lg'>
          <Flex
            marginTop={"12px"}
            alignItems={"center"}
            w={"full"}
            justifyContent={"center"}
            columnGap={8}
          >
            <Text
              color={"green.5"}
              textAlign={"center"}
              fontWeight={"bold"}
              fontSize={"24px"}
            >
              Hasil Pencarian Anda
            </Text>
            <Box
              w={"23px"}
              h={"23px"}
              bg={"yellow.5"}
              borderRadius={"md"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              _hover={{ cursor: "pointer" }}
              onClick={() => setOpenSort(!openSort)}
            >
              <Image
                src='/images/article-blog/button_icon.svg'
                alt='open-sort'
              />
            </Box>
            {openSort && (
              <DropdownFilter
                setSortValue={setSortBy}
                sortValue={sortBy}
                placeholder='Urutkan Berdasarkan'
              />
            )}
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
                style={{ cursor: currentPage > 1 ? "pointer" : "not-allowed" }}
                zIndex='1'
                aria-label='Previous Page'
                variant={"ghost"}
                icon={<MdOutlineArrowBackIosNew width='12px' height='12px' />}
              />
              {getPageButtons().map((button, index) => (
                <Text
                  key={index}
                  zIndex='1'
                  color={"navy.2"}
                  fontWeight={button === currentPage ? "700" : "400"}
                  textAlign='center'
                  lineHeight='40px'
                  //   top='50%'
                  //   left='50%'
                  //   transform='translate(-50%,-50%)'
                  width='100%'
                  onClick={() => {
                    if (typeof button === "number") {
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
                  cursor: currentPage < totalPages ? "pointer" : "not-allowed"
                }}
                zIndex='1'
                aria-label='Next Page'
                variant={"ghost"}
                icon={<MdOutlineArrowForwardIos width='12px' height='12px' />}
              />
            </Flex>
          </Container>
        </Show>
      </Box>
    </Layout>
  );
};

export default ArticleList;
