import React from "react";
import { styled } from "@linaria/react";

const NavItemLabel = styled.div`
  margin-left: 0.5rem;
`;

const NavItemContainer = styled.div`
  padding: 0.4rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  background: var(--color-neutral-lightest);
  background: transparent;

  transition: background 0.2s ease;

  cursor: pointer;

  &:hover, &[aria-pressed="true"] {
    background: var(--color-neutral-light);
    transition: background 0.1s ease;
  }
  &[aria-pressed="true"] {
    font-weight: 600;
  }
`;

interface NavItemProps {
  children: React.ReactNode;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  badge?: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ children, onClick, icon, isActive, badge = null }) => (
  <NavItemContainer onClick={onClick} aria-pressed={isActive}>
    {icon}
    <NavItemLabel>{children}</NavItemLabel>
    {badge}
  </NavItemContainer>
);

export default NavItem;
