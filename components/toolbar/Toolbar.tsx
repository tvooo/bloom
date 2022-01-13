import React from "react";
import { styled } from "@linaria/react";

import Logo from "./Logo";
import { FastArrowLeftBox, FastArrowRightBox } from "iconoir-react";
import Button from "components/Button";

const ToolBarWrapper = styled.nav`
  display: flex;
  padding: var(--space-lg) var(--space-lg);

  & > * {
    margin-right: 0.5rem;
  }
`;

const Toolbar = ({ showSidebar, onToggleSidebar }: { showSidebar: boolean; onToggleSidebar: () => void}) => (
  <ToolBarWrapper>
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.4rem', justifyContent: 'center' }}>
      <Logo />
      <strong>&nbsp; teaque</strong>
    </div>
    <Button onClick={() => onToggleSidebar()}>{showSidebar ? <FastArrowLeftBox /> : <FastArrowRightBox />}</Button>
  </ToolBarWrapper>
);

export default Toolbar;
