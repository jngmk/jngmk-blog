import React, { FunctionComponent } from 'react'
import { css } from '@emotion/core'
import { IDisqusProps } from '../interface'
import { Disqus } from 'gatsby-plugin-disqus'

const Comment: FunctionComponent<IDisqusProps> = React.memo(props => {
  const { identifier, slug, title } = props
  const MY_URL = 'https://jngmk.netlify.com'

  const disqusConfig = {
    identifier: identifier,
    url: `${MY_URL}${slug}`,
    title: title,
  }

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const commentCss = css`
    padding: 0 11px;
    ${mq[1]} {
      padding: 0 23px;
    }
  `

  return (
    <Disqus config={disqusConfig} css={commentCss} />
  );
});

Comment.displayName = 'Comment';

export default Comment;