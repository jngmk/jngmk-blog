import React, { FunctionComponent, memo } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { IPostCategoryItemProps } from '../interface';

const PostCategoryItem: FunctionComponent<IPostCategoryItemProps> = memo(
  props => {
    const { categoryName, totalCount, pagePath } = props;

    const breakpoints = [576, 768, 992, 1200];
    const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

    const postCategoryItemCss = css`
      display: inline-block;
      margin-right: 10px;

      a {
        display: flex;
        padding: 1.5px 4px;
        text-decoration: none;
        border-radius: 5.5px;
        color: #234c34;
        ${mq[1]} {
          padding: 3px 5px;
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
        margin: 0 2px;
        display: inline-block;
        font-weight: 500;
        font-size: 13.5px;
        ${mq[1]} {
          font-size: 15px;
        }
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
  }
);

export default PostCategoryItem;
