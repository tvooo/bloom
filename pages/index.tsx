import React, { useState } from "react";

import View from "components/listview/ListView";
import getListViewProps from "components/listview/getListViewProps";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import ApplicationLayout from "components/layouts/ApplicationLayout";

const Page = () => {
  const [route, setRoute] = useState("_today");
  const { tasks } = useTasks();
  const {lists} = useLists();

  const areas = lists.filter(isArea);
  const projects = lists.filter(isProject);

  if (!tasks || !areas || !projects) {
    return "whoops";
  }

  const viewProps = getListViewProps(route, tasks, lists);

  return (
    <ApplicationLayout title={viewProps.title} route={setRoute} currentRoute={route} >
      <View
        {...viewProps}
      />
    </ApplicationLayout>
  );
};

export default Page;
