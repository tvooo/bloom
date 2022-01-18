import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";

import type { Task } from 'model/task';
import type { List, Project, Area } from 'model/list';

export const ensureDate = (dt: Date | string): Date => {
  return dt instanceof Date ? dt : parseISO(dt);
}

// List filters
export const isProject = (list: List): list is Project => list.type === "PROJECT";
export const isArea = (list: List): list is Area => list.type === "AREA";

// Project filters
export const withoutArea = (project: Project): boolean => !project.list;

// Task filters
export const inProject = (project: Project) => (task: Task): boolean => task.list === project.id;

// Task & Project filters
export const inArea = (area: Area) => (project: Project | Task): boolean => project.list === area.id;
export const isScheduled = (task: Task): boolean => !!task.scheduled;
export const isScheduledOn = (date: Date) => (task: Task): boolean =>
  task.scheduled ? isSameDay(ensureDate(task.scheduled), date) : false;
export const isScheduledBefore = (date: Date) => (task: { scheduled: Date | null }): boolean =>
  task.scheduled ? isBefore(ensureDate(task.scheduled), date) : false;
export const isScheduledAfter = (date: Date) => (task: Task): boolean =>
  task.scheduled ? isAfter(ensureDate(task.scheduled), date) : false;
// Generic filters
export const not = (fn: (...item: any[]) => boolean) => (...item: any[]): boolean => !fn(...item);