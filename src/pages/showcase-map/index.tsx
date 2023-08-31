import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Layout from "~/layout";
import { LoadingSuspense } from "~/components/Loading";

const ShowcaseMap = dynamic(() => import("~/components/ShowcaseMap"), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

const ShowcaseMapPage: NextPage = () => {
  return (
    <Layout title='Showcase Map' withFooter={false}>
      <ShowcaseMap />
    </Layout>
  );
};

export default ShowcaseMapPage;
