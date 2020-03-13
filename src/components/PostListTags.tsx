import React, { FunctionComponent, memo } from 'react';
import { css } from '@emotion/core';
import PostListTagItem from './PostListTagItem';
import { IPostListTags } from '../interface';

const PostListTags: FunctionComponent<IPostListTags> = memo(props => {
  const { tags } = props;

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const postListTagsCss = css`
    display: inline-block;
    padding: 0 11px 9.5px;
      ${mq[1]} {
        padding: 0 23px 19px;
      }
  `;

  return (
    <div css={postListTagsCss}>
      {tags.map((tag, idx) => (
        <PostListTagItem key={idx} tag={tag} />
      ))}
    </div>
  );
});

export default PostListTags;
