import { NavArrowRight, FastArrowRight, SunLight, Tv } from "iconoir-react";
import { nextMonday, startOfToday, startOfTomorrow } from "date-fns";

import MenuItem from "components/menu/MenuItem";
import MenuSeparator from "components/menu/MenuSeparator";
import type { Task } from "model/task";
import { useTasks } from "utils/api";
import MoveToListMenu from "./MoveToListMenu";

const TaskContextMenu = ({ task }: { task: Task }) => {
  const { updateTask } = useTasks();
  const scheduleTask = (task: Task, scheduled: Date) => updateTask({ ...task, scheduled });
  
  return (
    <>
      <MenuSeparator />
      <MenuItem
        onClick={() => scheduleTask(task, startOfToday())}
        icon={<SunLight />}
        label="Today"
      />
      <MenuItem onClick={() => scheduleTask(task, startOfTomorrow())} icon={<NavArrowRight />} label="Tomorrow" />
      <MenuItem onClick={() => scheduleTask(task, nextMonday(new Date()))} icon={<Tv />} label="Weekend" />
      <MenuItem onClick={() => scheduleTask(task, nextMonday(new Date()))} icon={<FastArrowRight />} label="Next week" />
      <MenuSeparator />
      <MoveToListMenu task={task} />
    </>
  );
};

export default TaskContextMenu;