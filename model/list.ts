import type { DataItem } from "./common"

export type ListId = number;
export interface Project extends DataItem {
  label: string;
  list?: ListId;
  type: "PROJECT";
}
export interface Area extends DataItem {
  label: string;
  type: "AREA";
}
export type List = Project | Area;
