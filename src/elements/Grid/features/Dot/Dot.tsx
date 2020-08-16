import React from "react";
import { reactive } from "../../../../helpers/reactive";
import { DotWrapper } from "./styles/DotWrapper.style";

interface Props {
  isMagicDot: boolean;
}

const DotComponent: React.FC<Props> = (props) => {
  return <DotWrapper isMagicDot={props.isMagicDot} />;
};

export const Dot = reactive(DotComponent);
