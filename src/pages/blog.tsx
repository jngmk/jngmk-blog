import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../../types/graphql-types';
import PostCategoryList from '../components/PostCategoryList';
import Layout from "../components/Layout";
import SEO from '../components/SEO';
import PostList from '../components/PostList';

const LatestPostListQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "blog"}}}) {
      nodes {
        frontmatter {
          title
          slug
          date
        }
        excerpt(truncate: true, pruneLength: 150)
        id
      }
      totalCount
    }
  }
  
`;

const BlogPage: FunctionComponent = () => {
  const { allMarkdownRemark } = useStaticQuery<Query>(LatestPostListQuery);
  const categoryList = [];

  return (
    <Layout>
      <SEO title="Blog"/>
      <PostCategoryList renderPage={'blog'} totalCount={allMarkdownRemark.totalCount} categoryList={categoryList} />
      <PostList nodes={allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default BlogPage;