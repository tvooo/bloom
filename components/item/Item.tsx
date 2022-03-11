import {
  LabelOutline,
  MoreVert,
} from "iconoir-react";
import { useState } from "react";
import StatusIndicator from "./StatusIndicator";
import Menu from "components/menu/Menu";
import TaskContextMenu from "components/menus/TaskContextMenu";
import { Task } from "model/task";
import { ScheduledIndicator, TaskContainer, TaskContextMenuTrigger, TaskLabel, TaskLocation } from './common'
import { EditingItem } from "./EditingItem";

interface TaskItemProps {
  task: Task;
  showLocation?: boolean;
  showScheduled?: boolean;
  onComplete: (task: Task, complete: boolean) => void;
  onEdit: (task: Task, label: string) => void;
}
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  showLocation,
  showScheduled,
  onComplete,
  onEdit,
}) => {
  const [isEditing, setEditing] = useState(false);
  return (isEditing ? (<EditingItem task={task} onConfirmEdit={(task, label) => {
    onEdit(task, label);
    setEditing(false);
  }} onCancelEdit={() => {
    setEditing(false);
  }} onComplete={onComplete} />) : (
    <TaskContainer isEditing={false}>
      <StatusIndicator
        status={task.status}
        onClick={() => onComplete(task, task.status === "TODO")}
      />
      {showScheduled && <ScheduledIndicator task={task} />}

      <div
        style={{
          flex: "1 1 auto",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <TaskLabel onClick={() => setEditing(true)}>{task.label}</TaskLabel>
        {showLocation && <TaskLocation task={task} />}
      </div>

      <TaskContextMenuTrigger>
        <Menu trigger={<MoreVert />}>
          <TaskContextMenu task={task} />
        </Menu>
      </TaskContextMenuTrigger>
    </TaskContainer>
  ));
};

export const ProjectItem: React.FC = ({ children }) => (
  <TaskContainer>
    <LabelOutline height="1.6em" color="grey" />
    <TaskLabel>
      <strong>{children}</strong>
    </TaskLabel>
  </TaskContainer>
);
