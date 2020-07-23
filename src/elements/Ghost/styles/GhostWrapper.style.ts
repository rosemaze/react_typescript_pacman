import styled from "styled-components";
import {
  GhostColor,
  GhostMode,
} from "../../../stores/Ghosts/models/Ghost.types";

interface Props {
  x: number;
  y: number;
  ghostColor: GhostColor;
  ghostMode: GhostMode;
}

const getColor = (ghostColor: GhostColor, ghostMode: GhostMode) => {
  if (ghostMode === GhostMode.Evasive) {
    return "blue";
  }

  if (ghostMode === GhostMode.Blinking) {
    return "white";
  }

  if (ghostMode === GhostMode.Homing) {
    return "grey";
  }

  switch (ghostColor) {
    case GhostColor.Red:
      return "red";
    case GhostColor.Pink:
      return "pink";
    case GhostColor.Blue:
      return "#5edce0";
    case GhostColor.Orange:
      return "#f7b967";
  }
};

export const GhostWrapper = styled.div<Props>`
  background-color: ${({ ghostColor, ghostMode }) =>
    getColor(ghostColor, ghostMode)};
  background-size: 20px auto;
  background-image: url("../../../assets/pacman/pacman-stationary-left.png");
  height: 20px;
  width: 20px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  display: block;
  position: absolute;

  z-index: 1003;
`;
