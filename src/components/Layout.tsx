/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent, memo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { css } from '@emotion/core'

import Navbar from "./Navbar"
import "./layout.css"

const Layout:FunctionComponent = memo(({ children }) => {
  const breakpoints = [576, 768, 992, 1200]

  const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  )

  const layoutCss = css`
    max-width: 840px;
    margin: 12px auto 0;
    padding: 0 6.5px 28.5px;
    ${mq[1]} {
      margin: 36.5px auto 0;
      padding: 0 14.5px 36.5px;
    }
  `

  const SiteTitle = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Navbar siteTitle={SiteTitle.site.siteMetadata.title} />
      <div css={layoutCss}>
        <main>{children}</main>
        <footer>
        </footer>
      </div>
    </>
  )
});

export default Layout
