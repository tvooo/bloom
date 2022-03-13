import { styled } from "@linaria/react";

const MenuItemButton = styled.button`
background: none;
border: none;
cursor: pointer;
width: 100%;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  border-radius: 0.2rem;
  padding: var(--space-sm);
  gap: var(--space-xs);
  &:hover {
    background: var(--color-neutral-lighter);
  }
`;

export default MenuItemButton;