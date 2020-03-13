import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../../types/graphql-types';
import PostCategoryList from '../components/PostCategoryList';
import Layout from "../components/Layout";
import SEO from '../components/SEO';
import PostList from '../components/PostList';

const LatestPostListQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {ne: "about"}}}) {
      nodes {
        frontmatter {
          title
          slug
          date
          tags
        }
        excerpt(truncate: true, pruneLength: 150)
        id
      }
      totalCount
    }
  }
`;

const IndexPage: FunctionComponent = () => {
  const { allMarkdownRemark } = useStaticQuery<Query>(LatestPostListQuery);

  return (
    <Layout>
      <SEO title="Home" url="/" />
      <PostCategoryList renderPage={'/'} totalCount={allMarkdownRemark.totalCount} />
      <PostList nodes={allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default IndexPage;