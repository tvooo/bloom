import { styled } from "@linaria/react";
import { startOfToday, startOfTomorrow } from "date-fns";
import {
  FastArrowRight,
  SunLight,
} from "iconoir-react";
import type { Task } from "model/task";
import { useList } from "utils/api";
import { isScheduledOn } from "utils/filters";

export const ScheduledIndicator = ({ task }: { task: Task }) => {
    if (task.scheduled && isScheduledOn(startOfToday())(task)) {
      return <SunLight height="1.2em" style={{marginLeft: "var(--space-sm)"}} />;
    }
    if (task.scheduled && isScheduledOn(startOfTomorrow())(task)) {
      return <FastArrowRight height="1.2em" style={{marginLeft: "var(--space-sm)"}} />;
    }
    return null;
  };
  
export const TaskLocation = ({ task }: { task: Task }) => {
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

  export const TaskContainer = styled.div<{ isEditing?: boolean }>`
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

export const TaskLabel = styled.div`
  margin-left: var(--space-sm);
  width: auto;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  cursor: text;
`;

export const TaskLabelInput = styled.input`
  margin-left: var(--space-sm);
  flex: 1 0 auto;
  width: auto;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
`;

