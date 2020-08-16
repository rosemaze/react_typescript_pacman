import styled from "styled-components";

interface Props {
  x: number;
  y: number;
  isVisible: boolean;
}

export const GhostWrapper = styled.div<Props>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  z-index: 1003;
`;
