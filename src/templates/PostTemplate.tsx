import React, { FunctionComponent } from 'react';
import Layout from '../components/layout';
import { ITemplateProps } from '../interface'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '.env') })

type IPostTemplateProps = ITemplateProps<{
  postId: string;
  title: string;
  html: string;
}>;

const PostTemplate: FunctionComponent<IPostTemplateProps> = React.memo(props => {
  const { postId, title, html } = props.pageContext
  const MY_URL = process.env.MY_URL
  console.log('id', postId)
  let disqusConfig = {
    url: `${MY_URL}`,
    identifier: postId,
    title: title,
  }
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