import React from 'react';
import { IPostListTemplateContext, ITemplateProps } from '../interface';
// import PostCategory from '../components/PostList';
import PostList from '../components/PostList';
import SEO from '../components/SEO';

type IPostListTemplateProps = ITemplateProps<IPostListTemplateContext>;

const PostListTemplate: React.FC<IPostListTemplateProps> = React.memo(props => {
  const { title, pagePath, nodes } = props.pageContext;

  return (
    <>
      <SEO title={title} />
      {/* <PostCategory /> */}
      <PostList nodes={nodes} />
    </>
  );
});

PostListTemplate.displayName = 'PostListTemplate';

export default PostListTemplate;