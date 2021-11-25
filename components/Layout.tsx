import { styled } from "@linaria/react";
import { css } from '@linaria/core';

const globalStyle = css`
  :global() {
    html {
      box-sizing: border-box;
      font-family: monospace;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }
  }`;

const Layout = styled.div`
  margin: 2rem;
`;

export default Layout;