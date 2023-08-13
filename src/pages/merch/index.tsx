import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(() => import('~/components/merch/Merch'), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

export default function Merch() {
  return <SuspenseComponent />;
}
