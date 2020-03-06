import React from 'react'
import { css } from '@emotion/core'

type IMarkdownToHtmlProps = {
  html: string;
}

const MarkdownToHtml: React.FC<IMarkdownToHtmlProps> = React.memo(({ html }) => {
   const markdownToHtmlCss = css`

   `

  return (
    <section
      css={markdownToHtmlCss}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

MarkdownToHtml.displayName = 'MarkdownToHtml';

export default MarkdownToHtml;