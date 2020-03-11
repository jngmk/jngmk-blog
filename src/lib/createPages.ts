import { CreatePagesArgs } from 'gatsby';
import { Query, MarkdownRemarkConnection } from '../../types/graphql-types';
import path from 'path';

type ICreatePagesQeury = Query & {
  devPage: MarkdownRemarkConnection
  dailyPage: MarkdownRemarkConnection
  devCategoryList: MarkdownRemarkConnection
  dailyCategoryList: MarkdownRemarkConnection
}

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const { data, errors } = await graphql<ICreatePagesQeury>(`
    query {
      allMarkdownRemark: allMarkdownRemark(filter: {frontmatter: {category1: {ne: "about"}}}, sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            frontmatter {
              date
              slug
              title
            }
            id
            html
          }
        }
      }
      devCategoryList: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "dev"}}}) {
        group(field: frontmatter___category2) {
          fieldValue
          totalCount
        }
      }
      dailyCategoryList: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "daily"}}}) {
        group(field: frontmatter___category2) {
          fieldValue
          totalCount
        }
      }
      devPage: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "dev"}}}) {
        group(field: frontmatter___category2) {
          fieldValue
          nodes {
            frontmatter {
              title
              category1
              date
              slug
              category2
            }
            excerpt(pruneLength: 150, truncate: true)
            id
          }
        }
        totalCount
      }
      dailyPage: allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category1: {eq: "daily"}}}) {
        group(field: frontmatter___category2) {
          fieldValue
          nodes {
            frontmatter {
              title
              category1
              date
              slug
              category2
            }
            excerpt(pruneLength: 150, truncate: true)
            id
          }
        }
        totalCount
      }
    }
  `);

  if (errors) {
    throw errors;
  }

  const blogPostTemplate = path.resolve(`src/templates/PostTemplate.tsx`);
  const blogPostListTemplate = path.resolve(`src/templates/PostListTemplate.tsx`);

  data.allMarkdownRemark.edges.forEach(({ node }: any) => {
    createPage({
      path: node.frontmatter.slug,
      context: {
        postId: node.id,
        html: node.html,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        slug: node.frontmatter.slug
      },
      component: blogPostTemplate,
    });
  });

  data.devPage.group.forEach(devNodes => {
    createPage({
      path: `/dev/${devNodes.fieldValue}`,
      context: {
        category1: `dev`,
        category2: devNodes.fieldValue,
        categoryList: data.devCategoryList.group,
        totalCount: data.devPage.totalCount,
        nodes: devNodes.nodes,
      },
      component: blogPostListTemplate,
    });
  });

  data.dailyPage.group.forEach(dailyNodes => {
    createPage({
      path: `/dev/${dailyNodes.fieldValue}`,
      context: {
        category1: `dev`,
        category2: dailyNodes.fieldValue,
        categoryList: data.dailyCategoryList.group,
        totalCount: data.dailyPage.totalCount,
        nodes: dailyNodes.nodes,
      },
      component: blogPostListTemplate,
    });
  });
}


