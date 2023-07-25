import {
  Flex,
  Image,
  Heading,
  FormControl,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  VStack
} from '@chakra-ui/react';
import { type SignInResponse, signIn } from 'next-auth/react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface FormValues {
  nim: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid, isSubmitting },
    setError,
    reset
  } = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      nim: '',
      password: ''
    }
  });
  const login: SubmitHandler<FormValues> = async (data: FormValues, event) => {
    event?.preventDefault();
    await signIn('credentials', {
      nim: data.nim,
      password: data.password,
      redirect: false
    }).then((res: SignInResponse | undefined) => {
      console.log(res);
      if (res?.ok) return;
      console.log(res?.error);
      if (res?.error === 'User not found') {
        setError('nim', {
          type: 'manual',
          message: 'NIM tidak ditemukan'
        });
      } else if (res?.error === 'Password is incorrect') {
        setError('password', {
          type: 'manual',
          message: 'Password salah'
        });
      } else {
        setError('root', { message: 'Something went wrong' });
      }
    });

    reset({}, { keepErrors: true, keepValues: !!errors });
  };
  return (
    <Flex
      color='white'
      direction='column'
      alignItems='center'
      w={{ base: 'auto', md: '40rem' }}
      padding={{ base: '2.5rem', md: '5rem 8rem' }}
      borderRadius={{ base: '2.5rem', md: '5rem' }}
      backdropFilter='blur(13px)'
      boxShadow='3px 3px 14px 0px rgba(0, 0, 0, 0.69)'
      backgroundColor='rgba(237, 240, 247, 0.20)'
      fontFamily='Somar Rounded'
      gap={{ base: '1.5rem', md: '3rem' }}
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
      <form onSubmit={(e) => void handleSubmit(login)(e)}>
        <VStack
          spacing={{ base: 5, md: 10 }}
          width={{ base: 'auto', md: '40ch' }}
        >
          <FormControl isInvalid={!!errors.nim}>
            <Input
              placeholder='NIM'
              {...register('nim', { required: 'NIM tidak boleh kosong' })}
              maxW='24rem'
              type='text'
              size={{ base: 'sm', md: 'md' }}
            />
            <FormErrorMessage>{errors.nim?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <InputGroup size={{ base: 'sm', md: 'md' }}>
              <Input
                placeholder='password'
                {...register('password', {
                  required: 'Password tidak boleh kosong'
                })}
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
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            disabled={!isDirty || !isValid}
            maxW='12rem'
            w='100%'
            fontFamily='Bodwars'
            cursor='pointer'
            size={{ base: 'sm', md: 'md' }}
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </VStack>
      </form>
      <Text
        fontSize='.625rem'
        fontFamily='Bodwars'
        cursor='pointer'
        color='gray.300'
        textShadow='0.7px 0.7px 1.35px 0px rgba(0, 0, 0, 0.69)'
      >
        FORGOT PASSWORD?
      </Text>
    </Flex>
  );
};

export default LoginForm;
