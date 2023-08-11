import { type NextPage } from 'next';
import Head from 'next/head';
import { ShowCase } from '~/components/form/showcase/ShowCase';

const BookingShowCasePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Booking Showcase - KAT ITB 2023</title>
        <meta name="description" content="Form Booking Showcase - KAT ITB 2023" />
      </Head>
      <ShowCase />
    </>
  );
};

export default BookingShowCasePage;
