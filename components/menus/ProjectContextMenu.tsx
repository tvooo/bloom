import { NavArrowRight, FastArrowRight, SunLight, Tv, Cancel } from "iconoir-react";
import { nextMonday, nextSaturday, startOfToday, startOfTomorrow } from "date-fns";

import MenuItem from "components/menu/MenuItem";
import MenuHeading from "components/menu/MenuHeading";
import { useLists } from "utils/api";
import { Project } from "model/list";

const ProjectContextMenu = ({ project }: { project: Project }) => {
  const { updateList } = useLists();
  const scheduleProject = (list: Project, scheduled: Date | null) => updateList({ ...list, scheduled });
  
  return (
    <>
      <MenuHeading>Schedule</MenuHeading>
      <MenuItem
        onClick={() => scheduleProject(project, startOfToday())}
        icon={<SunLight />}
        label="Today"
      />
      <MenuItem onClick={() => scheduleProject(project, startOfTomorrow())} icon={<NavArrowRight />} label="Tomorrow" />
      <MenuItem onClick={() => scheduleProject(project, nextSaturday(new Date()))} icon={<Tv />} label="Weekend" />
      <MenuItem onClick={() => scheduleProject(project, nextMonday(new Date()))} icon={<FastArrowRight />} label="Next week" />
      <MenuItem onClick={() => scheduleProject(project, null)} icon={<Cancel />} label="Clear" />
    </>
  );
};

export default ProjectContextMenu;