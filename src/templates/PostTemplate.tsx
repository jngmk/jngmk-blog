import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interface'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'


type IPostTemplateProps = ITemplateProps<{
  postId: string;
  title: string;
  html: string;
  slug: string;
}>;

const PostTemplate: FunctionComponent<IPostTemplateProps> = React.memo(props => {
  const { postId, title, html, slug } = props.pageContext
  // const MY_URL = process.env.MY_URL
  const MY_URL = 'https://jngmk.netlify.com/'
  console.log('id', postId, 'url', MY_URL)
  let disqusConfig = {
    url: ``,
    identifier: postId,
    title: title,
  }
  console.log(disqusConfig)
  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
      {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
      <Disqus config={disqusConfig} />
    </Layout>
  );
});

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;