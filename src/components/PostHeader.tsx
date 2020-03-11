import React, { FunctionComponent, memo } from 'react';
import { css } from '@emotion/core';

export interface IPostHeaderProps {
  title: string;
  date: Date;
}

const PostHeader: FunctionComponent<IPostHeaderProps> = memo(
  ({ title, date }) => {
    const breakpoints = [576, 768, 992, 1200];
    const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

    const postHeaderCss = css`
      padding: 1.3vh 1.5vh 0;
      ${mq[1]} {
        padding: 1.8vh 2.2vh 0;
      }
      h2 {
        margin-bottom: 0.2vh;
        font-size: 2vh;
        font-weight: 700;
        color: #131614;
        ${mq[0]} {
          font-size: 2.7vh;
        }
      }
      ,
      time {
        margin-bottom: 1vh;
        font-size: 1.5vh;
        font-weight: 300;
        color: #484742;
        ${mq[0]} {
          font-size: 1.6vh;
        }
      }
    `;
    return (
      <header css={postHeaderCss}>
        <h2>{title}</h2>
        <time dateTime={date.toString()}>{date}</time>
      </header>
    );
  }
);

PostHeader.displayName = 'PostHeader';

export default PostHeader;
