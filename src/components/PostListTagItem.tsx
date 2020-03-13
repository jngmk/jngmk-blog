import React, { FunctionComponent, memo } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { IPostListTagItem } from '../interface';

const PostListTagItem: FunctionComponent<IPostListTagItem> = memo(props => {
  const { tag } = props;

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const postListTagItemCss = css`
    display: inline-block;
    margin-right: 15px;

    a {
      display: flex;
      text-decoration: none;
      border-radius: 5.5px;
      color: #234c34;
      font-style: italic;
      font-size: 12px;
      ${mq[1]} {
        font-size: 13px;
      }
      ${mq[3]} {
        &:hover {
          color: #0d8d6c;
        }
      }
    }
  `;

  return (
    <div css={postListTagItemCss}>
      <Link to={`/tag/${tag.replace(/\s/gi, "-")}`} title={tag}>
        #{tag}
      </Link>
    </div>
  );
});

export default PostListTagItem;
