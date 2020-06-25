import styled from "styled-components";

const BRICK_MAGNITUDE = 15;

interface Props {
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  rowIndex: number;
  colIndex: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  isWall: boolean;
}

export const Wall = styled.div<Props>`
  width: ${({ marginLeft, marginRight }) =>
    BRICK_MAGNITUDE - marginLeft - marginRight}px;
  height: ${({ marginTop, marginBottom }) =>
    BRICK_MAGNITUDE - marginTop - marginBottom}px;
  position: absolute;
  background-color: ${({ isWall }) => (isWall ? "blue" : "black")};
  top: ${({ rowIndex }) => rowIndex * BRICK_MAGNITUDE}px;
  left: ${({ colIndex }) => colIndex * BRICK_MAGNITUDE}px;
  margin-top: ${({ marginTop }) => marginTop}px;
  margin-bottom: ${({ marginBottom }) => marginBottom}px;
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  border-top-left-radius: ${({ borderTopLeftRadius }) => borderTopLeftRadius}px;
  border-top-right-radius: ${({ borderTopRightRadius }) =>
    borderTopRightRadius}px;
  border-bottom-left-radius: ${({ borderBottomLeftRadius }) =>
    borderBottomLeftRadius}px;
  border-bottom-right-radius: ${({ borderBottomRightRadius }) =>
    borderBottomRightRadius}px;
`;
