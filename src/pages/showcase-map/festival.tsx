import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "~/layout";
import { LoadingSuspense } from "~/components/Loading";

const FestivalMap = dynamic(() => import("~/components/FestivalMap"), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

const ShowcaseMapPage: NextPage = () => {
  const router = useRouter();

  const inputSelectedLocationName =
    router.query.locationName instanceof Array
      ? router.query.locationName[0]
      : router.query.locationName;

  return (
    <Layout title='Showcase Map' withFooter={false}>
      <FestivalMap inputSelectedLocationName={inputSelectedLocationName} />
    </Layout>
  );
};

export default ShowcaseMapPage;
