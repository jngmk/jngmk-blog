/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from 'gatsby';
import React, { FunctionComponent } from 'react';
import Helmet from 'react-helmet';

export interface ISEOProps {
  lang?: string;
  title?: string;
  description?: string;
  url?: string;
  isBlogPost?: boolean;
  imageUrl?: string;
}

const SEO: FunctionComponent<ISEOProps> = React.memo(
  ({
    url = '',
    imageUrl = '',
    isBlogPost = true,
    description: _description,
    lang = 'ko',
    title,
  }) => {
    const { site } = useStaticQuery(
      graphql`
        query SEO {
          site {
            siteMetadata {
              title
              description
              author
              siteUrl
            }
          }
        }
      `,
    );

    const description = (_description || site.siteMetadata.description).replace(/\n/g, ' ');

    return (
      <Helmet titleTemplate={`%s | ${site.siteMetadata.title}`}>
        <html lang={lang} />
        <title lang={lang}>{title}</title>
        <link rel="canonical" href={site.siteMetadata.siteUrl + url} />

        {/* 기본 */}
        <meta name="description" content={description} />
        {imageUrl && <meta name="image" content={imageUrl} />}

        {/* Open Graph */}
        <meta property="og:url" content={site.siteMetadata.siteUrl + url} />
        {isBlogPost ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content={site.siteMetadata.author} />
      </Helmet>
    );
  },
);

export default SEO;