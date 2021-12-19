import {
  SunLight,
  BoxIso,
  MailOpened,
  Calendar,
  Box,
} from "iconoir-react";

import {
  addTask,
  completeTask,
  renameTask,
  scheduleTask,
  deleteTask,
  Task,
} from "model/task";
import { isScheduledOn, inArea, inProject, not, isScheduledAfter, isScheduledBefore } from "utils/filters";
import type { ListViewProps } from './ListView';
import { ProgressPie } from "components/Pie";
import { endOfToday, startOfTomorrow } from "date-fns";

const getProgress = (tasks): number => tasks.length > 0 ? (100 * tasks.filter(t => t.status === "done").length / tasks.length) : 0;

const getListViewProps = (list: string, tasks, dispatch, _mutate, projects): ListViewProps => {
  const commonProps = {
    onComplete: (id, completed) =>
      completeTask(dispatch)(id, completed),
    onEdit: (task: Task, label: string) => renameTask(dispatch)(task, label),
    onDelete: (task: Task) => deleteTask(dispatch)(task),
    onSchedule: (task: Task, scheduled: Date | null) =>
      scheduleTask(dispatch)(task, task.scheduled ? null : scheduled),
    dispatch,
  };
  if (list === "inbox") {
    return {
      title: "Inbox",
      icon: <MailOpened height="1em" />,
      showScheduled: true,
      items: tasks.filter(t => inProject("_inbox")(t) && !t.area).filter(not(isScheduledOn())),
      addTask: (task) => addTask(dispatch)(task),
      ...commonProps,
    };
  }

  if (list === "today") {
    return {
      title: "Today",
      icon: <SunLight height="1em" color="var(--color-today)" />,
      items: tasks.filter(isScheduledBefore(startOfTomorrow())),
      showLocation: true,
      showScheduled: false,
      ...commonProps,
    };
  }

  if (list === "upcoming") {
    return {
      title: "Upcoming",
      icon: <Calendar height="1em" />,
      items: tasks.filter(isScheduledAfter(endOfToday())),
      showLocation: true,
      showScheduled: false,
      ...commonProps,
    };
  }

  if (list === "archive") {
    return {
      title: "Archive",
      icon: <Box height="1em" />,
      items: tasks.filter(t => t.status === "done"),
      showLocation: true,
      showScheduled: true,
      ...commonProps,
    };
  }

  if (list.startsWith("area:")) {
    const area = list.replace("area:", "");
    return {
      title: area,
      icon: <BoxIso height="1em" />,
      showScheduled: true,
      items: [
        // ...projects.filter(inArea(route.replace("area:", ""))),
        ...tasks.filter(inArea(area)),
      ],
      addTask: (task) => addTask(dispatch)({ ...task, area }),
      ...commonProps,
    };
  }

  if (list.startsWith("project:")) {
    const project = list.replace("project:", "");
    return {
      title: project,
      icon: <ProgressPie progress={getProgress(tasks.filter(inProject(project)))} />,
      showScheduled: true,
      items: tasks.filter(inProject(project)),
      addTask: (task) => addTask(dispatch)({ ...task, project }),
      isRenamable: true,
      list: projects.find(p => p.label === project),
      ...commonProps,
    };
  }

  return {
    title: "Impossible!",
    icon: <></>,
    items: [],
    onDelete: () => null,
    onComplete: () => null,
    onEdit: () => null,
    onSchedule: () => null,
    dispatch: () => null,
  };
};

export default getListViewProps;
