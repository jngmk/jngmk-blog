import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interface'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'

type IPostTemplateProps = ITemplateProps<{
  idx: string;
  title: string;
  html: string;
}>;

const PostTemplate: FunctionComponent<IPostTemplateProps> = React.memo(props => {
  const { idx, title, html } = props.pageContext
  console.log('id', idx)
  let disqusConfig = {
    url: `none`,
    identifier: idx,
    title: title,
  }
  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      <CommentCount config={disqusConfig} placeholder={'...'} />
      <Disqus config={disqusConfig} />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;