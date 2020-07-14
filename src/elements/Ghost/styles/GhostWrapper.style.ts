import styled from "styled-components";

interface Props {
  x: number;
  y: number;
}

export const GhostWrapper = styled.div<Props>`
  background-color: red;
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
