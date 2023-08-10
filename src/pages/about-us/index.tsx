import { Box, Heading, Text, Flex } from '@chakra-ui/react';
import Layout from '~/layout';
import { colors } from '~/styles/component/colors';
import VisMis from '~/components/about-us/VisMis';
import HistoryCarousel from '~/components/about-us/HistoryCarousel';
import { AboutUsBackground } from '~/components/background/AboutUsBackground';
import { useState } from 'react';

export default function AboutUs() {
  const [isPreview, setIsPreview] = useState<boolean>(true);

  return (
    <Layout title='About Us'>
      <Flex flexDirection='column' w='100%' h='100%' pb='580px'>
        <AboutUsBackground isPreview={isPreview} />
        <Box mx={{ base: '8%', md: '22%' }}>
          <Flex justifyContent='center' pb='60px' pt='200px'>
            <Heading
              size='3xl'
              color='yellow.5'
              textShadow={`0px 0px 10px ${colors.yellow[5]}`}
              textAlign='center'
            >
              About Us
            </Heading>
          </Flex>
          <Flex justifyContent='center' pb='20px' pt='20px'>
            <Heading
              size='xl'
              color='yellow.5'
              textShadow={`0px 0px 10px ${colors.yellow[5]}`}
              textAlign='center'
            >
              APA ITU OSKM?
            </Heading>
          </Flex>
          <Text
            align='justify'
            color='white'
            textShadow={`0px 0px 10px ${colors.yellow[5]}`}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            OSKM (atau Orientasi Studi Keluarga Mahasiswa) ITB merupakan
            rangkaian kegiatan dalam upaya menyambut Mahasiswa Baru ITB dan
            memperkenalkan corak peradaban di ITB serta membantu mempersiapkan
            Mahasiswa Baru untuk berkuliah di ITB.
          </Text>
        </Box>
        <VisMis title='VISI' />
        <VisMis title='MISI' />
        <HistoryCarousel isPreview={isPreview} setIsPreview={setIsPreview} />
      </Flex>
    </Layout>
  );
}
