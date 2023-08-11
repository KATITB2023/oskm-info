import { type NextPage } from 'next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Layout from '~/layout';
import { Maintenance } from '~/components/Maintenance';

const InteractiveMap = dynamic(() => import('~/components/InteractiveMap'), {
  ssr: false
});

const InteractiveMapPage: NextPage = () => {
  const router = useRouter();

  const inputSelectedCampus =
    router.query.campus instanceof Array
      ? router.query.campus[0]
      : router.query.campus;

  const inputSelectedLocationName =
    router.query.locationName instanceof Array
      ? router.query.locationName[0]
      : router.query.locationName;

  return (
    <Layout title='Interactive Map'>
      {/* <InteractiveMap
        inputSelectedCampus={inputSelectedCampus}
        inputSelectedLocationName={inputSelectedLocationName}
      /> */}
      <Maintenance />
    </Layout>
  );
};

export default InteractiveMapPage;
