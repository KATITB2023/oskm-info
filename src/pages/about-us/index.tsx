import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(
  () => import('~/components/about-us/AboutUs'),
  {
    loading: () => <LoadingSuspense />
  }
);

export default function AboutUs() {
  return <SuspenseComponent />;
}
