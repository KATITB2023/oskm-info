import { type NextPage } from 'next';
import Head from 'next/head';
import { BookingShowcase } from '~/components/form/BookingShowcase';

const BookingShowcasePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>ITB Got Talent - KAT ITB 2023</title>
      </Head>
      <BookingShowcase />
    </>
  );
};

export default BookingShowcasePage;
