import { createContext } from "react";

export enum actions {
  ADD_TASK,
  SET_TASKS,
  COMPLETE_TASK,
  RENAME_TASK,
  SCHEDULE_TASK,
  DELETE_TASK,

  ADD_PROJECT,
  SET_PROJECTS,
  RENAME_PROJECT,
  // DELETE_PROJECT,
  // COMPLETE_PROJECT,
}

const initialState = {
  projects: [],
  tasks: [],
  areas: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.task] };
    case actions.COMPLETE_TASK: {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.task.id);
      if (taskIndex === -1) {
        return state;
      }
      const newState = { ...state, tasks: [...state.tasks] };
      newState.tasks[taskIndex].status = action.complete ? "done" : "todo";
      return newState;
    }
    case actions.RENAME_TASK: {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.task.id);
      if (taskIndex === -1) {
        return state;
      }
      const newState = { ...state, tasks: [...state.tasks] };
      newState.tasks[taskIndex].label = action.label;
      return newState;
    }
    case actions.SCHEDULE_TASK: {
      const taskIndex = state.tasks.findIndex((t) => t.id === action.task.id);
      if (taskIndex === -1) {
        return state;
      }
      const newState = { ...state, tasks: [...state.tasks] };
      newState.tasks[taskIndex].scheduled = action.scheduled;
      return newState;
    }
    case actions.DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.task.id),
      };
    }
    case actions.SET_TASKS:
      return { ...state, tasks: action.tasks };

    case actions.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.project] };
    case actions.SET_PROJECTS:
      return { ...state, projects: action.projects };
      case actions.RENAME_PROJECT: {
        const projectIndex = state.projects.findIndex((t) => t.id === action.project.id);
        if (projectIndex === -1) {
          return state;
        }
        const newState = { ...state, projects: [...state.projects] };
        newState.projects[projectIndex].label = action.label;
        return newState;
      }
  }
  
  return state;
};

export const StateContext = createContext({ state: initialState, dispatch: null});