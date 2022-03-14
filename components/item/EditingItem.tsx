import { useCallback, useState } from "react";
import StatusIndicator from "./StatusIndicator";
import { Task } from "model/task";

import { ScheduledIndicator, TaskContainer, TaskContextMenuTrigger, TaskLabelInput } from './common';
import TaskContextMenu from "components/menus/TaskContextMenu";
import { MoreVert } from "iconoir-react";
import { MenuButton, useMenuState } from "reakit/Menu";
import Button from "components/Button";

type TaskWithoutId = Task;

interface EditingItemProps {
  task: TaskWithoutId;
  showLocation?: boolean;
  showScheduled?: boolean;
  onComplete: (task: TaskWithoutId, complete: boolean) => void;
  onConfirmEdit: (task: TaskWithoutId, label: string) => void;
  onCancelEdit: (task: TaskWithoutId) => void;
}
export const EditingItem: React.FC<EditingItemProps> = ({
  task,
  showLocation,
  showScheduled,
  onComplete,
  onConfirmEdit,
  onCancelEdit,
}) => {
  const menu = useMenuState();
  const [label, setLabel] = useState(task.label);
  const inputRef = useCallback((node: HTMLInputElement) => { if (node !== null) { node.setSelectionRange(0, node.value.length); } }, []);

  const handleChange = useCallback((e) => {
    setLabel(e.target.value);
  }, []);
  const handleBlur = useCallback(() => {
    onCancelEdit(task);
  }, [task])
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        return onCancelEdit(task);
      }
      if (e.key === "Enter") {
        return onConfirmEdit(task, label);
      }
    },
    [label]
  );

  return (
    <TaskContainer isEditing>
      <StatusIndicator
        status={task.status}
        onClick={() => onComplete(task, task.status === "TODO")}
      />
      {showScheduled && <ScheduledIndicator task={{ ...task, id: -1 }} />}
      <TaskLabelInput
        ref={inputRef}
        autoFocus
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={label}
        onBlur={handleBlur}
      />

      <TaskContextMenuTrigger>
        <MenuButton {...menu} as={Button} ><MoreVert /></MenuButton>
        <TaskContextMenu menu={menu} task={task} />
      </TaskContextMenuTrigger>
    </TaskContainer>
  );
};