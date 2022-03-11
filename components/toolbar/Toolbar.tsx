import React from "react";
import { styled } from "@linaria/react";

import Logo from "./Logo";

const ToolBarWrapper = styled.nav`
  display: flex;
  padding: var(--space-lg) var(--space-lg);

  & > * {
    margin-right: 0.5rem;
  }
`;

const Toolbar = () => (
  <ToolBarWrapper>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', justifyContent: 'center' }}>
      <Logo />
      <strong>&nbsp; Teaque</strong>
    </div>
  </ToolBarWrapper>
);

export default Toolbar;
