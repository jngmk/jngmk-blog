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
      line-height: 2;

      font-size: 14px;
      ${mq[0]} {
        font-size: 16px;
      }
      padding: 0 11px;
      ${mq[1]} {
        padding: 0 23px;
      }

      h2 {
        margin-top: 70px;
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 65px;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 0.1px solid #eeeeee;
          font-size: 28px;
        }
      }
      h3 {
        margin-top: 45px;
        margin-bottom: 11px;
        font-size: 18px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 36px;
          margin-bottom: 21px;
          font-size: 24px;
        }
      }
      h4 {
        margin-top: 25px;
        margin-bottom: 11px;
        font-size: 16px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 31px;
          margin-bottom: 14px;
          font-size: 20px;
        }
      }
      h5 {
        margin-top: 16px;
        margin-bottom: 11px;
        font-size: 14px;
        font-weight: 700;
        ${mq[0]} {
          margin-top: 20px;
          margin-bottom: 12px;
          font-size: 16px;
        }
      }
      h6 {
        margin: 16px 0;
        font-size: 14px;
        font-weight: 400;
        ${mq[0]} {
          margin: 31px 0;
          font-size: 16px;
        }
      }
      ol {
        margin-bottom: 12px;
        margin-left: 21px;
        ${mq[0]} {
          margin-left: 20px;
        }
      }
      ul {
        margin: 0;
        margin-bottom: 12px;
        list-style-type: none;
        li:before {
          content: '•';
          padding: 0 4px;
        }
      }
      li {
        margin-bottom: 5px;
      }
      p {
        margin-bottom: 15px;
      }
      blockquote {
        p,
        a {
          color: hsla(0, 0%, 0%, 0.5);
          font-style: italic;
          font-size: 13px;
          ${mq[0]} {
            font-size: 15px;
          }
        }
      }
      a {
        color: hsla(0, 0%, 0%, 0.8);
      }
      p,
      h6 {
        a {
          color: #234c34;
          text-decoration: none;
          ${mq[3]} {
            &:hover {
              color: #0d8d6c;
            }
          }
        }
      }
      code[class*='language-'] {
        font-size: 13px;
        ${mq[0]} {
          font-size: 14px;
        }
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
