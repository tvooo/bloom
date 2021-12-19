import { styled } from '@linaria/react'

import MenuItemWrapper from './MenuItemWrapper';

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
  padding: 0.2rem;

  &:hover {
    background: var(--color-neutral-lighter);
  }
`;

const MenuItemIcon = styled.div`
  flex: 0 0 auto;
  margin-right: 0.2rem;
`;

const MenuItemLabel = styled.div`
  flex: 1 1 auto;
`;

const MenuItem = ({ icon, label, onClick }) => (
  <MenuItemWrapper>
  <MenuItemButton onClick={() => onClick && onClick()}>
    <MenuItemIcon>{icon}</MenuItemIcon>
    <MenuItemLabel>{label}</MenuItemLabel>
  </MenuItemButton>
  </MenuItemWrapper>
);

export default MenuItem;