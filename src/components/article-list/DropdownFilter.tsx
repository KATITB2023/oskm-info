import { Box, Select, Image } from '@chakra-ui/react';
import type { Dispatch, SetStateAction } from 'react';

const DropdownFilter = ({
  placeholder,
  setSortValue
}: {
  placeholder: string | undefined;
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
}) => {
  const menuItem = [
    { text: 'Terbaru', value: 'published_at DESC', selected: false },
    { text: 'Rekomendasi', value: 'published_at ASC', selected: false },
    { text: 'A-Z', value: 'title ASC', selected: false },
    { text: 'Z-A', value: 'title DESC', selected: false }
  ];
  return (
    <Box pos={'relative'}>
      <Select
        onChange={(e) => {
          setSortValue(e.target.value);
        }}
        placeholder={placeholder}
        borderRadius={'10px'}
        width='259px'
        height='40px'
        bg='yellow.5'
        color='black'
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
        {menuItem.map((menu) => {
          return (
            <option key={menu.value} value={menu.value}>
              {menu.text}
            </option>
          );
        })}
      </Select>
      <Box zIndex={3} pos={'absolute'} top={'-40px'} right={'-40px'}>
        <Image
          src='./images/article-blog/berekor_1.svg'
          alt='option image'
          boxSize='106px'
          objectFit='contain'
        />
      </Box>
    </Box>
  );
};

export default DropdownFilter;
