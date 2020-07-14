import styled from "styled-components";

export const BRICK_MAGNITUDE = 15;
export const BORDER_MARGIN = 5;
export const BORDER_RADIUS = 7;
export const PATH_OFFSET = 5;
export const PATH_MAGNITUDE = 25;

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

const getWidth = (marginLeft: number, marginRight: number, isWall: boolean) =>
  isWall ? BRICK_MAGNITUDE - marginLeft - marginRight : PATH_MAGNITUDE;

const getHeight = (marginTop: number, marginBottom: number, isWall: boolean) =>
  isWall ? BRICK_MAGNITUDE - marginTop - marginBottom : PATH_MAGNITUDE;

const getTop = (rowIndex: number, isWall: boolean) =>
  isWall
    ? rowIndex * BRICK_MAGNITUDE
    : rowIndex * BRICK_MAGNITUDE - PATH_OFFSET;

const getLeft = (colIndex: number, isWall: boolean) =>
  isWall
    ? colIndex * BRICK_MAGNITUDE
    : colIndex * BRICK_MAGNITUDE - PATH_OFFSET;

export const Wall = styled.div<Props>`
  position: absolute;
  width: ${({ marginLeft, marginRight, isWall }) =>
    getWidth(marginLeft, marginRight, isWall)}px;
  height: ${({ marginTop, marginBottom, isWall }) =>
    getHeight(marginTop, marginBottom, isWall)}px;
  background-color: ${({ isWall }) => (isWall ? "blue" : "black")};
  top: ${({ rowIndex, isWall }) => getTop(rowIndex, isWall)}px;
  left: ${({ colIndex, isWall }) => getLeft(colIndex, isWall)}px;
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
  z-index: ${({ isWall }) => (isWall ? 0 : 1000)};
`;
