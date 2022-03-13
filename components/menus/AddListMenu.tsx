import { MenuWrapper } from 'components/menu/Menu';
import { Circle, Svg3DSelectSolid } from 'iconoir-react';
import React from 'react';
import { Menu, MenuItem, MenuStateReturn } from 'reakit/Menu';
import { useLists } from 'utils/api';
import MenuItemButton from './MenuItemButton';

interface MenuProps {
    menu: MenuStateReturn;
}

const AddListMenu: React.FC<MenuProps> = ({ menu }) => {
    const { addList } = useLists();
    return (
    <Menu {...menu} aria-label="Add list" as={MenuWrapper}>
        <MenuItem {...menu} as={MenuItemButton} onClick={() => addList({ label: "New project", type: "PROJECT" })}><Circle /> Project</MenuItem>
        <MenuItem {...menu} as={MenuItemButton} onClick={() => addList({ label: "New area", type: "AREA" })}><Svg3DSelectSolid /> Area</MenuItem>
    </Menu>
);
    }

export default AddListMenu;