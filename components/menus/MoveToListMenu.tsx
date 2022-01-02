import {
  LongArrowDownRight,
} from "iconoir-react";

import MenuItem from "components/menu/MenuItem";
import MenuSeparator from "components/menu/MenuSeparator";
import type { Task } from "model/task";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import { Area, Project } from "model/list";

const MoveToListMenu = ({ task }: { task: Task }) => {
  const { lists } = useLists();
  const areas: Area[] = lists.filter(isArea);
  const projects: Project[] = lists.filter(isProject);
  const { updateTask } = useTasks();
  const moveToList = (id: number) => () => updateTask({ ...task, list: id });
  return (
    <>
      {areas.map((area) => (
        <MenuItem
          key={area.id}
          icon={<LongArrowDownRight />}
          label={area.label}
          onClick={moveToList(area.id)}
        />
      ))}
      <MenuSeparator />
      {projects.map((project) => (
        <MenuItem
          key={project.id}
          icon={<LongArrowDownRight />}
          label={project.label}
          onClick={moveToList(project.id)}
        />
      ))}
    </>
  );
};

export default MoveToListMenu;
