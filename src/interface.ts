import { ReplaceComponentRendererArgs } from 'gatsby';
import { MarkdownRemark } from '../types/graphql-types'

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
  title: string;
  pagePath: string;
  category: string;
  nodes: Array<Pick<MarkdownRemark, 'frontmatter' | 'excerpt' | 'id'>>;
}


export type IDisqusProps = {
  identifier: string;
  slug: string;
  title: string;
}