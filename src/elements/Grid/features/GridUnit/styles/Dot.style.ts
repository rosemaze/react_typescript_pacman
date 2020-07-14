import { isAbsolute } from "path";

import { whenWithTimeout } from "mobx-utils";

import styled from "styled-components";

export const Dot = styled.div`
  width: 3px;
  height: 3px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1001;
`;
