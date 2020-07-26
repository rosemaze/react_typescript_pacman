import styled from "styled-components";

interface Props {
  x: number;
  y: number;
}

export const PacmanWrapper = styled.div<Props>`
  background-color: yellow;
  background-size: 20px auto;
  height: 20px;
  width: 20px;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;

  display: block;
  position: absolute;

  z-index: 1003;
`;
