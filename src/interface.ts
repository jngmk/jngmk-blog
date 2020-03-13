import { ReplaceComponentRendererArgs } from 'gatsby';
import { MarkdownRemark, MarkdownRemarkGroupConnection } from '../types/graphql-types'

export type ITemplateProps<T> = ReplaceComponentRendererArgs['props'] & {
  pageContext: {
    isCreatedByStatefulCreatePages: boolean;
  } & T;
};

export interface IPostTemplateContext {
  title: string;
  slug: string;
  date: string;
  html: string;
}

export interface IPostListTemplateContext {
  pagePath: string,
  tagName: string;
  totalCount: number;
  nodes: Array<Pick<MarkdownRemark, 'frontmatter' | 'excerpt' | 'id'>>;
}


export type IDisqusProps = {
  identifier: string;
  slug: string;
  title: string;
}

export type IPostCategoryListProps = {
  renderPage: string;
  totalCount: number;
  categoryList?: MarkdownRemarkGroupConnection[];
}

export type IPostCategoryItemProps = {
  categoryName: string;
  totalCount: number;
  pagePath: string;
}

export type IPostListTags = {
  tags: Array<string>;
}

export type IPostListTagItem = {
  tag: string;
}