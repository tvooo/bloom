import React, { useState } from "react";

import View from "components/listview/ListView";
import getListViewProps from "components/listview/getListViewProps";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import ApplicationLayout from "components/layouts/ApplicationLayout";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  const { listId } = router.query;
  const { tasks } = useTasks();
  const { lists } = useLists();

  const areas = lists.filter(isArea);
  const projects = lists.filter(isProject);

  if (!tasks || !areas || !projects) {
    return "whoops";
  }

  const viewProps = getListViewProps(`${listId}`, tasks, lists);

  return (
    <ApplicationLayout title={viewProps.title}>
      <View
        {...viewProps}
      />
    </ApplicationLayout>
  );
};

export default Page;
