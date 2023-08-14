import { Maintenance } from '~/components/Maintenance';
import Layout from '~/layout';
import ArticleList from './article-list/ArticleList';

const BlogPage = () => (
  <Layout title='Blog'>
    <ArticleList/>
  </Layout>
);

export default BlogPage;
