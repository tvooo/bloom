import type { DataItem } from "./common"

export type ListId = number;
export interface Project extends DataItem {
  label: string;
  list?: ListId;
  type: "PROJECT";
  status: "OPEN" | "COMPLETED";
  completedAt?: Date;
}
export interface Area extends DataItem {
  label: string;
  type: "AREA";
  status: "OPEN" | "COMPLETED";
}
export type List = Project | Area;
