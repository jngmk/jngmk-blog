import React from 'react';
import { IPostListTemplateContext, ITemplateProps } from '../interface';
import PostCategoryList from '../components/PostCategoryList';
import PostList from '../components/PostList';
import SEO from '../components/SEO';
import Layout from '../components/Layout';

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
  const { pagePath, tagName, totalCount, nodes } = props.pageContext;

  return (
    <Layout>
      <SEO title={tagName} url={pagePath} />
      <PostCategoryList renderPage={tagName} totalCount={totalCount} />
      <PostList nodes={nodes} />
    </Layout>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;