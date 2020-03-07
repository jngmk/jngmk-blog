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
    margin: 3.5vh auto 0;
    max-width: 960px;
    padding: 0 0.8vh 3.5vh;
    ${mq[1]} {
      padding: 0 1.4vh 3.5vh;
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
