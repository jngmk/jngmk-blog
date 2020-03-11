import React, { FunctionComponent } from 'react'
import { css } from '@emotion/core'
import PostCategoryItem from './PostCategoryItem'
import { IPostCategoryListProps } from '../interface'

const PostCategoryList:FunctionComponent<IPostCategoryListProps> = (props) => {
  const { renderPage, totalCount, categoryList } = props

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const postCategoryListCss = css`
    display: inline-block;
    margin: 1.2vh 0 2.2vh;
    padding: 0 1.5vh;
    ${mq[1]} {
      padding: 0 2.2vh;
    }
  `;

  return (
    <div css={postCategoryListCss}>
      <PostCategoryItem categoryName={'All'} totalCount={totalCount} pagePath={`/${renderPage}`} />
      {categoryList.map((category, idx) => <PostCategoryItem key={idx} categoryName={category.fieldValue} totalCount={category.totalCount} pagePath={`/${renderPage}/${category.fieldValue}`} />)}
    </div>
  )
}

export default PostCategoryList