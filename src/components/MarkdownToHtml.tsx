import React from 'react';
import { css } from '@emotion/core';

type IMarkdownToHtmlProps = {
  html: string;
};

const MarkdownToHtml: React.FC<IMarkdownToHtmlProps> = React.memo(
  ({ html }) => {
    const breakpoints = [576, 768, 992, 1200];
    const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

    const markdownToHtmlCss = css`
      font-size: 1.5vh;
      ${mq[0]} {
        font-size: 1.55vh;
      }
      line-height: 1.5;
      padding: 0 1.5vh;
      ${mq[1]} {
        padding: 0 2.2vh;
      }

      h2 {
        margin-top: 3.5vh;
        margin-bottom: 1.5vh;
        font-size: 2vh;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 4.5vh;
          padding-bottom: 2vh;
          border-bottom: 0.1vh solid #eeeeee;
          font-size: 2.7vh;
        }
      }
      h3 {
        margin-top: 1.5vh;
        margin-bottom: 1.3vh;
        font-size: 1.8vh;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 3.5vh;
          margin-bottom: 2vh;
          font-size: 2.3vh;
        }
      }
      h4 {
        margin-top: 1.5vh;
        margin-bottom: 1.3vh;
        font-size: 1.6vh;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 2vh;
          font-size: 1.7vh;
        }
      }
      h5 {
        margin-top: 1.5vh;
        margin-bottom: 1.2vh;
        font-size: 1.5vh;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 2vh;
          font-size: 1.55vh;
        }
      }
      h6 {
        margin: 2vh 0;
        font-size: 1.5vh;
        font-weight: 400;
        ${mq[0]} {
          margin: 3vh 0;
          font-size: 1.55vh;
        }
      }
      ul, ol {
        margin-bottom: 1.2vh;
        margin-left: 2vh;
      }
      li {
        margin-bottom: 0.5vh;
      }
      p {
        margin-bottom: 1.2vh;
      }
    `;

    return (
      <section
        css={markdownToHtmlCss}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
);

MarkdownToHtml.displayName = 'MarkdownToHtml';

export default MarkdownToHtml;
