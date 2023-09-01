import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Layout from "~/layout";
import { LoadingSuspense } from "~/components/Loading";

const FestivalMap = dynamic(() => import("~/components/FestivalMap"), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

const ShowcaseMapPage: NextPage = () => {
  return (
    <Layout title='Showcase Map' withFooter={false}>
      <FestivalMap />
    </Layout>
  );
};

export default ShowcaseMapPage;
