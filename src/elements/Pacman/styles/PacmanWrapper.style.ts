import styled from "styled-components";

interface Props {
  x: number;
  y: number;
}

export const PacmanWrapper = styled.div<Props>`
  background-color: yellow;
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

/**
 * 
 * ComponentStyle.js:20 Over 200 classes were generated for component styled.div with the id of "sc-AxjAm".
Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))`width: 100%;`

 * 
 */
