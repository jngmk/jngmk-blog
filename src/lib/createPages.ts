import { CreatePagesArgs } from 'gatsby';
import { Query } from '../../types/graphql-types';
import path from 'path';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const { data, errors } = await graphql<Query>(`
    query {
      allMarkdownRemark(filter: {frontmatter: {category1: {ne: "about"}}}, sort: {fields: frontmatter___date, order: DESC}) {
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
    }
  `);

  if (errors) {
    throw errors;
  }

  const blogPostTemplate = path.resolve(`src/templates/PostTemplate.tsx`);
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
}
