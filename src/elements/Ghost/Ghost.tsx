import React from "react";
import { GhostWrapper } from "./styles/GhostWrapper.style";
import { reactive } from "../../helpers/reactive";
import { Ghost as GhostModel } from "../../stores/Ghosts/models/Ghost.model";

interface Props {
  ghost: GhostModel;
}

export const GhostComponent: React.FC<Props> = (props) => {
  const { ghost } = props;

  return <GhostWrapper x={ghost.x} y={ghost.y} ghostColor={ghost.color} />;
};

export const Ghost = reactive(GhostComponent);
