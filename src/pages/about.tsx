import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../../types/graphql-types';
import Layout from '../components/Layout';
import MarkdownToHtml from '../components/MarkdownToHtml'

const AboutQuery = graphql`
  query {
    markdownRemark(frontmatter: {category1: {eq: "about"}}) {
      html
    }
  }
`;

const AboutPage: FunctionComponent = React.memo(() => {
  const { markdownRemark } = useStaticQuery<Query>(AboutQuery);

  return (
    <Layout>
      <MarkdownToHtml html={markdownRemark.html} />
    </Layout>
  );
});

AboutPage.displayName = 'AboutPage';

export default AboutPage;