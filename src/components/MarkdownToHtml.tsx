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
      font-size: 14px;
      ${mq[0]} {
        font-size: 16px;
      }
      line-height: 1.5;
      padding: 0 1.5vh;
      ${mq[1]} {
        padding: 0 2.2vh;
      }

      h2 {
        margin-top: 3.5vh;
        margin-bottom: 1.5vh;
        font-size: 20px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 4.5vh;
          padding-bottom: 2vh;
          border-bottom: 0.1vh solid #eeeeee;
          font-size: 28px;
        }
      }
      h3 {
        margin-top: 1.5vh;
        margin-bottom: 1.3vh;
        font-size: 18px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 3.5vh;
          margin-bottom: 2vh;
          font-size: 24px;
        }
      }
      h4 {
        margin-top: 1.5vh;
        margin-bottom: 1.3vh;
        font-size: 16px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 2vh;
          font-size: 20px;
        }
      }
      h5 {
        margin-top: 1.5vh;
        margin-bottom: 1.2vh;
        font-size: 14px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 2vh;
          font-size: 16px;
        }
      }
      h6 {
        margin: 2vh 0;
        font-size: 14px;
        font-weight: 400;
        ${mq[0]} {
          margin: 3vh 0;
          font-size: 16px;
        }
      }
      ol {
        margin-bottom: 1.2vh;
        margin-left: 2.6vh;
        ${mq[0]} {
          margin-left: 2vh;
        }
      }
      ul {
        margin: 0;
        margin-bottom: 1.2vh;
        list-style-type: none;
        li:before {
          content: '•';
          padding: 0 0.4vh;
        }
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
