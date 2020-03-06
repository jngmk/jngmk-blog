import React, { FunctionComponent } from 'react'
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

  return (
    <Disqus config={disqusConfig} />
  );
});

Comment.displayName = 'Comment';

export default Comment;