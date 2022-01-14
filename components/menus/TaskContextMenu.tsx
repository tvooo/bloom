import { NavArrowRight, FastArrowRight, SunLight, Tv, Cancel } from "iconoir-react";
import { nextMonday, nextSaturday, startOfToday, startOfTomorrow } from "date-fns";

import MenuItem from "components/menu/MenuItem";
import MenuSeparator from "components/menu/MenuSeparator";
import MenuHeading from "components/menu/MenuHeading";
import type { Task } from "model/task";
import { useTasks } from "utils/api";
import MoveToListMenu from "./MoveToListMenu";

const TaskContextMenu = ({ task }: { task: Task }) => {
  const { updateTask } = useTasks();
  const scheduleTask = (task: Task, scheduled: Date | null) => updateTask({ ...task, scheduled });
  
  return (
    <>
      <MenuHeading>Schedule</MenuHeading>
      <MenuItem
        onClick={() => scheduleTask(task, startOfToday())}
        icon={<SunLight />}
        label="Today"
      />
      <MenuItem onClick={() => scheduleTask(task, startOfTomorrow())} icon={<NavArrowRight />} label="Tomorrow" />
      <MenuItem onClick={() => scheduleTask(task, nextSaturday(new Date()))} icon={<Tv />} label="Weekend" />
      <MenuItem onClick={() => scheduleTask(task, nextMonday(new Date()))} icon={<FastArrowRight />} label="Next week" />
      <MenuItem onClick={() => scheduleTask(task, null)} icon={<Cancel />} label="Clear" />
      <MenuSeparator />
      <MenuHeading>Move to</MenuHeading>
      <MoveToListMenu task={task} />
    </>
  );
};

export default TaskContextMenu;