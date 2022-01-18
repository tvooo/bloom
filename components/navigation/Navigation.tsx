import React from "react";
import { styled } from "@linaria/react";
import {
  SunLight,
  BoxIso,
  MailOpened,
  Plus,
  Calendar,
  Box,
} from "iconoir-react";

import NavItem from "./NavItem";
import Separator from "./Separator";
import Button from "components/Button";
import { ProgressPie } from "components/Pie";
import { inProject, isArea, isProject } from "utils/filters";
import { useLists, useTasks } from "utils/api";
import type { Task } from "model/task";
import { Area, Project } from "model/list";
import { useRouter } from "next/router";

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const getProgress = (tasks: Task[]): number =>
  tasks.length > 0
    ? (100 * tasks.filter((t) => t.status === "DONE").length) / tasks.length
    : 0;

const Navigation: React.FC = () => {
  const router = useRouter();
  const { lists, addList } = useLists();
  const { tasks } = useTasks();
  const areas: Area[] = lists.filter(isArea);
  const projects: Project[] = lists.filter(isProject);
  const getNavItemProps = (route: string) => ({
    onClick: () => router.push(route),
    isActive: router.asPath === route,
  });

  return (
    <NavigationWrapper>
      <NavItem
        icon={<MailOpened height="1.2em" />}
        {...getNavItemProps('/list/_inbox')}
      >
        Inbox
      </NavItem>
      <NavItem
        icon={<SunLight height="1.2em" color="var(--color-today)" />}
        {...getNavItemProps('/list/_today')}
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
      {projects.filter(project => project.status === "OPEN").map((project) => (
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
      <Separator />
      {areas.map((area) => (
        <NavItem
          key={area.id}
          icon={<BoxIso height="1.2em" color="var(--color-area)" />}
          {...getNavItemProps(`/list/${area.id}`)}
        >
          {area.label}
        </NavItem>
      ))}
      <div style={{ marginTop: "auto", display: "flex" }}>
        <Button
          onClick={() => addList({ label: "New area", type: "AREA" })}
          style={{ flex: "1 0 auto", margin: "0 var(--space-xs)" }}
        >
          <Plus /> Area
        </Button>
        <Button
          onClick={() => addList({ label: "New project", type: "PROJECT" })}
          style={{ flex: "1 0 auto", margin: "0 var(--space-xs)" }}
        >
          <Plus /> Project
        </Button>
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;
