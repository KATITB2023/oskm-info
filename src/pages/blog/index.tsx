import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(() => import('~/components/Blog'), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

export default function Blog() {
  return <SuspenseComponent />;
}
