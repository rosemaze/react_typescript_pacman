import styled from "styled-components";

interface Props {
  x: number;
  y: number;
  isVisible: boolean;
}

export const PacmanWrapper = styled.div<Props>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  background-color: yellow;
  background-size: 20px auto;
  height: 20px;
  width: 20px;

  z-index: 1003;
`;
