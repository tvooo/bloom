import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Plus } from "iconoir-react";

import { Project, renameProject } from "model/project";
import { TaskItem, ProjectItem } from "components/item/Item";
import Button from "components/Button";
import { Ul, Li } from "./List";
import ToggleCompletedLink from "./ToggleCompletedLink";
import ListViewHeader, { ListViewHeaderInput } from "./ListViewHeader";
import ListViewWrapper from "./ListViewWrapper";
import { StateContext } from "model/reducer";
import { Task } from "model/task";

export interface ListViewProps {
  items: any[];
  icon: any;
  title: string;
  onDelete: (task: Task) => void;
  onComplete: (task: Task, completed: boolean) => void;
  onEdit: (task: Task, label: string) => void;
  onSchedule: (task: Task, scheduled: Date | null) => void;
  showLocation?: boolean;
  showScheduled?: boolean;
  addTask?: (task: Omit<Task, 'id'>) => void;
  isRenamable?: boolean;
  dispatch: Function;
  list?: Project;
}

const ListView: FC<ListViewProps> = ({
  items,
  icon,
  title,
  addTask,
  onComplete,
  onEdit,
  onSchedule,
  showLocation,
  showScheduled,
  onDelete,
  isRenamable,
  // dispatch,
  list,
}) => {
  const open = items.filter((i) => i.status !== "done");
  const completed = items.filter((i) => i.status === "done");
  const [showCompleted, toggleCompleted] = useState(false);
  const { dispatch } = useContext(StateContext);
  const handlers = { onComplete, onEdit, onSchedule, onDelete, dispatch };

  const [label, setLabel] = useState(title);
  const [isEditing, setEditing] = useState(false);
  useEffect(() => {
    setLabel(title);
  }, [title]);
  const handleChange = useCallback((e) => {
    setLabel(e.target.value);
  }, []);
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        // Reset
        // setValue(amount);
        // onCancel();
        // TODO: blur
      }
      if (e.key === "Enter") {
        renameProject(dispatch)(list, label);
        setEditing(false);
      }
    },
    [label]
  );
  const handleBlur = useCallback(() => {
    setEditing(false);
    setLabel(title);
  }, [title]);

  return (
    <ListViewWrapper>
      <ListViewHeader>
        {icon}{" "}
        {isEditing && isRenamable ? (
          <ListViewHeaderInput
            autoFocus
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={label}
            onBlur={handleBlur}
          />
        ) : (
          <div onClick={() => isRenamable && setEditing(true)}>{title}</div>
        )}
      </ListViewHeader>
      <Ul>
        {open.map((item, index) => (
          <Li key={item.id}>
            {item.type === "project" ? (
              <ProjectItem>{item.label}</ProjectItem>
            ) : (
              <TaskItem
                task={item}
                {...handlers}
                showLocation={showLocation}
                showScheduled={showScheduled}
              />
            )}
          </Li>
        ))}
      </Ul>
      {addTask && (
        <Button
          onClick={() => addTask({ project: "_inbox", label: "New task", status: "todo" })}
        >
          <Plus /> Add task
        </Button>
      )}
      {completed.length > 0 && (
        <ToggleCompletedLink onClick={() => toggleCompleted((show) => !show)}>
          {showCompleted ? "Hide" : "Show"} {completed.length} completed tasks
        </ToggleCompletedLink>
      )}
      {completed.length > 0 && showCompleted && (
        <Ul>
          {completed.map((item, index) => (
            <Li key={item.id}>
              {item.type === "project" ? (
                <ProjectItem>{item.label}</ProjectItem>
              ) : (
                <TaskItem
                  task={item}
                  {...handlers}
                  showLocation={showLocation}
                  showScheduled={showScheduled}
                />
              )}
            </Li>
          ))}
        </Ul>
      )}
    </ListViewWrapper>
  );
};

export default ListView;
