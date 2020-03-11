import React, { FunctionComponent, memo } from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';

type INavbarProps = {
  siteTitle: string;
};

const Navbar: FunctionComponent<INavbarProps> = memo(({ siteTitle }) => {
  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (min-width: ${bp}px)`);

  const navbarCss = css`
    background-color: white;
    border-bottom: 0.1px solid #eeeeee;
    margin-bottom: 12px;
    padding: 16px 18px;
    ${mq[1]} {
      margin-bottom: 21px;
      padding: 21px 36.5px;
    }

    div {
      display: inline-block;
      margin: 0;
      font-weight: 500;
      font-size: 15.5px;
      a {
        color: #234c34;
        text-decoration: none;
        margin-left: 16px;
        ${mq[3]} {
          &:hover {
            color: #0d8d6c;
          }
        }
      }
      [aria-current]:not([aria-current="false"]) {
        font-weight: 700;
        &:hover {
          color: #234c34;
        }
      }
    }

    .nav-container {
      margin: 0 auto;
      // max-width: 130vh;
      display: flex;
      justify-content: space-between;
    }

    .nav-main {
      font-size: 17.5px;
      font-weight: 900;
      a {
        margin: 0;
      }
    }
  `;

  return (
    <nav css={navbarCss}>
      <div className="nav-container">
        <div className={`nav-main`}>
          <Link to="/" aria-current="false">{siteTitle}</Link>
        </div>
        <div>
          <Link to="/dev">dev</Link>
          <Link to="/daily">daily</Link>
          <Link to="/about">about</Link>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
