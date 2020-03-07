import React from 'react'
import { css } from '@emotion/core'

type IMarkdownToHtmlProps = {
  html: string;
}

const MarkdownToHtml: React.FC<IMarkdownToHtmlProps> = React.memo(({ html }) => {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const markdownToHtmlCss = css`
    padding: 0 1.5vh;
    ${mq[1]} {
      padding: 0 2.2vh;
    }

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