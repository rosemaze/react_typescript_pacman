import styled from "styled-components";

interface Props {
  x: number;
  y: number;
}

export const GhostWrapper = styled.div<Props>`
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  display: block;
  position: absolute;

  z-index: 1003;
`;
