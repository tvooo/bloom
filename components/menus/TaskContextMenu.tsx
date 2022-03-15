import { NavArrowRight, FastArrowRight, SunLight, Tv, Cancel, NavArrowLeft } from "iconoir-react";
import { add, eachDayOfInterval, endOfMonth, format, isToday, nextMonday, nextSaturday, startOfMonth, startOfToday, startOfTomorrow } from "date-fns";

import MenuSeparator from "components/menu/MenuSeparator";
import MenuHeading from "components/menu/MenuHeading";
import type { Task } from "model/task";
import { useTasks } from "utils/api";
import MoveToListMenu from "./MoveToListMenu";
import { Menu, MenuItem, MenuStateReturn } from 'reakit/Menu';
import { MenuWrapper } from "components/menu/Menu";
import React, { useState } from "react";
import MenuItemButton from "./MenuItemButton";
import { styled } from "@linaria/react";
import Button from "components/Button";


const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-xs);
`

const CalendarDay = styled(Button)`
  border-radius: 3px;
  border: none;
  padding: 2px;
  text-align: center;
  &:hover {
    background: var(--color-neutral-light);
  }
`;

const Weekday = styled.div`
  font-size: var(--font-size-sm);
  color: var(--color-neutral-medium);
  font-weight: bold;
  text-align: center;
`

const Calendar: React.FC<{ onChange: (day: Date) => void }> = ({ onChange }) => {
    const [currentMonth, setMonth] = useState<Date>(startOfMonth(new Date()));

    const interval = {
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth)
    };
    
    const days = eachDayOfInterval(interval);

    return (
      <CalendarGrid>
        <CalendarDay onClick={() => setMonth(add(currentMonth, { months: -1 }))}><NavArrowLeft /></CalendarDay>
        <div style={{ gridColumnStart: 2, gridColumnEnd: 7, textAlign: 'center', alignSelf: 'center'}}>{format(currentMonth, 'MMM yyyy')}</div>
        <CalendarDay onClick={() => setMonth(add(currentMonth, { months: 1 }))}><NavArrowRight /></CalendarDay>
        <Weekday>M</Weekday>
        <Weekday>T</Weekday>
        <Weekday>W</Weekday>
        <Weekday>T</Weekday>
        <Weekday>F</Weekday>
        <Weekday>S</Weekday>
        <Weekday>S</Weekday>
        {days.map(day => (
          <CalendarDay key={day.toString()} onClick={() => onChange(day)} style={{ gridColumn: day.getDay(), fontWeight: isToday(day) ? 'bold' : 'regular'}}>{day.getDate()}</CalendarDay>
        ))}
      </CalendarGrid>
    );
    }

const TaskContextMenu = ({ task, menu }: { task: Task, menu: MenuStateReturn }) => {
  const { updateTask } = useTasks();
  const scheduleTask = (task: Task, scheduled: Date | null) => updateTask({ ...task, scheduled });

  return (
    <Menu {...menu} aria-label="Task actions" as={MenuWrapper}>
      <MenuHeading>Schedule</MenuHeading>
      <div style={{ display: 'flex', minWidth: 0, flexWrap: 'wrap' }}>
        <MenuItem
          {...menu}
          as={MenuItemButton}
          onClick={() => scheduleTask(task, startOfToday())}
          style={{ flex: '1 1 auto', width: 'auto' }}
        ><SunLight /></MenuItem>
        <MenuItem
          {...menu}
          as={MenuItemButton}
          onClick={() => scheduleTask(task, startOfTomorrow())}
          style={{ flex: '1 1 auto', width: 'auto' }}
        ><NavArrowRight /></MenuItem>
        <MenuItem
          {...menu}
          as={MenuItemButton}
          onClick={() => scheduleTask(task, nextSaturday(new Date()))}
          style={{ flex: '1 1 auto', width: 'auto' }}
        ><Tv /></MenuItem>
        <MenuItem
          {...menu}
          as={MenuItemButton}
          onClick={() => scheduleTask(task, nextMonday(new Date()))}
          style={{ flex: '1 1 auto', width: 'auto' }}
        ><FastArrowRight /></MenuItem>
        <MenuItem
          {...menu}
          as={MenuItemButton}
          onClick={() => scheduleTask(task, null)}
          style={{ flex: '1 1 auto', width: 'auto' }}
        ><Cancel /></MenuItem>
      </div>
      <Calendar onChange={(date) => scheduleTask(task, date)}/>
      <MenuSeparator />
      <MenuItem {...menu} as={MoveToListMenu} task={task} />
    </Menu>
  );
};

export default TaskContextMenu;