import { styled } from "@linaria/react";
import {
  FastArrowRight,
  LabelOutline,
  MoreVert,
  SunLight,
} from "iconoir-react";
import { useCallback, useState } from "react";
import StatusIndicator from "./StatusIndicator";
import Menu from "components/menu/Menu";
import TaskContextMenu from "components/menus/TaskContextMenu";
import { startOfToday, startOfTomorrow } from "date-fns";
import { isScheduledOn } from "utils/filters";
import { useList } from "utils/api";
import { Task } from "model/task";

const TaskContainer = styled.div<{ isEditing?: boolean }>`
  padding: 0.4rem;
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  background: ${(props) =>
    props.isEditing
      ? "var(--color-neutral-lighter)"
      : "var(--color-neutral-lightest)"};
  outline: ${(props) =>
    props.isEditing ? "3px solid var(--color-focus)" : "none"};
  transition: background 0.2s ease, outline 0.05s ease-out;

  &:hover {
    background: var(--color-neutral-lighter);
    transition: background 0.1s ease, outline 0.05s ease-out;
  }
`;

const TaskLabel = styled.div`
  margin-left: var(--space-sm);
  width: auto;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  cursor: text;
`;

const TaskLabelInput = styled.input`
  margin-left: var(--space-sm);
  flex: 1 0 auto;
  width: auto;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
`;

const ScheduledIndicator = ({ task }: { task: Task }) => {
  if (task.scheduled && isScheduledOn(startOfToday())(task)) {
    return <SunLight height="1.2em" style={{marginLeft: "var(--space-sm)"}} />;
  }
  if (task.scheduled && isScheduledOn(startOfTomorrow())(task)) {
    return <FastArrowRight height="1.2em" style={{marginLeft: "var(--space-sm)"}} />;
  }
  return null;
};

const TaskLocation = ({ task }: { task: Task }) => {
  const list = useList(task.list);
  if(!list) { return null; }
    return (
      <small
        style={{
          display: "block",
          color: "grey",
          marginLeft: "var(--space-sm)",
        }}
      >
        {list.label}
      </small>
    );
};

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
  const [label, setLabel] = useState(task.label);
  const [isEditing, setEditing] = useState(false);
  const handleChange = useCallback((e) => {
    setLabel(e.target.value);
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        // TODO: Reset
      }
      if (e.key === "Enter") {
        console.log(label);
        onEdit(task, label);
        setEditing(false);
      }
    },
    [label]
  );
  return (
    <TaskContainer isEditing={isEditing}>
      <StatusIndicator
        status={task.status}
        onClick={() => onComplete(task, task.status === "TODO")}
      />
      {showScheduled && <ScheduledIndicator task={task} />}
      {isEditing ? (
        <TaskLabelInput
          autoFocus
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={label}
          onBlur={() => {
            setEditing(false);
            setLabel(task.label);
          }}
        />
      ) : (
        <div
          style={{
            flex: "1 1 auto",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <TaskLabel onClick={() => setEditing(true)}>{label}</TaskLabel>
          {showLocation && <TaskLocation task={task} />}
        </div>
      )}
      <div style={{ flex: "0 0 auto" }}>
        <Menu trigger={<MoreVert />}>
          <TaskContextMenu task={task} />
        </Menu>
      </div>
    </TaskContainer>
  );
};

export const ProjectItem: React.FC = ({ children }) => (
  <TaskContainer>
    <LabelOutline height="1.6em" color="grey" />
    <TaskLabel>
      <strong>{children}</strong>
    </TaskLabel>
  </TaskContainer>
);
