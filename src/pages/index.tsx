import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(() => import('~/components/home-page/Home'), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

export default function Home() {
  return <SuspenseComponent />;
}
