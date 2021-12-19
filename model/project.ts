import type { DataItem } from "./common"
import { actions } from "./reducer";

export interface Project extends DataItem {
  label: string;
  area?: string;
}

const makeHeaders = (payload: any) =>
  new Headers({
    "Content-Type": "application/json",
    "Content-Length": "" + JSON.stringify(payload).length,
  });

const patchProject = (taskId: number, payload: any) =>
  fetch(`http://localhost:3001/projects/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: makeHeaders(payload),
  });

export const addProject = (dispatch) => async (project: Omit<Project, 'id'>) => {
  const headers = makeHeaders(project);
  const response = await fetch(`http://localhost:3001/projects`, {
    method: "POST",
    body: JSON.stringify(project),
    headers,
  });
  const newTask = await response.json();
  dispatch({ type: actions.ADD_PROJECT, project });
};

export const renameProject = (dispatch) => (project: Project, label: string) => {
  const newProject = { ...project, label };
  dispatch({ type: actions.RENAME_PROJECT, project, label });
  patchProject(project.id, newProject);
};

export const setProjects = (dispatch) => (projects) =>
  dispatch({ type: actions.SET_PROJECTS, projects });