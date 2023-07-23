import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { type NextPage } from 'next';
import { useState } from 'react';
import Layout from '~/layout';

const Login: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isError, setIsError] = useState(false);

  return (
    <Layout title='Login'>
      <Flex
        justifyContent='center'
        alignItems='center'
        h='100vh'
        w='100%'
        color='white'
      >
        <Box
          h='120%'
          w='120%'
          justifyContent='center'
          alignItems='center'
          backgroundImage='/images/login/blur4a.png'
          backgroundPosition='center'
          backgroundRepeat='no-repeat'
          backgroundSize='cover'
          filter='blur(80px)'
          position='fixed'
          zIndex='-10'
        />
        <Image
          src='/images/login/blan-telanjang.png'
          alt=''
          position='absolute'
          h='25%'
          left='0'
          top='15%'
          zIndex='-9'
          draggable='false'
        />
        <Image
          src='/images/login/Planet-dudidam.png'
          alt=''
          position='absolute'
          h='25%'
          right='0'
          top='5%'
          zIndex='-9'
          draggable='false'
        />
        <Image
          src='/images/login/spark2.png'
          alt=''
          position='absolute'
          h='25%'
          right='0'
          bottom='0'
          zIndex='-9'
          draggable='false'
        />
        <Image
          src='/images/login/sparkle.png'
          alt=''
          position='absolute'
          h='25%'
          left='0'
          bottom='0'
          zIndex='-9'
          draggable='false'
        />
        <Image
          src='/images/login/spiral-12b.png'
          alt=''
          position='absolute'
          h='25%'
          right='35%'
          bottom='30%'
          zIndex='-9'
          draggable='false'
        />
        <FormControl
          // isInvalid={isError}
          display='flex'
          gap={{ base: '1.5rem', md: '3rem' }}
          flexDirection='column'
          alignItems='center'
          w={{ base: '85%', md: '40rem' }}
          padding={{ base: '2.5rem', md: '5rem 8rem' }}
          borderRadius={{ base: '2.5rem', md: '5rem' }}
          backdropFilter='blur(13px)'
          boxShadow='3px 3px 14px 0px rgba(0, 0, 0, 0.69)'
          backgroundColor='rgba(237, 240, 247, 0.20)'
          fontFamily='Somar Rounded'
        >
          <Image
            src='/images/login/Vector.png'
            alt=''
            w={{ base: '12rem', md: '18rem' }}
            draggable='false'
          />
          <Heading
            fontSize={{ base: '2xl', md: '5xl' }}
            fontFamily='Bodwars'
            textAlign='center'
          >
            LOGIN
          </Heading>
          <Input
            placeholder='username'
            // _placeholder={{ color: isError ? 'red' : 'gray.400' }}
            maxW='24rem'
            type='number'
            size={{ base: 'sm', md: 'md' }}
          />
          <Box maxW='24rem' w='100%'>
            <InputGroup size={{ base: 'sm', md: 'md' }}>
              <Input
                placeholder='password'
                // _placeholder={{ color: isError ? 'red' : 'gray.400' }}
                type={showPassword ? 'text' : 'password'}
              />
              <InputRightElement height='100%' paddingRight='1rem'>
                {showPassword ? (
                  <AiOutlineEye onClick={() => setShowPassword(false)} />
                ) : (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage fontSize='.625rem'>
              Username atau password invalid
            </FormErrorMessage>
          </Box>
          <Button
            type='submit'
            maxW='12rem'
            w='100%'
            fontFamily='Bodwars'
            cursor='pointer'
          >
            LOGIN
          </Button>
          <Text
            fontSize='.625rem'
            fontFamily='Bodwars'
            cursor='pointer'
            color='gray.300'
            textShadow='0.7px 0.7px 1.35px 0px rgba(0, 0, 0, 0.69)'
          >
            FORGOT PASSWORD?
          </Text>
        </FormControl>
      </Flex>
    </Layout>
  );
};

export default Login;
