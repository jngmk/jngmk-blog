import React, { FunctionComponent, memo } from 'react';
import { css } from '@emotion/core'

export interface IPostHeaderProps {
  title: string;
  date: string;
}

const PostHeader: FunctionComponent<IPostHeaderProps> = memo(({ title, date }) => {
  const breakpoints = [576, 768, 992, 1200]

  const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  )

  const postHeaderCss = css`
  // home postHeader
  h2 { 
    margin-bottom: 0.2vh;
    font-size: 2.3vh;
    font-weight: 500;
    color: #131614;
    ${mq[1]} {
      font-size: 2.7vh;
    }
  },
  time {
    margin-bottom: 1vh;
    font-size: 1.4vh;
    font-weight: 200;
    color: #484742;
    ${mq[1]} {
      font-size: 1.6vh;
    }
  }
  `
  return (
    <header css={postHeaderCss}>
      <h2>{title}</h2>
      <time dateTime={date}>
        {date}
      </time>
    </header>
  );
});

PostHeader.displayName = 'PostHeader';

export default PostHeader;