import { FC, useCallback, useEffect, useState } from "react";
import { Plus } from "iconoir-react";
import { format, isBefore, isSameDay, isSameWeek, isTomorrow, nextMonday, nextSaturday, nextSunday, startOfDay } from "date-fns";

import type { List } from "model/list";
import { TaskItem, ProjectItem } from "components/item/Item";
import Button from "components/Button";
import { Ul, Li } from "./List";
import ToggleCompletedLink from "./ToggleCompletedLink";
import ListViewHeader, { ListViewHeaderInput } from "./ListViewHeader";
import ListViewWrapper from "./ListViewWrapper";
import { Task } from "model/task";
import { useLists, useTasks } from "utils/api";
import { ensureDate } from "utils/filters";

const groupByDate = (items: Task[]): Array<{ label: string; items: Task[] }> => {
  const result: Record<string, Task[]> = {};
  items.forEach(item => {
    let label: null | string = "Later";
    if(item.scheduled) {
      if(isSameWeek(nextMonday(new Date()), ensureDate(item.scheduled))) {
        label = "Next week";
      }
      if(isSameDay(nextSaturday(new Date()), ensureDate(item.scheduled))) {
        label = "Weekend";
      }
      if(isSameDay(nextSunday(new Date()), ensureDate(item.scheduled))) {
        label = "Weekend";
      }
      if(isBefore(ensureDate(item.scheduled), nextSaturday(new Date()))) {
        label = format(startOfDay(ensureDate(item.scheduled)),  "EEE, d MMM yyyy");
      }
      if(isTomorrow(ensureDate(item.scheduled))) {
        label = "Tomorrow";
      }
    } else {
      label = '';
    }
    result[label] = result[label] ? [...result[label], item] : [item];
  });
  return Object.keys(result).map(dt => ({ label: dt, items: result[dt]}));
}

export interface ListViewProps {
  items: any[];
  icon: any;
  title: string;
  showLocation?: boolean;
  showScheduled?: boolean;
  isRenamable?: boolean;
  list?: List;
  splitCompletedTasks?: boolean;
  splitByDate?: boolean;
  addTaskPreset?: Partial<Task>,
}

const ListView: FC<ListViewProps> = ({
  items,
  icon,
  title,
  showLocation,
  showScheduled,
  isRenamable,
  splitCompletedTasks,
  list,
  addTaskPreset,
  splitByDate,
}) => {
  const open = items.filter((i) => i.status !== "DONE");
  const completed = items.filter((i) => i.status === "DONE");
  const [showCompleted, toggleCompleted] = useState(false);

  const { addTask, updateTask } = useTasks();
  const { updateList } = useLists();

  const onEdit = (task: Task, label: string) => updateTask({ ...task, label });
  const onComplete = (task: Task, completed: boolean) => updateTask({ ...task, status: completed ? 'DONE' : 'TODO', completedAt: completed ? new Date() : undefined });

  const handlers = { onComplete, onEdit };
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
        // renameProject(dispatch)(list, label);
        updateList({ ...list, label });
        setEditing(false);
      }
    },
    [label]
  );
  const handleBlur = useCallback(() => {
    setEditing(false);
    setLabel(title);
  }, [title]);
  const sections = splitByDate ? groupByDate(items) : [{

    label: null,
    items: splitCompletedTasks ? open : items
  }
  ];

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
      {sections.map(section => (
        <div>
          {section.label && <h3>{section.label}</h3>}
          <Ul>
          {section.items.map((item, index) => (
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
        </div>
      ))}
      {/* {splitCompletedTasks ? (
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
      ) : (
        <Ul>
          {items.map((item, index) => (
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
      )} */}
      {addTask && (
        <Button
          onClick={() => addTask({ label: "New task", status: "TODO", scheduled: null, ...addTaskPreset })}
        >
          <Plus /> Add task
        </Button>
      )}
      {splitCompletedTasks && completed.length > 0 && (
        <ToggleCompletedLink onClick={() => toggleCompleted((show) => !show)}>
          {showCompleted ? "Hide" : "Show"} {completed.length} completed tasks
        </ToggleCompletedLink>
      )}
      {splitCompletedTasks && completed.length > 0 && showCompleted && (
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
