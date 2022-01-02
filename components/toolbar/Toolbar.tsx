import React from "react";
import { styled } from "@linaria/react";
import { Plus } from "iconoir-react";

import Button from "components/Button";
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
    <Logo />
    <Button onClick={() => null}>
      <Plus style={{ marginRight: "0.5rem" }} />{" "}
      <span style={{ textDecoration: "underline" }}>Q</span>uick add
    </Button>
  </ToolBarWrapper>
);

export default Toolbar;
