import React, { useContext } from "react";
import { styled } from "@linaria/react";
import useSWR from "swr";
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
import { addProject } from "model/project";
import { StateContext } from "model/reducer";
import { ProgressPie } from "components/Pie";
import { inProject } from "utils/filters";

const fetcher = (url) => fetch(url).then((res) => res.json());

const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const getProgress = (tasks): number =>
  tasks.length > 0
    ? (100 * tasks.filter((t) => t.status === "done").length) / tasks.length
    : 0;

const Navigation = ({ route, currentRoute }) => {
  const { data: areas } = useSWR("http://localhost:3001/areas", fetcher);
  const {
    state: { projects, tasks },
    dispatch,
  } = useContext(StateContext);

  return (
    <NavigationWrapper>
      <NavItem
        onClick={() => route("inbox")}
        icon={<MailOpened height="1.2em" />}
        isActive={currentRoute === `inbox`}
      >
        Inbox
      </NavItem>
      <NavItem
        onClick={() => route("today")}
        icon={<SunLight height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `today`}
      >
        Today
      </NavItem>
      <NavItem
        onClick={() => route("upcoming")}
        icon={<Calendar height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `upcoming`}
      >
        Upcoming
      </NavItem>
      <Separator />
      <NavItem
        onClick={() => route("archive")}
        icon={<Box height="1.2em" color="var(--color-today)" />}
        isActive={currentRoute === `archive`}
      >
        Archive
      </NavItem>
      <Separator />
      {projects.map((project) => (
        <NavItem
          key={project.id}
          onClick={() => route(`project:${project.label}`)}
          icon={
            <ProgressPie
              progress={getProgress(tasks.filter(inProject(project.label)))}
            />
          }
          isActive={currentRoute === `project:${project.label}`}
        >
          {project.label}
        </NavItem>
      ))}
      <Separator />
      {areas.map((area) => (
        <NavItem
          key={area}
          onClick={() => route(`area:${area}`)}
          icon={<BoxIso height="1.2em" color="var(--color-area)" />}
          isActive={currentRoute === `area:${area}`}
        >
          {area}
        </NavItem>
      ))}
      <div style={{ marginTop: "auto", display: "flex" }}>
        <Button style={{ flex: "1 0 auto", margin: "0 var(--space-xs)" }}>
          <Plus /> Area
        </Button>
        <Button
          onClick={() => addProject(dispatch)({ label: "New project" })}
          style={{ flex: "1 0 auto", margin: "0 var(--space-xs)" }}
        >
          <Plus /> Project
        </Button>
      </div>
    </NavigationWrapper>
  );
};

export default Navigation;
