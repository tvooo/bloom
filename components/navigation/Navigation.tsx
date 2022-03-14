import React, { useState } from "react";
import { styled } from "@linaria/react";
import {
  SunLight,
  MailOpened,
  Plus,
  Calendar,
  Box,
  Svg3DSelectSolid,
} from "iconoir-react";

import NavItem from "./NavItem";
import Separator from "./Separator";
import Button from "components/Button";
import { ProgressPie } from "components/Pie";
import { inProject, isArea, isCompleted, isProject, isScheduled, isScheduledBefore, not } from "utils/filters";
import { useLists, useTasks } from "utils/api";
import type { Task } from "model/task";
import { Area, Project } from "model/list";
import { useRouter } from "next/router";
import { startOfTomorrow } from "date-fns";
import ToggleCompletedLink from "components/listview/ToggleCompletedLink";
import { MenuButton, useMenuState } from "reakit/Menu";
import UserMenu from "components/menus/UserMenu";
import AddListMenu from "components/menus/AddListMenu";
import { SHOW_INBOX_BADGE, SHOW_TODAY_BADGE } from "utils/meta";

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  flex: 1 1 auto;
  overflow-y: scroll;
  padding: var(--space-md);
`;

const Badge = styled.small`
  background: var(--color-neutral-medium-light);
  color: var(--color-neutral-medium);
  font-weight: 600;
  font-size: 12px;
  border-radius: 30px;
  padding: 0px 10px;
  margin-left: auto;
`

const getProgress = (tasks: Task[]): number =>
  tasks.length > 0
    ? (100 * tasks.filter((t) => t.status === "DONE").length) / tasks.length
    : 0;

const Navigation: React.FC = () => {
  const [showScheduledProjects, toggleScheduledProjects] = useState(false);
  const router = useRouter();
  const { lists, addList } = useLists();
  const { tasks }: { tasks: Task[] } = useTasks();
  const areas: Area[] = lists.filter(isArea);
  const projects: Project[] = lists.filter(isProject);
  const activeProjects = projects.filter(project => project.status === "OPEN").filter(project => {
    if (!project.scheduled) {
      return true;
    }
    return isScheduledBefore(startOfTomorrow())(project);
  })
  const scheduledProjects = projects.filter(project => project.status === "OPEN").filter(project => {
    if (!project.scheduled) {
      return false;
    }
    return !isScheduledBefore(startOfTomorrow())(project);
  })
  const getNavItemProps = (route: string) => ({
    onClick: () => router.push(route),
    isActive: router.asPath === route,
  });
  const menu = useMenuState({ placement: 'top-end' });
  const inboxItems = tasks.filter(t => !t.list).filter(not(isScheduled)).filter(not(isCompleted)).length;
  const todayItems = tasks.filter(isScheduledBefore(startOfTomorrow())).filter(not(isCompleted)).length;

  return (
    <NavigationWrapper>
      <NavItem
        icon={<MailOpened height="1.2em" />}
        {...getNavItemProps('/list/_inbox')}
        badge={SHOW_INBOX_BADGE && inboxItems > 0 && <Badge>{inboxItems}</Badge>}
      >
        Inbox
      </NavItem>
      <NavItem
        icon={<SunLight height="1.2em" color="var(--color-today)" />}
        {...getNavItemProps('/list/_today')}
        badge={SHOW_TODAY_BADGE && todayItems > 0 && <Badge>{todayItems}</Badge>}
      >
        Today
      </NavItem>
      <NavItem
        icon={<Calendar height="1.2em" color="var(--color-today)" />}
        {...getNavItemProps('/list/_upcoming')}
      >
        Upcoming
      </NavItem>
      <Separator />
      <NavItem
        icon={<Box height="1.2em" color="var(--color-today)" />}
        {...getNavItemProps('/list/_archive')}
      >
        Archive
      </NavItem>
      <Separator />
      {activeProjects.map((project) => (
        <NavItem
          key={project.id}
          icon={
            <ProgressPie
              progress={getProgress(tasks.filter(inProject(project)))}
            />
          }
          {...getNavItemProps(`/list/${project.id}`)}
        >
          {project.label}
        </NavItem>
      ))}
      {showScheduledProjects && scheduledProjects.map((project) => (
        <NavItem
          key={project.id}
          icon={
            <ProgressPie
              progress={getProgress(tasks.filter(inProject(project)))}
            />
          }
          {...getNavItemProps(`/list/${project.id}`)}
        >
          {project.label}
        </NavItem>
      ))}
      {scheduledProjects.length > 0 && (
        <div><ToggleCompletedLink onClick={() => toggleScheduledProjects((show) => !show)}>
          {showScheduledProjects ? "Hide" : "Show"} {scheduledProjects.length} deferred projects
        </ToggleCompletedLink></div>
      )}
      <Separator />
      {areas.map((area) => (
        <NavItem
          key={area.id}
          icon={<Svg3DSelectSolid height="1.2em" color="var(--color-area)" />}
          {...getNavItemProps(`/list/${area.id}`)}
        >
          {area.label}
        </NavItem>
      ))}
      <div style={{ marginTop: "auto", display: "flex" }}>
        <MenuButton {...menu} as={Button} style={{ marginLeft: 'auto' }}><Plus /> Add</MenuButton>
        <AddListMenu menu={menu} />
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;
