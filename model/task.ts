import type { DataItem } from "./common";

export type TaskStatus = "TODO" | "DONE";

export interface Task extends DataItem {
  label: string;
  list?: number;
  status: TaskStatus;
  scheduled: Date | null;
  completedAt?: Date;
}
