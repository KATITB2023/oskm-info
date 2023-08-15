import dynamic from 'next/dynamic';
import { LoadingSuspense } from '~/components/Loading';

const SuspenseComponent = dynamic(
  () => import('~/components/article-list/ArticleList'),
  {
    loading: () => <LoadingSuspense />
  }
);

export default function Blog() {
  return <SuspenseComponent />;
}
