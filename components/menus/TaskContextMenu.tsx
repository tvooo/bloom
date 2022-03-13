import { NavArrowRight, FastArrowRight, SunLight, Tv, Cancel } from "iconoir-react";
import { nextMonday, nextSaturday, startOfToday, startOfTomorrow } from "date-fns";

import MenuSeparator from "components/menu/MenuSeparator";
import MenuHeading from "components/menu/MenuHeading";
import type { Task } from "model/task";
import { useTasks } from "utils/api";
import MoveToListMenu from "./MoveToListMenu";
import { Menu, MenuItem, MenuStateReturn } from 'reakit/Menu';
import { MenuWrapper } from "components/menu/Menu";
import React from "react";
import MenuItemButton from "./MenuItemButton";

const TaskContextMenu = ({ task, menu }: { task: Task, menu: MenuStateReturn }) => {
  const { updateTask } = useTasks();
  const scheduleTask = (task: Task, scheduled: Date | null) => updateTask({ ...task, scheduled });

  return (
    <Menu {...menu} aria-label="Task actions" as={MenuWrapper}>
      <MenuHeading>Schedule</MenuHeading>
      <MenuItem
        {...menu}
        as={MenuItemButton}
        onClick={() => scheduleTask(task, startOfToday())}
      ><SunLight /> Today</MenuItem>
      <MenuItem
        {...menu}
        as={MenuItemButton}
        onClick={() => scheduleTask(task, startOfTomorrow())}
      ><NavArrowRight /> Tomorrow</MenuItem>
      <MenuItem
        {...menu}
        as={MenuItemButton}
        onClick={() => scheduleTask(task, nextSaturday(new Date()))}
      ><Tv /> Weekend</MenuItem>
      <MenuItem
        {...menu}
        as={MenuItemButton}
        onClick={() => scheduleTask(task, nextMonday(new Date()))}
      ><FastArrowRight /> Next week</MenuItem>
      <MenuItem
        {...menu}
        as={MenuItemButton}
        onClick={() => scheduleTask(task, null)}
      ><Cancel /> Clear</MenuItem>
      <MenuSeparator />
      <MenuItem {...menu} as={MoveToListMenu} task={task} />
    </Menu>
  );
};

export default TaskContextMenu;