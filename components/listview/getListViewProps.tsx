import {
  SunLight,
  BoxIso,
  MailOpened,
  Calendar,
  Box,
} from "iconoir-react";

import {
  Task,
} from "model/task";
import { inArea, inProject, not, isScheduledAfter, isScheduledBefore, isScheduled, ensureDate } from "utils/filters";
import type { ListViewProps } from './ListView';
import { ProgressPie } from "components/Pie";
import { endOfToday, isToday, parseISO, startOfToday, startOfTomorrow } from "date-fns";
import type { List } from "model/list";

const getProgress = (tasks: Task[]): number => tasks.length > 0 ? (100 * tasks.filter(t => t.status === "DONE").length / tasks.length) : 0;

const getListViewProps = (route: string, tasks: Task[], lists: List[]): ListViewProps => {
  const commonProps = {
    splitCompletedTasks: true,
  };

  if (route === "_inbox") {
    return {
      title: "Inbox",
      icon: <MailOpened height="1em" />,
      showScheduled: true,
      items: tasks.filter(t => !t.list).filter(not(isScheduled)),
      ...commonProps,
    };
  }

  if (route === "_today") {
    return {
      title: "Today",
      icon: <SunLight height="1em" color="var(--color-today)" />,
      items: tasks.filter(task => {
        if(isScheduledBefore(startOfTomorrow())(task) && task.status === "TODO") {
          return true;
        }
        if(task.status === "DONE" && !!task.completedAt && isToday(ensureDate(task.completedAt))) {
          return true;
        }
        return false;
      }),
      showLocation: true,
      showScheduled: false,
      addTaskPreset: { scheduled: startOfToday() },
      ...commonProps,
    };
  }

  if (route === "_upcoming") {
    return {
      title: "Upcoming",
      icon: <Calendar height="1em" />,
      items: tasks.filter(isScheduledAfter(endOfToday())),
      showLocation: true,
      showScheduled: false,
      splitByDate: true,
      ...commonProps,
    };
  }

  if (route === "_archive") {
    return {
      title: "Archive",
      icon: <Box height="1em" />,
      items: tasks.filter(t => t.status === "DONE"),
      showLocation: true,
      showScheduled: true,
      ...commonProps,
      splitCompletedTasks: false,
    };
  }

  if(route.length >= 1 && !route.startsWith('_')) {
    // is a list id
    const list = lists.find(l => `${l.id}` === route);
    console.log(list);
    // con
    if(list && list.type === "AREA") {
      return {
        title: list.label,
        icon: <BoxIso height="1em" />,
        showScheduled: true,
        items: [
          // ...projects.filter(inArea(route.replace("area:", ""))),
          ...tasks.filter(inArea(list)),
        ],
        isRenamable: true,
        list,
        addTaskPreset: { list: list.id },
        ...commonProps,
      };
    } else if(list && list.type === "PROJECT") {
      return {
        title: list.label,
        icon: <ProgressPie progress={getProgress(tasks.filter(inProject(list)))} size={24} />,
        showScheduled: true,
        items: tasks.filter(inProject(list)),
        isRenamable: true,
        addTaskPreset: { list: list.id },
        list,
        ...commonProps,
      };
    }
  }

  return {
    title: "Impossible!",
    icon: <>💀</>,
    items: [],
  };
};

export default getListViewProps;
