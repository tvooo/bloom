import React, { useEffect, useReducer, useState } from "react";
import Head from "next/head";
import { styled } from "@linaria/react";
import useSWR, { useSWRConfig } from "swr";

import Layout from "components/Layout";
import View from "components/listview/ListView";
import Navigation from "components/navigation/Navigation";
import Toolbar from "components/toolbar/Toolbar";
import { setTasks } from "model/task";
import { setProjects } from "model/project";
import { reducer, StateContext } from "model/reducer";
import getListViewProps from "components/listview/getListViewProps";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Container = styled.div`
  display: flex;
  overflow-x: auto;
  flex: 1;
  align-items: stretch;
  padding: 0 var(--space-sm);
`;

const Column = styled.div`
  flex: 0 0 auto;
  padding: var(--space-sm);
`;

const Page = () => {
  const { mutate } = useSWRConfig();
  const [state, dispatch] = useReducer(reducer, {
    tasks: [],
    projects: [],
    areas: [],
  });
  const { tasks, projects } = state;

  // Fetch from server
  const { data: initialTasks, error } = useSWR(
    "http://localhost:3001/tasks",
    fetcher
  );
  const { data: areas } = useSWR("http://localhost:3001/areas", fetcher);
  const { data: initialProjects } = useSWR(
    "http://localhost:3001/projects",
    fetcher
  );

  const [route, setRoute] = useState("inbox");

  useEffect(() => {
    if (initialTasks) {
      setTasks(dispatch)(initialTasks);
    }
  }, [initialTasks]);
  useEffect(() => {
    if (initialProjects) {
      setProjects(dispatch)(initialProjects);
    }
  }, [initialProjects]);

  if (!tasks || !areas || !projects) {
    return "whoops";
  }

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <Layout>
        <Head>
          <title>{route} &mdash; bloom</title>
        </Head>
        <Toolbar />
        <Container>
          <Column>
            <Navigation
              route={(r) => setRoute(r)}
              currentRoute={route}
            />
          </Column>
          <Column style={{ flex: '1 1 auto', minWidth: 0 }}>
            <View
              {...getListViewProps(route, tasks, dispatch, mutate, projects)}
            />
          </Column>
        </Container>
      </Layout>
    </StateContext.Provider>
  );
};

export default Page;
