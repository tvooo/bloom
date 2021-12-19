import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";

import type { Task } from 'model/task';
import type { Project } from 'model/project';

export const ensureDate = (dt: Date | string): Date => {
  return dt instanceof Date ? dt : parseISO(dt);
}

// Project filters
export const withoutArea = (project: Project): boolean => !project.area;

// Task filters
export const inProject = (project: string) => (task): boolean => task.project === project;

// Task & Project filters
export const inArea = (area: string) => (project: Project): boolean => project.area === area;
export const isScheduledOn = (date?: Date) => (task: Task): boolean =>
  !date ? !!task.scheduled : isSameDay(ensureDate(task.scheduled), date);
  export const isScheduledBefore = (date?: Date) => (task: Task): boolean =>
  !date ? !!task.scheduled : isBefore(ensureDate(task.scheduled), date);
  export const isScheduledAfter = (date?: Date) => (task: Task): boolean =>
  !date ? !!task.scheduled : isAfter(ensureDate(task.scheduled), date);
// Generic filters
export const not = (fn) => (item): boolean => !fn(item);