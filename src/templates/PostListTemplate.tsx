import React from 'react';
import { IPostListTemplateContext, ITemplateProps } from '../interface';
import PostCategoryList from '../components/PostCategoryList';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
  const { category1, category2, categoryList, totalCount, nodes } = props.pageContext;

  return (
    <Layout>
      <SEO title={category2} />
      <PostCategoryList renderPage={category1} totalCount={totalCount} categoryList={categoryList} />
      <PostList nodes={nodes} />
    </Layout>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;