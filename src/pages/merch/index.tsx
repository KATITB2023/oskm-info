import Layout from '~/layout';
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import MerchCard from './merchcard';

export default function Merch() {
  return (
    <>
      <Layout title='Merch'>
        <Flex
          height='100vh'
          position='absolute'
          w='100%'
          inset='0'
          flexDirection='column'
          gap='5rem'
          backgroundImage='/images/merch-blur.png'
          backgroundRepeat='no-repeat'
          alignItems='center'
          backgroundPosition='center center'
          overflowY='scroll'
          overflowX='hidden'
          backgroundSize={{ base: 'initial', lg: 'cover' }}
          sx={{
            '&::-webkit-scrollbar': {
              width: 'x',
              borderRadius: '144px',
              background: 'transparent',
              boxShadow: '0px 4px 30px 0px #72D8BA',
              marginRight: '1rem'
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'var(--yellow-yellow-5, #FFFC83)',
              borderRadius: '144px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'var(--yellow-yellow-6, #FFEB3B)'
            },
            '&::-webkit-scrollbar-track': {
              background: 'var(--gray-100, #E2E8F0)',
              borderRadius: '144px',
              backdropFilter: 'blur(40px)'
            }
          }}
        >
          <Text
            fontSize={{ base: '50px', md: '100px' }}
            fontWeight='bold'
            color='#FFFC83'
            fontFamily='Bodwars'
            margin={{ base: '5rem 0 0 0', md: '10rem 0 0 0' }}
            textShadow='0px 4px 30px #72D8BA'
            lineHeight='30px'
            zIndex='1'
          >
            Merch
          </Text>

          <Image
            src='/images/merch-aurora.png'
            alt='aurora'
            w={{ base: '300px', md: '500px' }}
            position='absolute'
            left='0'
            top={{ base: '0rem', md: '7rem' }}
            zIndex='0'
          />

          <Image
            src='/images/merch-small-sparks.png'
            alt='small-sparks'
            w={{ base: '200px', md: '300px' }}
            position='absolute'
            top={{ base: '35rem', md: '30rem' }}
            left={{ base: '0', md: '0' }}
            zIndex='0'
          />

          <Image
            src='/images/merch-large-rocks.png'
            alt='large-rocks'
            w={{ base: '100%', md: '100%' }}
            position='absolute'
            bottom={{ base: '-150rem', md: '-120rem', xl: '-100rem' }}
            zIndex='0'
          />

          <Image
            src='/images/merch-small-rocks.png'
            alt='small-rocks'
            w={{ base: '50%', md: '50%' }}
            position='absolute'
            bottom={{ base: '-135rem', md: '-90rem', xl: '-75rem' }}
            zIndex='0'
            right='0'
          />

          <Flex
            gap='3rem'
            display={{ base: 'flex' }}
            mb={{ base: '0', md: '10rem' }}
            flexDirection={{ base: 'column', md: 'row' }}
            position='relative'
          >
            <Flex flexDirection='column' alignItems='center' gap='0.5rem'>
              <Image
                src='/images/merch-moon-star-1.png'
                alt='half-moon'
                w={{ base: '300px' }}
                position='absolute'
                top={{ base: '-18rem', md: '-16rem' }}
                left={{ base: '-6rem', md: '-10rem' }}
                zIndex='1'
              />
              <Image
                src='/images/merch-moon-star-2.png'
                alt='half-moon'
                w={{ base: '300px' }}
                position='absolute'
                top={{ base: '-18rem', md: '-13rem' }}
                left={{ base: '0rem', md: '-2rem' }}
                zIndex='1'
              />
              <Image
                src='/images/merch-half-moon.png'
                alt='half-moon'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '-10rem', md: '-10rem' }}
                left={{ base: '-9rem', md: '-20rem' }}
                zIndex='0'
              />
              <Image
                src='/images/merch-star.png'
                alt='half-moon'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '15rem', md: '-10rem' }}
                right={{ base: '-12rem', md: '-25rem' }}
                zIndex='0'
              />

              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Tokopedia
              </Text>
              <Button
                padding='1.5rem 3.5rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
                zIndex='100'
              >
                Ganesha Goods
              </Button>
            </Flex>
            <Flex flexDirection='column' alignItems='center' gap='0.5rem'>
              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Pre-Order
              </Text>
              <Button
                padding='1.5rem 3.5rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
              >
                Order Now !
              </Button>
            </Flex>
            <Flex flexDirection='column' alignItems='center' gap='0.5rem'>
              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Instagram
              </Text>
              <Button
                padding='1.5rem 3.5rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
              >
                @ganeshagoods
              </Button>
            </Flex>
          </Flex>

          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap='5rem'
          >
            <Box position='relative'>
              <Image
                src='/images/merch-yellow-comet.png'
                alt='yellow-comet'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '0rem', md: '1rem' }}
                left={{ base: '-7rem', md: '-10rem' }}
                zIndex='0'
              />

              <Image
                src='/images/merch-galaxy-aura.png'
                alt='small-sparks'
                w={{ base: '200px', md: '0' }}
                position='absolute'
                top={{ base: '15rem', md: '30rem' }}
                left={{ base: '-7rem', sm: '-10rem', md: '0' }}
                zIndex='0'
              />

              <MerchCard
                title='Mug'
                price={22000}
                productImage='/images/merch-mug.png'
                spaceImage='/images/merch-asteroid-1.png'
                productWidth='180px'
                spaceWidth=''
              />
            </Box>

            <Box position='relative'>
              <MerchCard
                title='Lanyard'
                price={18000}
                productImage='/images/merch-lanyard-1.png'
                secondImage='/images/merch-lanyard-2.png'
                spaceImage='/images/merch-asteroid-2.png'
                productWidth='39px'
                spaceWidth=''
              />

              <Image
                src='/images/merch-blue-lightning.png'
                alt='small-sparks'
                w={{ base: '300px', md: '0' }}
                position='absolute'
                top={{ base: '14rem', md: '30rem' }}
                right={{ base: '-6rem', sm: '-10rem', md: '0' }}
                zIndex='0'
              />

              <Image
                src='/images/merch-moon-star-2.png'
                alt='half-moon'
                w={{ base: '500px', md: '0' }}
                position='absolute'
                top={{ base: '18rem', md: '-13rem' }}
                left={{ base: '5rem', md: '-2rem' }}
                zIndex='1'
              />
            </Box>
            <MerchCard
              title='Korek Api'
              price={15000}
              productImage='/images/merch-korek-api.png'
              spaceImage='/images/merch-asteroid-3.png'
              productWidth='46px'
              spaceWidth=''
            />

            <Box position='relative'>
              <Image
                src='/images/merch-pink-lightning.png'
                alt='small-sparks'
                w={{ base: '100%', md: '0' }}
                position='absolute'
                top={{ base: '-6rem', md: '30rem' }}
                left={{ base: '-8rem', sm: '-10rem', md: '0' }}
                zIndex='0'
              />
              <MerchCard
                title='Gantungan Kunci'
                price={8000}
                productImage='/images/merch-ganci.png'
                spaceImage='/images/merch-bulan-1.png'
                productWidth='176px'
                spaceWidth='200px'
              />
            </Box>

            <Box position='relative'>
              <Image
                src='/images/merch-pink-comet.png'
                alt='small-sparks'
                w={{ base: '300px', md: '100%' }}
                position='absolute'
                top={{ base: '8rem', md: '30rem' }}
                right={{ base: '6rem', md: '-15rem' }}
                zIndex='0'
              />
              <MerchCard
                title='Stiker'
                price={10000}
                productImage='/images/merch-sticker.png'
                spaceImage='/images/merch-bulan-2.png'
                productWidth='135px'
                spaceWidth=''
              />
            </Box>
            <MerchCard
              title='Kipas'
              price={12000}
              productImage='/images/merch-kipas.png'
              spaceImage='/images/merch-bulan-3.png'
              productWidth='162px'
              spaceWidth=''
            />
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}
