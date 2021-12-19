import {
  LongArrowDownRight,
} from "iconoir-react";
import { useContext } from "react";
import useSWR from "swr";

import MenuItem from "components/menu/MenuItem";
import MenuSeparator from "components/menu/MenuSeparator";
import type { Task } from "model/task";
import { StateContext } from "model/reducer";

const fetcher = (url) => fetch(url).then((res) => res.json());

const MoveToListMenu = ({ task }: { task: Task; dispatch: Function }) => {
  const { data: areas } = useSWR("http://localhost:3001/areas", fetcher);
  const {
    state: { projects },
    dispatch,
  } = useContext(StateContext);
  // FIXME: implement
  const moveToArea = () => () => null;
  // FIXME: implement
  const moveToProject = () => () => null;
  return (
    <>
      {areas.map((area) => (
        <MenuItem
          key={area}
          icon={<LongArrowDownRight />}
          label={area}
          onClick={moveToArea()}
        />
      ))}
      <MenuSeparator />
      {projects.map((project) => (
        <MenuItem
          key={project.label}
          icon={<LongArrowDownRight />}
          label={project.label}
          onClick={moveToProject()}
        />
      ))}
    </>
  );
};

export default MoveToListMenu;
