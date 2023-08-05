import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';
import Layout from '~/layout';
import { colors } from '~/styles/component/colors';
import VisMis from '~/components/VisMis';
import HistoryCarousel from '~/components/HistoryCarousel';
import _ from 'lodash';

export default function AboutUs() {
  return (
    <Layout title='About Us'>
      <Flex
        flexDirection='column'
        w='100%'
        h='100%'
        px={10}
        pb='600px'
        zIndex='-100'
      >
        <Box
          position='absolute'
          inset='0'
          margin='auto'
          overflow='hidden'
          zIndex='-99'
        >
          <Flex
            bgImage='/images/bg-about-us.svg'
            bgSize='cover'
            bgRepeat='no-repeat'
            w='100%'
            h='100%'
            position='absolute'
            zIndex='-99'
          ></Flex>
        </Box>
        <Box mx={{ base: '8%', md: '22%' }}>
          <Flex justifyContent='center' pb='60px' pt='190px'>
            <Heading
              size='3xl'
              color='yellow.5'
              textShadow={`0px 0px 10px ${colors.yellow[5]}`}
              textAlign='center'
            >
              About Us
            </Heading>
          </Flex>
          <Text
            align='justify'
            color='white'
            textShadow={`0px 0px 10px ${colors.yellow[5]}`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text
            align='justify'
            color='white'
            textShadow={`0px 0px 10px ${colors.yellow[5]}`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text
            align='justify'
            color='white'
            textShadow={`0px 0px 10px ${colors.yellow[5]}`}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Box>
        <VisMis
          title='VISI'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.'
        />
        <VisMis
          title='MISI'
          text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.'
        />
        <HistoryCarousel />
      </Flex>
    </Layout>
  );
}
