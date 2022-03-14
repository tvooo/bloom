import { styled } from '@linaria/react';
import { MenuWrapper } from 'components/menu/Menu';
import { endOfMonth, getDaysInMonth, startOfMonth } from 'date-fns';
import { eachDayOfInterval } from 'date-fns';
import { Circle, Hexagon, Laptop, LogOut, Settings, Svg3DSelectSolid } from 'iconoir-react';
import { useRouter } from 'next/router';
import React from 'react';
import { Menu, MenuItem, MenuSeparator, MenuStateReturn, MenuOptions } from 'reakit/Menu';
import { useLists } from 'utils/api';

const MenuItemButton = styled.button`
background: none;
border: none;
cursor: pointer;
width: 100%;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  border-radius: 0.2rem;
  padding: var(--space-sm);
  gap: var(--space-xs);

  &:hover {
    background: var(--color-neutral-lighter);
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--space-sm);
`

const CalendarDay = styled.div`
  border-radius: 3px;
  padding: 2px;
  text-align: center;
  &:hover {
    background: var(--color-neutral-light);
  }
`

const now = new Date();

const interval = {
  start: startOfMonth(now),
  end: endOfMonth(now)
};

const days = eachDayOfInterval(interval);

const Calendar: React.FC = () => {
    // const { push } = useRouter();
    // const { addList } = useLists();
    return (
      <CalendarGrid>
        {days.map(day => (
          <CalendarDay style={{ gridColumn: day.getDay()}}>{day.getDate()}</CalendarDay>
        ))}
      </CalendarGrid>
    );
    }

export default Calendar;