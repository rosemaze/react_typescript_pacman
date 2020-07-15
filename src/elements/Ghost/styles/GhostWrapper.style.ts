import styled from "styled-components";
import { GhostColor } from "../../../stores/Ghosts/Ghosts.types";

interface Props {
  x: number;
  y: number;
  ghostColor: GhostColor;
}

const getColor = (ghostColor: GhostColor) => {
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
  background-color: ${({ ghostColor }) => getColor(ghostColor)};
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
