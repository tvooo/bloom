import MenuSeparator from "components/menu/MenuSeparator";
import type { Task } from "model/task";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import { Area, Project } from "model/list";
import { Menu, MenuButton, MenuItem, useMenuState } from "reakit/Menu";
import React from "react";
import { MenuWrapper } from "components/menu/Menu";
import MenuItemButton from "./MenuItemButton";

const MoveToListMenu: React.FC<{ task: Task }> = React.forwardRef<HTMLButtonElement, { task: Task }>(({ task, ...props }, ref) => {
  const menu = useMenuState();
  const { lists } = useLists();
  const areas: Area[] = lists.filter(isArea);
  const projects: Project[] = lists.filter(isProject);
  const { updateTask } = useTasks();
  const moveToList = (id: number) => () => updateTask({ ...task, list: id });
  return (
    <>
      <MenuButton ref={ref} {...menu} as={MenuItemButton} {...props}>
        Move to...
      </MenuButton>
      <Menu {...menu} aria-label="Preferences" as={MenuWrapper}>
        {areas.map((area) => (
          <MenuItem
            {...menu}
            as={MenuItemButton}
            key={area.id}
            onClick={moveToList(area.id)}
          >{area.label}</MenuItem>
        ))}
        <MenuSeparator />
        {projects.map((project) => (
          <MenuItem
            {...menu}
            as={MenuItemButton}
            key={project.id}
            onClick={moveToList(project.id)}
          >{project.label}</MenuItem>
        ))}
      </Menu>
    </>
  );
});

export default MoveToListMenu;
