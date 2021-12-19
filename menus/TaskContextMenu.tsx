import { LongArrowDownRight, NavArrowRight, FastArrowRight, SunLight, Trash, Tv } from "iconoir-react";
import { nextMonday, startOfToday, startOfTomorrow } from "date-fns";

import MenuItem from "components/menu/MenuItem";
import MenuSeparator from "components/menu/MenuSeparator";
import type { Task } from "model/task";
import { deleteTask, scheduleTask } from "model/task";

const TaskContextMenu = ({ task, dispatch }: { task: Task, dispatch: Function }) => {
  return (
      <>
        <MenuItem icon={<LongArrowDownRight />} label="Move to project/area" onClick={() => console.log("Not implemented yet")} />
        <MenuSeparator />
        <MenuItem
          onClick={() => scheduleTask(dispatch)(task, startOfToday())}
          icon={<SunLight />}
          label="Today"
        />
        <MenuItem onClick={() => scheduleTask(dispatch)(task, startOfTomorrow())} icon={<NavArrowRight />} label="Tomorrow" />
        <MenuItem onClick={() => scheduleTask(dispatch)(task, nextMonday(new Date()))} icon={<Tv />} label="Weekend" />
        <MenuItem onClick={() => scheduleTask(dispatch)(task, nextMonday(new Date()))} icon={<FastArrowRight />} label="Next week" />
        <MenuSeparator />
        <MenuItem
          onClick={() => deleteTask(dispatch)(task)}
          icon={<Trash />}
          label="Delete"
        />
      </>
    );
  };

  export default TaskContextMenu;