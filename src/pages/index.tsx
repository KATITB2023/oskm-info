import { type NextPage } from 'next';
import Layout from '~/layout';
import Timeline from '~/components/Timeline';

const Home: NextPage = () => {
  return (
    <Layout title={''}>
      {/* jumbotron */}
      {/* timleine */}
      {/* sponsor */}
      {/* medpar */}
      <Timeline></Timeline>
    </Layout>
  );
};

export default Home;
