import React, { useState } from "react";

import View from "components/listview/ListView";
import getListViewProps from "components/listview/getListViewProps";
import { useLists, useTasks } from "utils/api";
import { isArea, isProject } from "utils/filters";
import ApplicationLayout from "components/layouts/ApplicationLayout";

const getBookmarklet = () => {
  const baseUrl = typeof window === 'undefined' ? '' : window.location.origin;

  return `javascript:(function(){
    _my_script=document.createElement('SCRIPT');
    _my_script.type='text/javascript';
    _my_script.src='${baseUrl}/bookmarklet.js';
    _my_script.data('id', 'teaque-bookmarket');
    document.getElementsByTagName('head')[0].appendChild(_my_script);
  })()`;
}

const Page = () => {
  const [route, setRoute] = useState("_inbox");
  const { tasks } = useTasks();
  const {lists} = useLists();

  const areas = lists.filter(isArea);
  const projects = lists.filter(isProject);

  if (!tasks || !areas || !projects) {
    return "whoops";
  }

  // const viewProps = getListViewProps(route, tasks, lists);

  return (
    <ApplicationLayout title={'Settings'}>
      <h2>Bookmarklet</h2>
      Drag the bookmarklet to your bookmarks toolbar:

      <a href={getBookmarklet()}>Add to Teaque</a>
      <h2>Navigation</h2>
      <fieldset>

      <input type="checkbox" /> Show "Upcoming"
      </fieldset>
      <fieldset>

      <input type="checkbox" /> Show "Archive"
      </fieldset>
      <h2>Scheduling options</h2>
      <fieldset>

      <input type="checkbox" /> Enable "Weekend" as <select value="Saturday"><option value="Saturday">Saturday</option></select>
      </fieldset>
      <fieldset>

      <input type="checkbox" /> Enable "Next week" as <select value="Monday"></select>
      </fieldset>
    </ApplicationLayout>
  );
};

export default Page;
