import { type NextPage } from 'next';
import Head from 'next/head';
import { GotTalent } from '~/components/form/GotTalent';

const GotTalentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>ITB Got Talent - KAT ITB 2023</title>
      </Head>
      <GotTalent />
    </>
  );
};

export default GotTalentPage;
