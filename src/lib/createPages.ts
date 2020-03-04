import { CreatePagesArgs } from 'gatsby';
import { Query } from '../../types/graphql-types';
import path from 'path';

export async function createPages({ actions, graphql }: CreatePagesArgs) {
  const { createPage } = actions;
  const { data, errors } = await graphql<Query>(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              slug
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
  // console.log('data', JSON.parse(JSON.stringify(data.allMarkdownRemark.nodes)))

  const blogPostTemplate = path.resolve(`src/templates/PostTemplate.tsx`);
  data.allMarkdownRemark.edges.forEach(({ node }: any) => {
    createPage({
      path: node.frontmatter.slug,
      context: {
        postId: node.id,
        html: node.html,
        title: node.frontmatter.title,
        slug: node.frontmatter.slug
      },
      component: blogPostTemplate,
    });
  });
}
