import React from "react";
import { reactive } from "../../../../helpers/reactive";
import { MagicDotWrapper } from "./styles/MagicDotWrapper.style";
import { useStores } from "../../../../hooks/useStores";

interface Props {
  rowIndex: number;
  colIndex: number;
}

const MagicDotComponent: React.FC<Props> = (props) => {
  const { rowIndex, colIndex } = props;
  const { baseStore } = useStores();
  const {
    gameStore: { getMagicDot },
  } = baseStore;

  console.log({ colIndex, rowIndex });
  const isMagicDotUneaten = getMagicDot(colIndex + "_" + rowIndex);

  if (!isMagicDotUneaten) {
    return null;
  }

  return <MagicDotWrapper />;
};

export const MagicDot = reactive(MagicDotComponent);
