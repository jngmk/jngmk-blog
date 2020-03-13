import React, { FunctionComponent, memo } from 'react';
import { css } from '@emotion/core';
import PostCategoryItem from './PostCategoryItem';
import { IPostCategoryListProps } from '../interface';

const PostCategoryList: FunctionComponent<IPostCategoryListProps> = memo(
  props => {
    const { renderPage, totalCount } = props;

    const uri = renderPage.replace(/\s/gi, "-")
    const pagePath = ['/', 'dev', 'daily'].includes(uri) ? `/${uri}` : `/tag/${uri}`

    const breakpoints = [576, 768, 992, 1200];
    const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

    const postCategoryListCss = css`
      display: inline-block;
      margin: 9px 0;
      padding: 0 12px;
      ${mq[1]} {
        margin: 12.5px 0 23px;
        padding: 0 23px;
      }
    `;

    return (
      <div css={postCategoryListCss}>
        <PostCategoryItem
          categoryName={renderPage === '/' ? 'all' : renderPage}
          totalCount={totalCount}
          pagePath={pagePath}
        />
        {/* {categoryList.map((category, idx) => (
          <PostCategoryItem
            key={idx}
            categoryName={category.fieldValue}
            totalCount={category.totalCount}
            pagePath={`/${renderPage}/${category.fieldValue}`}
          />
        ))} */}
      </div>
    );
  }
);

export default PostCategoryList;
