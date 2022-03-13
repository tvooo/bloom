import { styled } from "@linaria/react";
import React, { useState } from "react";

import View from "components/listview/ListView";
import getListViewProps from "components/listview/getListViewProps";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import ApplicationLayout from "components/layouts/ApplicationLayout";
import { eachMonthOfInterval, eachQuarterOfInterval, eachWeekOfInterval, endOfYear, format, isThisMonth, isThisQuarter, isThisWeek, isThisYear, startOfYear } from "date-fns";
import ListViewWrapper from "components/listview/ListViewWrapper";

const PeriodWrapper = styled.div<{ isCurrent: boolean }>`
  flex: 1 1 0;
  margin: 0 0.5em;
  padding: var(--space-sm) var(--space-md);

  border-radius: 4px;
  border-width: 2px;
  background: var(--color-neutral-light);
  border-style: solid;
  border-color: ${props => props.isCurrent ? 'var(--color-project)' : 'transparent'};
  // color: white;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ThemeDot = styled.div<{ color: string }>`
  border-radius: 1em;
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  background: ${props => props.color};
  margin-right: 0.4em;
`;

interface ThemeProps {
  color: string; name: string;
}
const Theme: React.FC<ThemeProps> = ({ color, name }) => (
  <div style={{display: 'flex', alignItems: 'center'}}>
    <ThemeDot color={color} /> {name}
  </div>
)

interface PeriodProps {
  name: string;
  themes?: Array<ThemeProps>;
  isCurrent: boolean;
  date: Date;
}
const Period: React.FC<PeriodProps> = ({ name, isCurrent, themes }) => (
  <PeriodWrapper isCurrent={isCurrent}>
    <strong>{name}</strong>
    {themes && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em'}}>
        {themes.map(theme => (
          <Theme key={theme.name} name={theme.name} color={theme.color} />
        ))}
      </div>
    )}
  </PeriodWrapper>
)

const Year: React.FC<Omit<PeriodProps, 'isCurrent'>> = (props) => {
  return <Period {...props} isCurrent={isThisYear(props.date)} />
}

const Quarter: React.FC<Omit<PeriodProps, 'isCurrent'>> = (props) => {
  return <Period {...props} isCurrent={isThisQuarter(props.date)} />
}

const Month: React.FC<Omit<PeriodProps, 'isCurrent'>> = (props) => {
  return <Period {...props} isCurrent={isThisMonth(props.date)} />
}

const Week: React.FC<Omit<PeriodProps, 'isCurrent'>> = (props) => {
  return <Period {...props} isCurrent={isThisWeek(props.date, { weekStartsOn: 0 })} />
}

const Quarters = styled.div`
  display: flex;
`

const Page = () => {
  const [route, setRoute] = useState("_inbox");
  const { tasks } = useTasks();
  const { lists } = useLists();

  const areas = lists.filter(isArea);
  const projects = lists.filter(isProject);

  if (!tasks || !areas || !projects) {
    return "whoops";
  }

  const now = new Date();
  const yearInterval = {
    start: startOfYear(now),
    end: endOfYear(now)
  };

  return (
    <ApplicationLayout title={'Horizons'}>
      <ListViewWrapper>
      <h2>Year</h2>
      <Year date={yearInterval.start} name={format(yearInterval.start, "yyyy")} />
      <h2>Quarter</h2>
      <Quarters>
        {eachQuarterOfInterval(yearInterval).map((quarter: Date) => (
          <Quarter key={format(quarter, "QQQ")} date={quarter} name={format(quarter, "QQQ")} themes={[{ color: 'var(--color-project', name: 'Running'}]} />
        ))}
      </Quarters>
      <h2>Month</h2>
      <Quarters>
      {eachMonthOfInterval(yearInterval).map((quarter: Date) => (
          <Month key={format(quarter, "MMM")} date={quarter} name={format(quarter, "MMM")} />
        ))}
      </Quarters>
    <h2>Week</h2>
    <Quarters style={{flexWrap: 'wrap'}}>
    {eachWeekOfInterval(yearInterval).map((quarter: Date) => (
          <Month key={format(quarter, "MMM")} date={quarter} name={format(quarter, "w")} />
        ))}
    </Quarters>
    </ListViewWrapper>
    </ApplicationLayout>
  );
};

export default Page;
