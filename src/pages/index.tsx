import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Query } from '../../types/graphql-types'
// import PostCategory from '../components/PostCategory';
import Layout from "../components/Layout"
import PostList from '../components/PostList';
import SEO from '../components/SEO';

const LatestPostListQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          title
          slug
          date
        }
        excerpt(truncate: true, pruneLength: 150)
        id
      }
    }
  }
`;

const IndexPage: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home"/>
      {/* <PostCategory /> */}
      <PostList nodes={allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default IndexPage;