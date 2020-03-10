import React from 'react'
import { css } from '@emotion/core'

type IMarkdownToHtmlProps = {
  html: string;
}

const MarkdownToHtml: React.FC<IMarkdownToHtmlProps> = React.memo(({ html }) => {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const markdownToHtmlCss = css`
    line-height: 1.5;
    padding: 0 1.5vh;
    ${mq[1]} {
      padding: 0 2.2vh;
    }

    h2 {
      margin-top: 5vh;
      margin-bottom: 2vh;
      padding-bottom: 2vh;
      border-bottom: 0.1vh solid #eeeeee;
      font-size: 5.5vw;
      font-weight: 700;
      ${mq[0]} {
        font-size: 2.7vh;
      }
    }
    h3 {
      margin-top: 3.5vh;
      margin-bottom: 2vh;
      font-size: 4.7vw;
      font-weight: 700;
      ${mq[0]} {
        font-size: 2.3vh;
      }
    }
    h4 {
      margin-top: 2vh;
      margin-bottom: 1.5vh;
      font-size: 4.7vw;
      font-weight: 700;
      ${mq[0]} {
        font-size: 1.7vh;
      }
    }
    h5 {
      margin-top: 2vh;
      margin-bottom: 1.5vh;
      font-size: 4.7vw;
      font-weight: 700;
      ${mq[0]} {
        font-size: 1.5vh;
      }
    }
    h6 {
      margin: 3vh 0;
      font-size: 4vw;
      font-weight: 400;
      ${mq[0]} {
        font-size: 1.5vh;
      }
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