import Head from 'next/head';
import { motion } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Box } from '@chakra-ui/react';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title ? `${title} - OSKM ITB 2023` : `OSKM ITB 2023`}</title>
        {/* <meta name="description" content="Generated by create-t3-app" /> */}
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
        {process.env.NODE_ENV !== 'production' && (
          <Box>
            <ReactQueryDevtools initialIsOpen={false} />
          </Box>
        )}
      </motion.div>
      <Footer />
    </>
  );
}
