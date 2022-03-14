import { styled } from '@linaria/react';
import { MenuWrapper } from 'components/menu/Menu';
import { Laptop, LogOut, Planet, Settings } from 'iconoir-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Menu, MenuItem, MenuSeparator, MenuStateReturn } from 'reakit/Menu';
import { FEAT_HORIZONS } from 'utils/meta';

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

const Separator = styled.hr`
  background: var(--color-neutral-light);
  height: 1px;
  border: none;
  margin: var(--space-sm) var(--space-sm);
`;

interface MenuProps {
    menu: MenuStateReturn;
}

const UserMenu: React.FC<MenuProps> = ({ menu }) => {
    const { push } = useRouter();
    return (
    <Menu {...menu} aria-label="Preferences" as={MenuWrapper}>
        {FEAT_HORIZONS && <MenuItem {...menu} as={MenuItemButton} onClick={() => push('/horizons')}><Planet /> Horizons</MenuItem>}
        <MenuItem {...menu} as={MenuItemButton} onClick={() => push("/settings")}><Settings /> Settings</MenuItem>
        <MenuItem {...menu} as={MenuItemButton}><Laptop /> Keyboard shortcuts</MenuItem>
        <MenuSeparator {...menu} as={Separator} />
        <MenuItem {...menu} as={MenuItemButton}><LogOut /> Log out</MenuItem>
    </Menu>
);
    }

export default UserMenu;