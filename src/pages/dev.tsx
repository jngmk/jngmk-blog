import React, { FunctionComponent } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Query } from '../../types/graphql-types';
import PostCategoryList from '../components/PostCategoryList';
import Layout from "../components/Layout";
import SEO from '../components/SEO';
import PostList from '../components/PostList';

const LatestPostListQuery = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "dev"}}}) {
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
      group(field: frontmatter___category2) {
        fieldValue
        totalCount
      }
    }
  }
`;

const BlogPage: FunctionComponent = () => {
  const { allMarkdownRemark } = useStaticQuery<Query>(LatestPostListQuery);
  const categoryList = allMarkdownRemark.group
  return (
    <Layout>
      <SEO title="Dev" url="/dev" />
      <PostCategoryList renderPage={'dev'} totalCount={allMarkdownRemark.totalCount} categoryList={categoryList} />
      <PostList nodes={allMarkdownRemark.nodes} />
    </Layout>
  );
};

export default BlogPage;