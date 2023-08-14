import Head from 'next/head';
import { motion } from 'framer-motion';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Box } from '@chakra-ui/react';
import Navbar from '~/components/Navbar';
import Footer from '~/components/Footer';
import Carousel from '~/pages/blog/carousel';
import ArticleList from '~/pages/blog/ArticleList';

interface Props {
  title?: string;
  withFooter?: boolean;
  children?: React.ReactNode;
}

export default function Layout({ title, withFooter = true, children }: Props) {
  return (
    <>
      <ArticleList/>
      {/* <Head>
        <title>{title ? `${title} - OSKM ITB 2023` : `OSKM ITB 2023`}</title>
        <meta
          name='description'
          content='OSKM (atau Orientasi Studi Keluarga Mahasiswa) ITB merupakan rangkaian kegiatan dalam upaya menyambut Mahasiswa Baru ITB dan memperkenalkan corak peradaban di ITB serta membantu mempersiapkan Mahasiswa Baru untuk berkuliah di ITB'
        />
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
      {withFooter && <Footer />} */}
    </>
  );
}
