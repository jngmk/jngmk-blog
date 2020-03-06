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
    border-bottom: 0.1vh solid #eeeeee;
    margin-bottom: 2vh;
    padding: 2vh 2vh;
    ${mq[1]} {
      padding: 2vh 3.5vh;
    }

    div {
      display: inline-block;
      margin: 0;
      font-size: 1.3vh;
      font-weight: 500;
      ${mq[1]} {
        font-size: 1.5vh;
      }
      a {
        color: #234c34;
        text-decoration: none;
        margin-left: 2vh;
        &:hover {
          color: #0d8d6c;
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
      font-size: 1.5vh;
      font-weight: 900;
      ${mq[1]} {
        font-size: 1.7vh;
      }
      a {
        margin: 0;
      }
    }
  `;

  return (
    <nav css={navbarCss}>
      <div className="nav-container">
        <div className={`nav-main`}>
          <Link to="/">{siteTitle}</Link>
        </div>
        <div>
          <Link to="/posts">blog</Link>
          <Link to="/daily">daily</Link>
          <Link to="/about">about</Link>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
