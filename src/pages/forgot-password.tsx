import { Flex } from '@chakra-ui/react';
import LoginBackground from '~/components/background/LoginBackground';
import ForgotPasswordForm from '~/components/form/ForgetPasswordForm';
import Layout from '~/layout';

const ForgetPassword = () => {
  return (
    <Layout title='Lupa Password'>
      <Flex
        position='absolute'
        top='0'
        left='0'
        width='100%'
        backgroundColor='gray.600'
        zIndex='-100'
        minHeight='100vh'
      >
        <Flex
          justifyContent={{ base: 'center', md: 'end' }}
          alignItems='center'
          paddingInline={{ base: '0', md: '15vw' }}
          width='100%'
        >
          <LoginBackground />
          <ForgotPasswordForm />
        </Flex>
      </Flex>
    </Layout>
  );
};

export default ForgetPassword;
