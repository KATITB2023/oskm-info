import { type NextPage } from 'next';
import dynamic from 'next/dynamic';
import Layout from '~/layout';

const InteractiveMap = dynamic(() => import('~/components/InteractiveMap'), {
  ssr: false
});

const InteractiveMapPage: NextPage = () => {
  return (
    <Layout title='Interactive Map'>
      <InteractiveMap />
    </Layout>
  );
};

export default InteractiveMapPage;
