import type { DataItem } from "./common";
import { actions } from "./reducer";

export type TaskStatus = "todo" | "done";

export interface Task extends DataItem {
  label: string;
  area?: string;
  project?: string;
  status: TaskStatus;
  scheduled?: Date;
  completedAt?: Date;
}

const makeHeaders = (payload: any) =>
  new Headers({
    "Content-Type": "application/json",
    "Content-Length": "" + JSON.stringify(payload).length,
  });

const patchTask = (taskId: number, payload: any) =>
  fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    headers: makeHeaders(payload),
  });

const updateTaskMetadata = (task: Task): Task => {
  return { ...task, updatedAt: new Date() };
};

const addTask =
  (dispatch) =>
  async ({
    project = "_inbox",
    status = "todo",
    ...rest
  }: Omit<Task, "id">) => {
    const task = { project, status, ...rest };
    // Dispatch state action
    const headers = makeHeaders(task);
    const response = await fetch(`http://localhost:3001/tasks`, {
      method: "POST",
      body: JSON.stringify(task),
      headers,
    });
    const newTask = {
      ...(await response.json()),
      createdAt: new Date(),
    };
    dispatch({ type: actions.ADD_TASK, task: newTask });
  };

const deleteTask = (dispatch) => (task: Task) => {
  dispatch({ type: actions.DELETE_TASK, task });
  fetch(`http://localhost:3001/tasks/${task.id}`, {
    method: "DELETE",
  });
};

const completeTask = (dispatch) => (task: Task, complete: boolean) => {
  const newTask = updateTaskMetadata({
    ...task,
    status: complete ? "done" : "todo",
    completedAt: new Date(),
  });
  dispatch({ type: actions.COMPLETE_TASK, task, complete });
  patchTask(task.id, newTask);
};

const renameTask = (dispatch) => (task: Task, label: string) => {
  const newTask = updateTaskMetadata({ ...task, label });
  dispatch({ type: actions.RENAME_TASK, task, label });
  patchTask(task.id, newTask);
};

const scheduleTask = (dispatch) => (task: Task, scheduled: Date) => {
  const newTask = updateTaskMetadata({ ...task, scheduled });
  dispatch({ type: actions.SCHEDULE_TASK, task, scheduled });
  patchTask(task.id, newTask);
};

const setTasks = (dispatch) => (tasks) =>
  dispatch({ type: actions.SET_TASKS, tasks });

export {
  addTask,
  setTasks,
  completeTask,
  renameTask,
  scheduleTask,
  deleteTask,
};
