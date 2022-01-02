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

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const getProgress = (tasks: Task[]): number =>
  tasks.length > 0
    ? (100 * tasks.filter((t) => t.status === "DONE").length) / tasks.length
    : 0;

interface NavigationProps {
  route: (n: string) => void;
  currentRoute: string
}
const Navigation: React.FC<NavigationProps> = ({ route, currentRoute }) => {
  const { lists, addList } = useLists();
  const { tasks } = useTasks();
  const areas: Area[] = lists.filter(isArea);
  const projects: Project[] = lists.filter(isProject);

  const dispatch = () => null;

  return (
    <NavigationWrapper>
      <NavItem
        onClick={() => route("_inbox")}
        icon={<MailOpened height="1.2em" />}
        isActive={currentRoute === `_inbox`}
      >
        Inbox
      </NavItem>
      <NavItem
        onClick={() => route("_today")}
        icon={<SunLight height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `_today`}
      >
        Today
      </NavItem>
      <NavItem
        onClick={() => route("_upcoming")}
        icon={<Calendar height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `_upcoming`}
      >
        Upcoming
      </NavItem>
      <Separator />
      <NavItem
        onClick={() => route("_archive")}
        icon={<Box height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `_archive`}
      >
        Archive
      </NavItem>
      <Separator />
      {projects.map((project) => (
        <NavItem
          key={project.id}
          onClick={() => route(`${project.id}`)}
          icon={
            <ProgressPie
              progress={getProgress(tasks.filter(inProject(project)))}
            />
          }
          isActive={currentRoute === `${project.id}`}
        >
          {project.label}
        </NavItem>
      ))}
      <Separator />
      {areas.map((area) => (
        <NavItem
          key={area.id}
          onClick={() => route(`${area.id}`)}
          icon={<BoxIso height="1.2em" color="var(--color-area)" />}
          isActive={currentRoute === `${area.id}`}
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
