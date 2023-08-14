import { Box, Select, Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

const DropdownFilter = ({
    placeholder,
    sortValue,
    setSortValue
  }: {
    placeholder: string | undefined;
    sortValue: string;
    setSortValue: Dispatch<SetStateAction<string>>;
  }) => {
    // const getCampusesQuery = api.interactiveMap.getCampuses.useQuery();
    // const getCampusInfoQuery = api.interactiveMap.getCampusInfo.useQuery({
    //   campus: selectedCampus
    // });
    return (
    <>
        <Select
        zIndex={2}
        placeholder={placeholder}
        onChange={(e) => {
            setSortValue(e.target.value)
        }}
        width='259px'
        height='40px'
        bg='yellow.5'
        color='black'
        position='absolute'
        bottom={{lg:'-9px'}}
        top={{base:'33.5px', lg:''}}
        left={{base:'-237px', lg:'37px'}}
        fontFamily='SomarRounded-Bold'
        textColor='black'
        fontSize='16px'
        fontWeight='700'
        fontStyle='normal'
        lineHeight='150%'
        transition='all 0.2s ease-in-out'
        border={'none'}
        _hover={{
            opacity: 0.8
        }}
        css={{
            option: {
            background: '#FFFC83',
            hover: '#FFBE3B'
            }
        }}
        >
        <option value="terbaru">
            Terbaru
        </option>
        <option value="rekomendasi">
            Rekomendasi
        </option>
        <option value="a-z">
            A-Z
        </option>
        <option value="z-a">
            Z-A
        </option>
        </Select>
        <Box pos={'absolute'} w={'106px'} top={{base:'0px', lg:'-46px'}} left={'219px'}>
            <Image src="./images/article-blog/berekor_1.svg" boxSize='106px' objectFit='contain' />
        </Box>
    </>
    );
  };

  export default DropdownFilter;