import Layout from '~/layout';
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import MerchCard from '../../components/merch/merchcard';

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
          backgroundImage='/images/merch/merch-blur.png'
          backgroundRepeat='no-repeat'
          alignItems='center'
          backgroundPosition='center center'
          overflowY='scroll'
          overflowX='hidden'
          paddingTop='10rem'
          backgroundSize={{ base: 'initial', lg: 'cover' }}
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
            src='/images/merch/merch-aurora.png'
            alt='aurora'
            w={{ base: '300px', md: '500px' }}
            position='absolute'
            left='0'
            top={{ base: '0rem', md: '7rem' }}
            zIndex='0'
            draggable='false'
          />

          <Image
            src='/images/merch/merch-aurora.png'
            alt='aurora'
            w={{ base: '300px', md: '500px' }}
            position='absolute'
            left='0'
            top={{ base: '0rem', md: '250rem' }}
            zIndex='0'
            draggable='false'
          />

          <Image
            src='/images/merch/merch-small-sparks.png'
            alt='small-sparks'
            w={{ base: '200px', md: '300px' }}
            position='absolute'
            top={{ base: '35rem', md: '30rem' }}
            left={{ base: '0', md: '0' }}
            zIndex='0'
            draggable='false'
          />

          <Image
            src='/images/merch/merch-small-sparks.png'
            alt='small-sparks'
            w={{ base: '200px', md: '300px' }}
            position='absolute'
            top={{ base: '35rem', md: '130rem' }}
            right={{ base: '0', md: '0' }}
            zIndex='0'
            draggable='false'
            transform='scaleX(-1)'
          />

          <Image
            src='/images/merch/merch-large-rocks.png'
            alt='large-rocks'
            w={{ base: '100%', md: '100%' }}
            position='absolute'
            bottom={{ base: '-530rem', md: '-420rem', xl: '-300rem' }}
            zIndex='0'
            draggable='false'
          />

          <Image
            src='/images/merch/merch-small-rocks.png'
            alt='small-rocks'
            w={{ base: '50%', md: '50%' }}
            position='absolute'
            bottom={{ base: '-135rem', md: '-90rem', xl: '-75rem' }}
            zIndex='0'
            left='0'
            draggable='false'
            transform='scaleX(-1)'
          />

          <Image
            src='/images/merch/merch-small-rocks.png'
            alt='small-rocks'
            w={{ base: '50%', md: '50%' }}
            position='absolute'
            bottom={{ base: '-185rem', md: '-140rem', xl: '-175rem' }}
            right={{ base: '0', md: '0', xl: '0rem' }}
            zIndex='0'
            draggable='false'
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
                src='/images/merch/merch-moon-star-1.png'
                alt='half-moon'
                w={{ base: '300px' }}
                position='absolute'
                top={{ base: '-18rem', md: '-16rem' }}
                left={{ base: '-6rem', md: '-10rem' }}
                zIndex='1'
                draggable='false'
              />
              <Image
                src='/images/merch/merch-moon-star-2.png'
                alt='half-moon'
                w={{ base: '300px' }}
                position='absolute'
                top={{ base: '-18rem', md: '-13rem' }}
                left={{ base: '0rem', md: '-2rem' }}
                zIndex='1'
                draggable='false'
              />
              <Image
                src='/images/merch/merch-half-moon.png'
                alt='half-moon'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '-10rem', md: '-10rem' }}
                left={{ base: '-9rem', md: '-20rem' }}
                zIndex='0'
                draggable='false'
              />
              <Image
                src='/images/merch/merch-star.png'
                alt='half-moon'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '15rem', md: '-10rem' }}
                right={{ base: '-12rem', md: '-25rem' }}
                zIndex='0'
                draggable='false'
              />

              <Text color='#FFF' fontFamily='SomarRounded-Regular'>
                Tokopedia
              </Text>
              <Button
                padding='1.5rem 3.5rem'
                fontFamily='SomarRounded-Regular'
                variant='outline'
                zIndex='1'
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
                src='/images/merch/merch-yellow-comet.png'
                alt='yellow-comet'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '0rem', md: '1rem' }}
                left={{ base: '-7rem', md: '-10rem' }}
                zIndex='0'
                draggable='false'
              />

              <Image
                src='/images/merch/merch-galaxy-aura.png'
                alt='small-sparks'
                w={{ base: '200px', md: '0' }}
                position='absolute'
                top={{ base: '15rem', md: '30rem' }}
                left={{ base: '-7rem', sm: '-10rem', md: '0' }}
                zIndex='0'
                draggable='false'
              />

              <MerchCard
                title='Mug'
                price={22000}
                spaceImage='/images/merch/merch-asteroid-1.png'
                productImages={['/images/merch/merch-mug.png']}
                productWidth='178px'
                spaceWidth=''
              />
            </Box>

            <Box position='relative'>
              <MerchCard
                title='Lanyard'
                price={18000}
                productImages={['/images/merch/merch-lanyard-1.png']}
                secondImage='/images/merch/merch-lanyard-2.png'
                spaceImage='/images/merch/merch-asteroid-2.png'
                productWidth='35px'
                spaceWidth=''
              />

              <Image
                src='/images/merch/merch-blue-lightning.png'
                alt='small-sparks'
                w={{ base: '300px', md: '0' }}
                position='absolute'
                top={{ base: '14rem', md: '30rem' }}
                right={{ base: '-6rem', sm: '-10rem', md: '0' }}
                zIndex='0'
                draggable='false'
              />

              <Image
                src='/images/merch/merch-moon-star-2.png'
                alt='half-moon'
                w={{ base: '500px', md: '0' }}
                position='absolute'
                top={{ base: '18rem', md: '-13rem' }}
                left={{ base: '5rem', md: '-2rem' }}
                zIndex='1'
                draggable='false'
              />
            </Box>
            <MerchCard
              title='Korek Api'
              price={15000}
              spaceImage='/images/merch/merch-asteroid-3.png'
              productImages={['/images/merch/merch-korek-api.png']}
              productWidth='40px'
              spaceWidth=''
            />

            <Box position='relative'>
              <Image
                src='/images/merch/merch-pink-lightning.png'
                alt='small-sparks'
                w={{ base: '100%', md: '0' }}
                position='absolute'
                top={{ base: '-6rem', md: '30rem' }}
                left={{ base: '-8rem', sm: '-10rem', md: '0' }}
                zIndex='0'
                draggable='false'
              />
              <MerchCard
                title='Gantungan Kunci'
                price={8000}
                productImages={[
                  '/images/merch/merch-ganci.png'
                ]}
                spaceImage='/images/merch/merch-bulan-1.png'
                productWidth=''
                spaceWidth='200px'
              />
            </Box>

            <Box position='relative'>
              <Image
                src='/images/merch/merch-pink-comet.png'
                alt='small-sparks'
                w={{ base: '300px', md: '100%' }}
                position='absolute'
                top={{ base: '8rem', md: '30rem' }}
                right={{ base: '6rem', md: '-40rem' }}
                zIndex='0'
                draggable='false'
              />
              <MerchCard
                title='Stiker'
                price={10000}
                spaceImage='/images/merch/merch-bulan-2.png'
                productImages={['/images/merch/merch-sticker.png', '/images/merch/merch-sticker-2.png']}
                productWidth=''
                spaceWidth=''
              />
            </Box>
            <MerchCard
              title='Kipas'
              price={12000}
              spaceImage='/images/merch/merch-bulan-3.png'
              productImages={['/images/merch/merch-kipas.png']}
              productWidth='150px'
              spaceWidth=''
            />
            <MerchCard
              title='Hoodie'
              price={160000}
              productImages={[
                '/images/merch/merch-white-hoodie.png',
                '/images/merch/merch-black-hoodie.png'
              ]}
              spaceImage='/images/merch/merch-asteroid-1.png'
              productWidth='350px'
              spaceWidth=''
            />

            <MerchCard
              title='Kaos'
              price={90000}
              productImages={[
                '/images/merch/merch-white-tshirt.png',
                '/images/merch/merch-black-tshirt.png'
              ]}
              spaceImage='/images/merch/merch-asteroid-2.png'
              productWidth='350px'
              spaceWidth=''
            />

            <MerchCard
              title='Pouch'
              price={30000}
              productImages={['/images/merch/merch-pouch.png']}
              spaceImage='/images/merch/merch-asteroid-3.png'
              productWidth='350px'
              spaceWidth=''
            />

            <Box position='relative'>
              <Image
                src='/images/merch/merch-yellow-comet.png'
                alt='yellow-comet'
                w={{ base: '400px' }}
                position='absolute'
                top={{ base: '0rem', md: '1rem' }}
                left={{ base: '-7rem', md: '-10rem' }}
                zIndex='0'
                draggable='false'
              />
              <MerchCard
                title='Pulpen'
                price={7000}
                productImages={['/images/merch/merch-pulpen.png']}
                spaceImage='/images/merch/merch-bulan-1.png'
                productWidth='250px'
                spaceWidth=''
              />
            </Box>
            <MerchCard
              title='Notebook'
              price={35000}
              productImages={['/images/merch/merch-notebook.png']}
              spaceImage='/images/merch/merch-bulan-2.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Gelang'
              price={17000}
              productImages={['/images/merch/merch-gelang.png']}
              spaceImage='/images/merch/merch-bulan-3.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Totebag'
              price={85000}
              productImages={['/images/merch/merch-totebag.png']}
              spaceImage='/images/merch/merch-asteroid-1.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='ITB OOTD Kit'
              price={185000}
              productImages={['/images/merch/merch-bundle-1.png']}
              spaceImage='/images/merch/merch-asteroid-2.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Anti-Dingin Kit'
              price={220000}
              productImages={['/images/merch/merch-bundle-2.png']}
              spaceImage='/images/merch/merch-asteroid-3.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Ngambis Kit'
              price={40000}
              productImages={['/images/merch/merch-bundle-3.png']}
              spaceImage='/images/merch/merch-bulan-1.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Anti- Rempong Kit'
              price={45000}
              productImages={['/images/merch/merch-bundle-4.png']}
              spaceImage='/images/merch/merch-bulan-2.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Anti-Panas Kit'
              price={25000}
              productImages={['/images/merch/merch-bundle-5.png']}
              spaceImage='/images/merch/merch-bulan-3.png'
              productWidth='250px'
              spaceWidth=''
            />

            <MerchCard
              title='Bestseller Kit'
              price={40000}
              productImages={['/images/merch/merch-bundle-6.png']}
              spaceImage='/images/merch/merch-asteroid-2.png'
              productWidth='250px'
              spaceWidth=''
            />
          </Grid>
        </Flex>
      </Layout>
    </>
  );
}
