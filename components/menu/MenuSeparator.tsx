import { styled } from "@linaria/react";

import MenuItemWrapper from "./MenuItemWrapper";

const Separator = styled.hr`
  background: none;
  border: none;
  margin: var(--space-sm);
`;

const MenuSeparator = () => (
  <MenuItemWrapper aria-hidden>
    <Separator />
  </MenuItemWrapper>
);

export default MenuSeparator;
