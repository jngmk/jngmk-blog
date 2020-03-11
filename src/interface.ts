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
  category1: string;
  category2: string;
  categoryList: MarkdownRemarkGroupConnection[];
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
  categoryList: MarkdownRemarkGroupConnection[];
}

export type IPostCategoryItemProps = {
  categoryName: string;
  totalCount: number;
  pagePath: string;
}