import React, { FunctionComponent } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import PostHeader from '../components/PostHeader';
import MarkdownToHtml from '../components/MarkdownToHtml';
import Comment from '../components/Comment';
import { ITemplateProps } from '../interface';

type IPostTemplateProps = ITemplateProps<{
  postId: string;
  title: string;
  date: Date;
  html: string;
  slug: string;
}>;

const PostTemplate: FunctionComponent<IPostTemplateProps> = React.memo(
  props => {
    const { postId, title, date, html, slug } = props.pageContext;
    console.log(date);
    return (
      <Layout>
        <SEO title={title} url={slug} />
          <PostHeader title={title} date={date} />
          <MarkdownToHtml html={html} />
          {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
          <Comment identifier={postId} slug={slug} title={title} />
      </Layout>
    );
  }
);

PostTemplate.displayName = 'PostTemplate';

export default PostTemplate;
