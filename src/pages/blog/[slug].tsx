import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(() => import('~/components/BlogDetail'), {
  ssr: false,
  loading: () => <LoadingSuspense />
});

export default function BlogDetail() {
  return <SuspenseComponent />;
}
