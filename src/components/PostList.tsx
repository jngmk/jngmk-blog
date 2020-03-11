import React, { FunctionComponent, memo } from 'react';
import { Link } from 'gatsby';
import PostHeader from './PostListHeader';
import { IPostListTemplateContext } from '../interface';
import { css } from '@emotion/core'


type IPostListProps = Pick<IPostListTemplateContext, 'nodes'>;

const PostList: FunctionComponent<IPostListProps> = memo(({ nodes }) => {
  const breakpoints = [576, 768, 992, 1200]

  const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  )

  const postListCss = css`
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      border-radius: 0.55vh;
      &:hover {
        background-color: #F3F4F2;
        h2 {
          color: black;
        }
      }
    }
    a {
      text-decoration: none;
    }
    p {
      font-size: 14px;
      color: #131614;
      padding: 0 1.5vh 1.8vh;
      ${mq[0]} {
        font-size: 16px;
      }
      ${mq[1]} {
        padding: 0 2.2vh 1.8vh;
      }
    }
  `
  return (
    <ul css={postListCss}>
      {nodes.map(({ id, excerpt, frontmatter: { title, slug, date } }) => (
        <li key={id}>
          <Link
            to={slug}
            title={title}
          >
            <PostHeader title={title} date={date} />
            <p>{excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
});

PostList.displayName = 'PostList';

export default PostList;