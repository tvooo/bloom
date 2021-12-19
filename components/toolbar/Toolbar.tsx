import React from "react";
import { styled } from "@linaria/react";
import { Plus } from "iconoir-react";

import Button from "components/Button";

const ToolBarWrapper = styled.nav`
  display: flex;
  padding: var(--space-lg) var(--space-lg);

  & > * {
    margin-right: 0.5rem;
  }
`;

const Toolbar = () => (
  <ToolBarWrapper>
    <h1><span style={{ opacity: '0.9' }}>b</span><span style={{ opacity: '0.8' }}>l</span><span style={{ opacity: '0.7' }}>o</span><span style={{ opacity: '0.6' }}>o</span><span style={{ opacity: '0.5' }}>m</span></h1>
    <Button onClick={() => null}>
      <Plus style={{ marginRight: "0.5rem" }} />{" "}
      <span style={{ textDecoration: "underline" }}>Q</span>uick add
    </Button>
  </ToolBarWrapper>
);

export default Toolbar;
