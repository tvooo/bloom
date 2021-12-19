import { styled } from "@linaria/react";
import { css } from "@linaria/core";

const reset = css`
  :global() {
    /*
  1. Use a more-intuitive box-sizing model.
*/
    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
    /*
  2. Remove default margin
*/
    * {
      margin: 0;
    }
    /*
  3. Allow percentage-based heights in the application
*/
    html,
    body {
      height: 100%;
    }
    /*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
    body {
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }
    /*
  6. Improve media defaults
*/
    img,
    picture,
    video,
    canvas,
    svg {
      display: block;
      max-width: 100%;
    }
    /*
  7. Remove built-in form typography styles
*/
    input,
    button,
    textarea,
    select {
      font: inherit;
    }
    /*
  8. Avoid text overflows
*/
    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      overflow-wrap: break-word;
    }
    /*
  9. Create a root stacking context
*/
    #root,
    #__next {
      isolation: isolate;
    }
  }
`;

const globalStyle = css`
  :global() {
    html {
      box-sizing: border-box;
      font-family: monospace;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Ubuntu, Roboto,
        Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
        "Segoe UI Symbol";
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    #__next {
      height: 100%;
    }
  }
`;

const Layout = styled.div`
  /* margin: 2rem; */
  --space-large: 1rem;

  --color-neutral-lightest: white;
  --color-neutral-lighter: #f2f2f2;
  --color-neutral-light: #ddd;

  --color-focus: blue;
  
  /* palx: #e6838b */
  --color-neutral-lightest: white;
  --color-neutral-lighter: #faf9f9;
  --color-neutral-light: #f1eced;

  --color-focus: #7c5ea5;

  --color-project: #437659;
  --color-project: #64af83;
  --color-today: #6166aa;
  --color-next: #6166aa;
  --color-area: #73a6ca;
  --color-destructive: #9c595e;

  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  --font-size-sm: 14px;
  --line-height-sm: 1.5;

  --font-size-md: 16px;
  --line-height-md: 24px; // 1.5

  --font-size-lg: 24px;
  --line-height-lg: 1.5;

  display: flex;
  flex-direction: column;
  height: 100%;

  background: var(--color-neutral-lighter);
`;

export default Layout;
