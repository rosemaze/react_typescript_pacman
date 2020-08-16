import styled from "styled-components";

interface Props {
  isMagicDot: boolean;
}

export const DotWrapper = styled.div<Props>`
  width: ${({ isMagicDot }) => (isMagicDot ? 6 : 3)}px;
  height: ${({ isMagicDot }) => (isMagicDot ? 6 : 3)}px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1001;
`;
