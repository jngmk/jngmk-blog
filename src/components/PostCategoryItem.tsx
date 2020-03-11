import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { IPostCategoryItemProps } from '../interface';

const PostCategoryItem: FunctionComponent<IPostCategoryItemProps> = props => {
  const { categoryName, totalCount, pagePath } = props;

//   const categoryItem = graphql`
//   query MyQuery($categoryName: String = ${categoryName}) {
//     allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {category2: {eq: $categoryName}}}) {
//       totalCount
//     }
//   }
// `;

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const postCategoryItemCss = css`
    display: inline-block;
    margin-right: 0.7vh;

    a {
      display: flex;
      padding: 0.2vh 0.5vh;
      text-decoration: none;
      border-radius: 0.55vh;
      color: #234c34;
      ${mq[0]} {
        padding: 0.4vh 0.5vh;
      }
      ${mq[1]} {
        padding: 0.3vh 0.5vh;
      }
      ${mq[3]} {
        &:hover {
          color: #0d8d6c;
        }
      }
    }
    [aria-current] {
      background-color: #234c34;
      color: white;
      &:hover {
        color: white;
      }
    }
    p {
      margin: 0 0.2vh;
      display: inline-block;
      font-weight: 500;
      font-size: 1.45vh;
    }
  `;

  return (
    <div css={postCategoryItemCss}>
      <Link to={pagePath} title={categoryName}>
        <p>{categoryName}</p>
        <p>({totalCount})</p>
      </Link>
    </div>
  );
};

export default PostCategoryItem;
