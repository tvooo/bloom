import { FC, useCallback, useEffect, useState } from "react";
import { Calendar, Plus, Settings } from "iconoir-react";
import type { List } from "model/list";
import { TaskItem, ProjectItem } from "components/item/Item";
import Button from "components/Button";
import { Ul, Li } from "./List";
import ToggleCompletedLink from "./ToggleCompletedLink";
import ListViewHeader, { ListViewHeaderInput, ListViewMeta, ListViewTitle } from "./ListViewHeader";
import ListViewWrapper from "./ListViewWrapper";
import { Task } from "model/task";
import { useLists, useTasks } from "utils/api";
import { EditingItem } from "components/item/EditingItem";
import groupByDate from "./groupByDate";
import Menu from "components/menu/Menu";
import ProjectContextMenu from "components/menus/ProjectContextMenu";
import { format, formatRelative } from "date-fns";
import { ensureDate } from "utils/filters";

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
  const [addingTask, setAddingTask] = useState(false);

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
        <ListViewTitle>
          {list && list.type === "PROJECT" ? (
            <div onClick={() => {
              updateList({ ...list, status: list.status === 'COMPLETED' ? 'OPEN' : 'COMPLETED' });
            }}>{icon}</div>
          ) : icon}
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
        </ListViewTitle>
        {list && list.type === "PROJECT" && (
          <Menu trigger={<Settings />}>
            <ProjectContextMenu project={list} />
          </Menu>
        )}
      </ListViewHeader>
      {list && list.type === "PROJECT" && list.scheduled && (
        <ListViewMeta>
          <Calendar /> {format(ensureDate(list.scheduled), "EEE, d MMM yyyy")}
        </ListViewMeta>
      )}
      {sections.map(section => (
        <div key={section.label}>
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
            {addingTask && (
              <Li key="ADDING_TASK">
                <EditingItem
                  task={{ id: -1 /* FIXME: hack to satisy TS for now */, label: "New task", status: "TODO", scheduled: null, ...addTaskPreset }}
                  onConfirmEdit={(task, label) => {
                    addTask({ ...task, label });
                    setAddingTask(false);
                  }}
                  onCancelEdit={() => setAddingTask(false)}
                  onComplete={() => null}
                />
              </Li>
            )}
          </Ul>
        </div>
      ))}
      {!addingTask && (
        <Button
          onClick={() => setAddingTask(true)}
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
