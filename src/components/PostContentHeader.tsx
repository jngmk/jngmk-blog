import React, { FunctionComponent, memo } from 'react';
import { css } from '@emotion/core';

export interface IPostContentHeaderProps {
  title: string;
  date: Date;
}

const PostContentHeader: FunctionComponent<IPostContentHeaderProps> = memo(
  ({ title, date }) => {
    const breakpoints = [576, 768, 992, 1200];
    const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

    const postHeaderContentCss = css`
      padding: 1.3vh 1.5vh 0;
      ${mq[1]} {
        padding: 1.8vh 2.2vh 0;
      }
      h2 {
        margin-bottom: 0.2vh;
        font-size: 24px;
        font-weight: 700;
        color: #131614;
        ${mq[0]} {
          font-size: 42px;
        }
      }
      ,
      time {
        margin-bottom: 1vh;
        font-size: 14px;
        font-weight: 300;
        color: #484742;
        ${mq[0]} {
          font-size: 15px;
        }
      }
    `;
    return (
      <header css={postHeaderContentCss}>
        <h2>{title}</h2>
        <time dateTime={date.toString()}>{date}</time>
      </header>
    );
  }
);

PostContentHeader.displayName = 'PostHeader';

export default PostContentHeader;
